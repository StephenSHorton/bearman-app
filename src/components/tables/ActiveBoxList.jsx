import React from "react";
import { streamActiveBoxesByAttribute } from "../../functions/firebaseFunctions";
import LoadingSymbol from "../common/LoadingSymbol";
import { boxIcon, arrowRight, chevronDown, chevronUp } from "../common/icons";
import { Link } from "react-router-dom";
import { getStatus, getStatusColor } from "../../functions/boxFunctions";

const ActiveBoxList = ({ sortParams }) => {
	//TODO sort boxes by columns
	const [boxes, setBoxes] = React.useState();

	React.useEffect(() => {
		const [attribute, value] = sortParams;
		const unsubscribe = streamActiveBoxesByAttribute(attribute, value, {
			// next is called on ever update from firestore
			next: (querySnapshot) => {
				let data = [];
				querySnapshot.forEach((doc) =>
					data.push({ ...doc.data(), id: doc.id })
				);
				setBoxes(data);
			},
			error: (err) => console.log(err),
		});
		return unsubscribe;
	}, [sortParams]);

	const IDRow = ({ box }) => {
		const [isOpen, setIsOpen] = React.useState(false);
		return (
			<td>
				<button
					className="p-2 rounded-full"
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? chevronUp : chevronDown}
				</button>
				<div className={`${isOpen ? "" : "hidden"} absolute z-20`}>
					<div className="relative p-4 top-2 right-10 bg-white rounded-md text-black">
						{box.id}
					</div>
				</div>
			</td>
		);
	};

	return (
		<table className="mx-4">
			<thead>
				<tr className="bg-transparent">
					<th className="px-2"></th>
					<th className="px-2">ID</th>
					<th className="px-2">PART</th>
					<th className="px-2">QUANTITY</th>
					{sortParams[1] === "Frames" ? (
						<th className="px-2">SERIAL</th>
					) : null}
					<th className="px-2">BOX NUMBER</th>
					<th className="px-2">STATUS</th>
					<th className="px-2"></th>
				</tr>
			</thead>
			<tbody>
				{boxes ? (
					boxes.map((box, index) => (
						<tr key={index} className="text-center shadow-xl">
							<td className="p-4">{boxIcon}</td>
							<IDRow box={box} />
							<td>{`${box.part_type} ${box.model}`}</td>
							<td>{box.quantity}</td>
							{box.part_type === "Frames" ? (
								<td>{`${box.serial_range_min} - ${box.serial_range_max}`}</td>
							) : null}
							<td>{box.box_number}</td>
							<td
								className={`bg-${getStatusColor(
									box.status
								)}-500 font-semibold`}
							>
								{getStatus(box.status)}
							</td>
							<td className="p-4">
								<Link to={`/box/${box.id}`}>
									<button className="btn-primary rounded-full p-2">
										{arrowRight}
									</button>
								</Link>
							</td>
						</tr>
					))
				) : (
					<div className="absolute z-20">
						<LoadingSymbol />
					</div>
				)}
			</tbody>
		</table>
	);
};

export default ActiveBoxList;
