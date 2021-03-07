import React from "react";
import { getRetiredBoxesByAttribute } from "../../functions/firebaseFunctions";
import LoadingSymbol from "../common/LoadingSymbol";
import { chevronRight } from "../common/icons";

const RetiredBoxList = ({ sortParams }) => {
	const [boxes, setBoxes] = React.useState();

	React.useEffect(() => {
		getRetiredBoxesByAttribute()
			.then((querySnapshot) => {
				let data = [];
				querySnapshot.forEach((doc) =>
					data.push({ ...doc.data(), id: doc.id })
				);
				setBoxes(data);
			})
			.catch((err) => console.log(err));
	}, [sortParams]);

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

export default RetiredBoxList;
