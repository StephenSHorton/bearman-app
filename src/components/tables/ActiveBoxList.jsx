import React from "react";
import { streamActiveBoxesByAttribute } from "../../functions/firebaseFunctions";
import LoadingSymbol from "../common/LoadingSymbol";
import {
	boxIcon,
	arrowRight,
	chevronDown,
	chevronUp,
	getIcon,
} from "../common/icons";
import { Link } from "react-router-dom";
import { getStatus, getStatusColor } from "../../functions/boxFunctions";
import BoxTotals from "./BoxTotals";
import PartTotals from "./PartTotals";

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
					{isOpen ? getIcon(chevronUp, 6) : getIcon(chevronDown, 6)}
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
		<div>
			<p className="p-0 text-xs font-light">
				Boxes can no longer be retired manually, they will become
				"Inactive" when all of their operations are completed.
			</p>
			{boxes ? (
				<div>
					<BoxTotals boxes={boxes} />
					<PartTotals boxes={boxes} model={"BB"} />
					<PartTotals boxes={boxes} model={"CL"} />
				</div>
			) : null}
			<table className="w-full">
				<thead>
					<tr className="bg-transparent">
						<th></th>
						<th>ID</th>
						<th>MODEL</th>
						<th>QUANTITY</th>
						{sortParams[1] === "Frames" ? <th>SERIAL</th> : null}
						<th>BOX NUMBER</th>
						<th>STATUS</th>
						<th></th>
					</tr>
				</thead>
				{boxes ? (
					<tbody>
						{boxes.map((box, index) => (
							<tr key={index} className="text-center shadow-xl">
								<td className="p-4">{getIcon(boxIcon, 6)}</td>
								<IDRow box={box} />
								<td>{`${box.model}`}</td>
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
									<p className="p-0 text-sm font-light">
										{box.current_op
											? `Operation #${box.current_op}`
											: null}
									</p>
								</td>
								<td className="p-4">
									<Link to={`/box/${box.id}`}>
										<button className="btn-primary rounded-full p-2">
											{getIcon(arrowRight, 6)}
										</button>
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				) : null}
			</table>
			{boxes ? null : (
				<div className="absolute z-20">
					<LoadingSymbol />
				</div>
			)}
		</div>
	);
};

export default ActiveBoxList;
