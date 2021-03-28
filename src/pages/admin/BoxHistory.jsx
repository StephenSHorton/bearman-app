import React from "react";
import { Link } from "react-router-dom";
import {
	arrowLeft,
	boxIcon,
	getIcon,
	history,
	person,
	qrcode,
} from "../../components/common/icons";
import LoadingSymbol from "../../components/common/LoadingSymbol";
import { streamBox } from "../../functions/firebaseFunctions";

const BoxHistory = (props) => {
	const boxID = props.match.params.boxID;
	const [box, setBox] = React.useState();

	React.useEffect(() => {
		const unsubscribe = streamBox(boxID, {
			// next is called on every update from firestore
			next: (doc) => setBox({ ...doc.data(), id: doc.id }),
			error: (err) => console.log(err),
		});
		return unsubscribe;
	}, [boxID]);

	const getBGColor = (new_value) => {
		switch (new_value) {
			case "INTERRUPTED":
				return "yellow-600";
			case "INPROGRESS":
				return "blue-600";
			case "NOTSTARTED":
				return "red-600";
			case "COMPLETED":
				return "green-600";
			default:
				return "gray-600";
		}
	};

	return box ? (
		<div>
			<header>
				<h1>History</h1>
			</header>
			<Link to={`/box/${boxID}`}>
				<button className="btn-primary">
					<div className="flex items-center">
						<p className="mr-1">{getIcon(arrowLeft, 4)}</p> Back
					</div>
				</button>
			</Link>
			<p>(Sorted from most recent to least)</p>
			<div className="flex justify-around border-4 p-2 border-gray-600 bg-gray-700">
				<div className="flex items-center text-xl font-bold">
					<p className="mr-1">{getIcon(qrcode, 8)}</p>{" "}
					{`ID: ${box.id}`}
				</div>
				<div className="flex items-center text-xl font-bold">
					<p className="mr-1">{getIcon(boxIcon, 8)}</p>{" "}
					{`BOX #: ${box.box_number}`}
				</div>
				<div className="flex items-center text-xl font-bold">
					<p className="mr-1">{getIcon(person, 8)}</p>{" "}
					{`LAST MODIFIED BY: ${box.updated_by || ""}`}
				</div>
				<div className="flex items-center text-xl font-bold">
					<p className="mr-1">{getIcon(history, 8, "white")}</p>{" "}
					{`History since: ${box.created_at
						.toDate()
						.toLocaleDateString("en-US", {
							hour: "numeric",
							minute: "numeric",
							timeZoneName: "short",
						})}`}
				</div>
			</div>
			<div className="text-xl">
				{box.history
					.slice(0)
					.reverse()
					.map((history) => (
						<div
							className={`border-4 border-gray-600 bg-gray-700 m-10`}
						>
							<div className="flex flex-col items-center">
								<p
									className={`text-4xl p-4 bg-${getBGColor(
										history.new_value
									)} m-2 rounded-md`}
								>
									{history.description}
								</p>
								<p>
									Logged at:{" "}
									<span className="text-yellow-400">
										{new Date(
											history.updated_at
										).toLocaleDateString("en-US", {
											hour: "numeric",
											minute: "numeric",
											timeZoneName: "short",
										})}
									</span>
								</p>
								<p>
									Change made by:{" "}
									<span className="text-green-500">
										{history.updated_by}
									</span>
								</p>
							</div>
							{history.extra_details ? (
								<p className="text-center p-4 bg-gray-600">
									{history.extra_details}
								</p>
							) : null}
							<div className="flex justify-around">
								<div className="m-2">
									<p className="text-red-500">Old value:</p>
									<p>{history.old_value}</p>
								</div>
								<div className="m-2">
									<p className="text-blue-500">New value:</p>
									<p>{history.new_value}</p>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	) : (
		<div className="grid justify-items-center mt-24">
			<LoadingSymbol />
		</div>
	);
};

export default BoxHistory;
