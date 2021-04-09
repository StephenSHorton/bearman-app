import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
	arrowLeft,
	boxIcon,
	boxIcon2,
	clock,
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
import {
	deleteBox,
	streamBox,
	updateBox,
} from "../../functions/firebaseFunctions";
import SelectEmployee from "../../components/common/SelectEmployee";
import LoadingSymbol from "../../components/common/LoadingSymbol";
import NewNote from "../../components/forms/NewNote";
import { getStatus, getStatusColor } from "../../functions/boxFunctions";

const BoxView = (props) => {
	const HISTORY = useHistory();
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

	const handleStatusChange = (newStatus, opListOrder) => {
		if (!selectedEmployee) {
			alert(
				"Error: An employee must be selected in order to make changes."
			);
			return;
		}
		let reason;
		if (newStatus === 3) {
			reason = window.prompt(
				"Please give a reason for interrupting this operation (i.e. 'Break/Lunch'; 'Problem with machine'; etc...)"
			);
			if (!reason) {
				return;
			}
		}
		const indexOfOP = opListOrder - 1;
		if (indexOfOP === -1) {
			alert("Error: status change could not be completed. (indexOf op)");
			return;
		}
		const operations = box.operations;
		const oldOP = operations[indexOfOP];
		if (!oldOP) {
			alert("ERROR");
			console.log(opListOrder);
			console.log(indexOfOP);
			console.log(box.operations);
			return;
		}
		let newOP = {
			...oldOP,
			status: newStatus,
			updated_at: new Date().getTime(),
			updated_by: selectedEmployee.name,
		};
		let current_op;
		switch (newStatus) {
			//handle interruptions differently, everything else is default
			case 1:
				delete newOP.updated_at;
				delete newOP.updated_by;
				delete newOP.started_at;
				delete newOP.completed_at;
				delete newOP.status;
				delete newOP.interruptions;
				break;
			case 2:
				if (!oldOP.hasOwnProperty("status") || oldOP.status === 1) {
					newOP.started_at = new Date().getTime();
				} else if (newOP.hasOwnProperty("interruptions")) {
					newOP.interruptions[
						newOP.interruptions.length - 1
					].resumed_at = new Date().getTime();
					newOP.interruptions[
						newOP.interruptions.length - 1
					].resumed_by = selectedEmployee.name;
				}
				current_op = opListOrder;
				break;
			case 3:
				if (!newOP.hasOwnProperty("interruptions")) {
					newOP.interruptions = [];
					newOP.interruptions.push({
						interrupted_at: new Date().getTime(),
						interrupted_by: selectedEmployee.name,
						reason,
					});
				} else {
					newOP.interruptions.push({
						interrupted_at: new Date().getTime(),
						interrupted_by: selectedEmployee.name,
						reason,
					});
				}
				break;
			case 4:
				newOP.completed_at = new Date().getTime();
				break;
			default:
				alert(
					"Error: status change could not be completed. (status of op)"
				);

				return;
		}
		operations[indexOfOP] = newOP;
		console.log(oldOP.status, newStatus);
		let updatedDoc = {
			...box,
			operations,
			history: [
				...box.history,
				{
					description: `Operation #${opListOrder} status changed`,
					old_value: getStatus(oldOP.status),
					new_value: getStatus(newStatus),
					updated_at: new Date().getTime(),
					updated_by: selectedEmployee.name,
				},
			],
		};
		if (current_op) updatedDoc.current_op = current_op;
		if (reason) {
			updatedDoc.history = [
				...box.history,
				{
					description: `Operation #${opListOrder} status changed`,
					old_value: getStatus(oldOP.status),
					new_value: getStatus(newStatus),
					updated_at: new Date().getTime(),
					updated_by: selectedEmployee.name,
					extra_details: reason,
				},
			];
		}
		updateBox(box.id, updatedDoc).catch((err) => console.log(err));
	};

	const getOperationButtons = (opStatus, opListOrder) => {
		switch (opStatus) {
			case 2:
				return (
					<div className="flex space-x-10">
						<button
							className="btn-warning px-10 py-8"
							onClick={() => handleStatusChange(3, opListOrder)}
						>
							Interrupt
						</button>
						<button
							className="btn-success px-10 py-8"
							onClick={() => handleStatusChange(4, opListOrder)}
						>
							Complete
						</button>
					</div>
				);
			case 3:
				return (
					<div className="flex space-x-10">
						<button
							className="btn-primary px-10 py-8"
							onClick={() => handleStatusChange(2, opListOrder)}
						>
							Resume
						</button>
					</div>
				);
			case 4:
				return (
					<div className="flex space-x-10">
						<button
							className="btn-danger px-10 py-8"
							onClick={() => handleStatusChange(1, opListOrder)}
						>
							Undo
						</button>
					</div>
				);
			default:
				return (
					<div className="flex space-x-10">
						<button
							className="btn-primary px-10 py-8"
							onClick={() => handleStatusChange(2, opListOrder)}
						>
							Start
						</button>
						<button
							className="btn-success px-10 py-8"
							onClick={() => handleStatusChange(4, opListOrder)}
						>
							Complete
						</button>
					</div>
				);
		}
	};

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
							<p>
								ID:{" "}
								<span className="text-blue-300">{box.id}</span>
							</p>
						</div>
						<div className="flex items-center text-xl font-bold">
							<p className="mr-1">{getIcon(boxIcon2, 12)}</p>{" "}
							<p>
								QUANTITY:{" "}
								<p className="text-blue-300">{box.quantity}</p>
							</p>
						</div>
						<div className="flex items-center text-xl font-bold">
							<p className="mr-1">{getIcon(boxIcon, 12)}</p>{" "}
							<p>
								BOX #:{" "}
								<span className="text-blue-300">
									{box.box_number}
								</span>
							</p>
						</div>
						<div className="flex items-center text-xl font-bold">
							<p className="mr-1">{getIcon(person, 12)}</p>{" "}
							<p>
								LAST MODIFIED BY:{" "}
								<span className="text-blue-300">
									{box.updated_by || ""}
								</span>
							</p>
						</div>
						<div className="flex items-center text-xl font-bold">
							<p className="mr-1">{getCog(12)}</p>{" "}
							<p>
								MODEL:{" "}
								<span className="text-blue-300">
									{`${box.part_type.toUpperCase()} ${
										box.model
									}`}
								</span>
							</p>
						</div>
						<div className="flex items-center text-xl font-bold">
							<p className="mr-1">{getIcon(clock, 12)}</p>{" "}
							<p>
								CREATED AT:{" "}
								<span className="text-blue-300">
									{box.created_at
										.toDate()
										.toLocaleDateString("en-US", {
											hour: "numeric",
											minute: "numeric",
											timeZoneName: "short",
										})}
								</span>
							</p>
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
					</div>
					<div className="border-4 bg-gray-700 shadow-inner-xl border-gray-500 w-1/3">
						<NewNote
							box={box}
							selectedEmployee={selectedEmployee}
						/>
					</div>
				</div>
				<div>
					{box.operations.map((op, index) => (
						<div
							key={index}
							className="bg-gray-700 m-10 shadow-2xl rounded-lg p-10"
						>
							<div></div>
							<div
								className={`bg-${getStatusColor(
									op.status
								)}-600 font-extrabold p-1 rounded-md text-xl`}
							>
								OPERATION #{index + 1}
							</div>
							<div className="text-3xl">{op.description}</div>
							<div className="flex justify-between">
								<div
									className={`text-${getStatusColor(
										op.status
									)}-600`}
								>
									{getStatus(op.status)}
									{op.status === 3
										? ` - ${
												op.interruptions[
													op.interruptions.length - 1
												].reason
										  } - ${
												op.interruptions[
													op.interruptions.length - 1
												].interrupted_by
										  } `
										: null}
								</div>
								<div>
									<p>
										Started at:{" "}
										{op.hasOwnProperty("started_at")
											? new Date(
													op.started_at
											  ).toLocaleDateString("en-US", {
													hour: "numeric",
													minute: "numeric",
													timeZoneName: "short",
											  })
											: null}
									</p>
									<p>
										Completed at:{" "}
										{op.hasOwnProperty("completed_at")
											? new Date(
													op.completed_at
											  ).toLocaleDateString("en-US", {
													hour: "numeric",
													minute: "numeric",
													timeZoneName: "short",
											  })
											: null}
									</p>
									<p className="text-blue-400">
										{(() => {
											if (
												op.hasOwnProperty(
													"completed_at"
												) &&
												op.hasOwnProperty("started_at")
											) {
												const started = new Date(
													op.started_at
												);
												const completed = new Date(
													op.completed_at
												);
												const elapsedHourMinutes =
													Math.abs(
														started.getHours() -
															completed.getHours()
													) * 60;
												const elapsedMinutes =
													elapsedHourMinutes +
													Math.abs(
														started.getMinutes() -
															completed.getMinutes()
													);
												return `${elapsedMinutes} mins`;
											}
										})()}
									</p>
								</div>
								{getOperationButtons(op.status, op.list_order)}
							</div>
						</div>
					))}
				</div>
			</div>
		);
	};

	const handleDelete = () => {
		if (window.confirm("Are you sure you want to delete this box?")) {
			const response = window.prompt("Password");
			if (response === "1234") {
				HISTORY.push("/dashboard");
				deleteBox(box.id)
					.then(() => {
						alert("Successfully deleted box.");
					})
					.catch((err) => {
						alert("There was a problem retiring this box.");
						console.log(err);
					});
			} else {
				alert("Invalid Password.");
			}
		}
	};
	const handleRetire = () => {
		if (!selectedEmployee) {
			alert(
				"Error: An employee must be selected in order to make changes."
			);
			return;
		}
		if (
			window.confirm(
				"Are you sure you want to retire this box? (You should only retire a box if you no longer want to see it in the active box list)"
			)
		) {
			const response = window.prompt("Password");
			if (response === "1234") {
				HISTORY.push("/dashboard");
				updateBox(box.id, {
					...box,
					retired: true,
					is_active: false,
					updated_by: selectedEmployee.name,
					history: [
						...box.history,
						{
							description: `Box retired`,
							old_value: getStatus(box.status),
							new_value: "RETIRED",
							updated_at: new Date().getTime(),
							updated_by: selectedEmployee.name,
						},
					],
				})
					.then(() => {
						alert("Successfully retired box.");
					})
					.catch((err) => {
						alert("There was a problem retiring this box.");
						console.log(err);
					});
			} else {
				alert("Invalid Password.");
			}
		}
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
				<button className="flex items-center" onClick={handleRetire}>
					Retire
				</button>
				<button
					className="btn-danger flex items-center"
					onClick={handleDelete}
				>
					Delete <p className="ml-1">{getIcon(trash, 6)}</p>
				</button>
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
