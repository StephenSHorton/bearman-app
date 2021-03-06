import React from "react";
import {
	getRetiredBoxesByAttribute,
	streamActiveBoxesByAttribute,
} from "../../functions/firebaseFunctions";
import LoadingSymbol from "../common/LoadingSymbol";
import { chevronRight } from "../common/icons";

const BoxList = ({ sortParams, retired }) => {
	const [boxes, setBoxes] = React.useState();

	React.useEffect(() => {
		const getActive = () => {
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
		};

		const getRetired = () => {
			getRetiredBoxesByAttribute()
				.then((querySnapshot) => {
					let data = [];
					querySnapshot.forEach((doc) =>
						data.push({ ...doc.data(), id: doc.id })
					);
					setBoxes(data);
				})
				.catch((err) => console.log(err));
		};

		return retired ? getRetired : getActive;
	}, [sortParams, retired]);

	return (
		<table>
			<thead>
				<tr>
					<th></th>
					<th>ID</th>
				</tr>
			</thead>
			<tbody>
				{boxes ? (
					boxes.map((box) => (
						<tr>
							<td>{chevronRight}</td>
							<td>{box.id}</td>
						</tr>
					))
				) : (
					<tr>
						<td>{chevronRight}</td>
						<td>
							<LoadingSymbol />
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};

export default BoxList;
