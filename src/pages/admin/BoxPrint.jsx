import React from "react";
import { Print } from "react-easy-print";
import { Link } from "react-router-dom";
import {
	arrowLeft,
	boxIcon,
	boxIcon2,
	getCog,
	getIcon,
	infoCircle,
	printer,
	qrcode,
} from "../../components/common/icons";
import LoadingSymbol from "../../components/common/LoadingSymbol";
import QRCodeGenerator from "../../components/common/QRCodeGenerator";
import SerialListGenerator from "../../components/common/SerialListGenerator";
import { retrieveBox } from "../../functions/firebaseFunctions";

const BoxPrint = (props) => {
	const boxID = props.match.params.boxID;
	const [box, setBox] = React.useState();

	React.useEffect(() => {
		retrieveBox(boxID).then((doc) => setBox({ ...doc.data(), id: doc.id }));
	}, [boxID]);

	return box ? (
		<div className="grid">
			{box.part_type === "Barrels" ? (
				<Print single name="foo">
					<div className="bg-white text-black">
						<div className="grid grid-cols-2">
							<QRCodeGenerator boxID={boxID} width={"300px"} />
							<div className="grid grid-cols-1">
								<div className="flex items-center text-xl font-bold">
									<p className="mr-1">
										{getIcon(qrcode, 12)}
									</p>{" "}
									{`ID: ${box.id}`}
								</div>
								<div className="flex items-center text-xl font-bold">
									<p className="mr-1">
										{getIcon(boxIcon2, 12)}
									</p>{" "}
									{`QUANTITY: ${box.quantity}`}
								</div>
								<div className="flex items-center text-xl font-bold">
									<p className="mr-1">
										{getIcon(boxIcon, 12)}
									</p>{" "}
									{`BOX #: ${box.box_number}`}
								</div>
								<div className="flex items-center text-xl font-bold">
									<p className="mr-1">{getCog(12)}</p>{" "}
									{`MODEL: ${box.part_type.toUpperCase()} ${
										box.model
									}`}
								</div>
							</div>
						</div>
					</div>
				</Print>
			) : (
				<Print single name="bar">
					<div className="bg-white text-black">
						<div className="flex justify-center">
							<SerialListGenerator
								serialMin={box.serial_range_min}
								serialMax={box.serial_range_max}
								model={box.model}
							/>
						</div>
						<div className="flex space-x-4 items-center justify-center">
							<QRCodeGenerator boxID={boxID} width={"75px"} />
							<div className="flex flex-col">
								<div className="flex space-x-4">
									<div className="flex items-center text-sm m-2">
										<p className="mr-1">
											{getIcon(qrcode, 8)}
										</p>{" "}
										{`ID: ${box.id}`}
									</div>
									<div className="flex items-center text-sm m-2">
										<p className="mr-1">
											{getIcon(boxIcon2, 8)}
										</p>{" "}
										{`QUANTITY: ${box.quantity}`}
									</div>
									<div className="flex items-center text-sm m-2">
										<p className="mr-1">
											{getIcon(boxIcon, 8)}
										</p>{" "}
										{`BOX #: ${box.box_number}`}
									</div>
								</div>
								<div className="flex">
									<div className="flex items-center text-sm m-2">
										<p className="mr-1">{getCog(8)}</p>{" "}
										{`MODEL: ${box.part_type.toUpperCase()} ${
											box.model
										}`}
									</div>
									<div className="flex items-center text-sm m-2">
										<p className="mr-1">
											{getIcon(infoCircle, 8)}
										</p>{" "}
										{`SERIAL: ${box.serial_range_min} - ${box.serial_range_max}`}
									</div>
								</div>
							</div>
						</div>
					</div>
				</Print>
			)}
			<div className="flex justify-self-center m-10 text-white space-x-4">
				<Link to={`/box/${boxID}`}>
					<button className="btn-primary">
						<div className="flex items-center">
							<p className="mr-1">{getIcon(arrowLeft, 4)}</p> Back
						</div>
					</button>
				</Link>

				<button
					className="btn-primary flex items-center"
					onClick={() => window.print()}
				>
					Print <p className="ml-1">{getIcon(printer, 6)}</p>
				</button>
			</div>
		</div>
	) : (
		<div className="grid justify-items-center mt-24">
			<LoadingSymbol />
		</div>
	);
};

export default BoxPrint;
