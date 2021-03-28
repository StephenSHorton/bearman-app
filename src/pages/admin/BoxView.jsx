import React from "react";
import { Link } from "react-router-dom";
import {
	arrowLeft,
	boxIcon,
	boxIcon2,
	clock,
	cog,
	getCog,
	getIcon,
	history,
	infoCircle,
	person,
	printer,
	qrcode,
	trash,
} from "../../components/common/icons";
import QRCodeGenerator from "../../components/common/QRCodeGenerator";
import { streamBox } from "../../functions/firebaseFunctions";
import SelectEmployee from "../../components/common/SelectEmployee";
import LoadingSymbol from "../../components/common/LoadingSymbol";
import NewNote from "../../components/forms/NewNote";

const BoxView = (props) => {
	const boxID = props.match.params.boxID;
	const [box, setBox] = React.useState();
	const [selectedEmployee, setSelectedEmployee] = React.useState();

	React.useEffect(() => {
		const unsubscribe = streamBox(boxID, {
			// next is called on every update from firestore
			next: (doc) => setBox({ ...doc.data(), id: doc.id }),
			error: (err) => console.log(err),
		});
		return unsubscribe;
	}, [boxID]);

	const BoxInformation = () => {
		return (
			<div>
				<div className="flex">
					<div
						className="border-4 border-r-0 bg-gray-700 shadow-inner-xl border-gray-500 p-6"
						style={{ minHeight: "240px" }} //Compensates for late load
					>
						<QRCodeGenerator
							boxID={boxID}
							width={"200px"}
							selectedEmployee={selectedEmployee}
						/>
					</div>
					<div className="grid grid-cols-2 items-center pl-2 border-4 border-r-0 bg-gray-700 shadow-inner-xl border-gray-500">
						<div className="flex items-center text-xl font-bold">
							<p className="mr-1">{getIcon(qrcode, 12)}</p>{" "}
							{`ID: ${box.id}`}
						</div>
						<div className="flex items-center text-xl font-bold">
							<p className="mr-1">{getIcon(boxIcon2, 12)}</p>{" "}
							{`QUANTITY: ${box.quantity}`}
						</div>
						<div className="flex items-center text-xl font-bold">
							<p className="mr-1">{getIcon(boxIcon, 12)}</p>{" "}
							{`BOX #: ${box.box_number}`}
						</div>
						<div className="flex items-center text-xl font-bold">
							<p className="mr-1">{getIcon(person, 12)}</p>{" "}
							{`LAST MODIFIED BY: ${box.updated_by || ""}`}
						</div>
						<div className="flex items-center text-xl font-bold">
							<p className="mr-1">{getCog(12)}</p>{" "}
							{`MODEL: ${box.part_type.toUpperCase()} ${
								box.model
							}`}
						</div>
						{box.part_type === "Frames" ? (
							<div className="flex items-center text-xl font-bold">
								<p className="mr-1">
									{getIcon(infoCircle, 12)}
								</p>{" "}
								<p>
									SERIAL:{" "}
									<span className="text-blue-300 font-normal">{`${box.serial_range_min} - ${box.serial_range_max}`}</span>
								</p>
							</div>
						) : null}
						<div className="flex items-center text-xl font-bold">
							<p className="mr-1">{getIcon(clock, 12)}</p>{" "}
							{`CREATED AT: ${box.created_at
								.toDate()
								.toLocaleDateString("en-US", {
									hour: "numeric",
									minute: "numeric",
									timeZoneName: "short",
								})}`}
						</div>
					</div>
					<div className="border-4 bg-gray-700 shadow-inner-xl border-gray-500 w-1/3">
						<NewNote
							box={box}
							selectedEmployee={selectedEmployee}
						/>
					</div>
				</div>
				<div>{/* Operations */}</div>
			</div>
		);
	};

	return (
		<div>
			<div className="flex p-4 space-x-4 justify-end">
				<Link to={`/dashboard`}>
					<button className="btn-primary">
						<div className="flex items-center">
							<p className="mr-1">{getIcon(arrowLeft, 4)}</p> Back
						</div>
					</button>
				</Link>
				<SelectEmployee
					selectedEmployee={selectedEmployee}
					setSelectedEmployee={setSelectedEmployee}
				/>
				<Link to={`/print/${boxID}`}>
					<button className="btn-primary flex items-center">
						Print <p className="ml-1">{getIcon(printer, 6)}</p>
					</button>
				</Link>
				<Link to={`/history/${boxID}`}>
					<button className="btn-info flex items-center">
						History{" "}
						<p className="ml-1">{getIcon(history, 6, "white")}</p>
					</button>
				</Link>
				<Link>
					<button className="btn-danger flex items-center">
						Delete <p className="ml-1">{getIcon(trash, 6)}</p>
					</button>
				</Link>
			</div>
			{box ? (
				<BoxInformation />
			) : (
				<div className="grid justify-items-center mt-24">
					<LoadingSymbol />
				</div>
			)}
		</div>
	);
};

export default BoxView;
