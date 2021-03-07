import React from "react";
import { useHistory } from "react-router";
import { chevronRight } from "../../components/common/icons";
import { createBox, getOperations } from "../../functions/firebaseFunctions";

const sortByListOrder = (a, b) => {
	const _a = a.list_order;
	const _b = b.list_order;
	let comparison = 0;
	if (_a > _b) {
		comparison = 1;
	} else if (_a < _b) {
		comparison = -1;
	}
	return comparison;
};

const CreateBox = () => {
	const history = useHistory();

	const [part_type, setPartType] = React.useState("Barrels");
	const [model, setModel] = React.useState("BB");
	const [box_number, setBoxNumber] = React.useState(0);
	const [quantity, setQuantity] = React.useState(0);
	const [operations, setOperations] = React.useState([]);
	const [possibleOps, setPossibleOps] = React.useState([]);
	const [note, setNote] = React.useState("");
	const [serial_range_min, setSerialRangeMin] = React.useState("");
	const [serial_range_max, setSerialRangeMax] = React.useState("");

	React.useEffect(() => {
		getOperations(part_type, model).then((querySnapshot) => {
			const data = [];
			querySnapshot.forEach((doc) =>
				data.push({ ...doc.data(), id: doc.id })
			);
			data.sort(sortByListOrder);
			setPossibleOps(data);
		});
	}, [part_type, model]);

	const clearForm = () => {
		setPartType("Barrels");
		setModel("BB");
		setBoxNumber(0);
		setSerialRangeMin("");
		setSerialRangeMax("");
		setOperations([]);
		setQuantity(0);
		setNote("");
		const partTypeSelectNode = document.getElementById("partTypeSelect");
		partTypeSelectNode.value = "";
		const modelSelectNode = document.getElementById("modelSelect");
		modelSelectNode.value = "";
		const operationsSelectNode = document.getElementById(
			"operationsSelect"
		);
		operationsSelectNode.value = "";
	};

	const handleOperationSelection = (e) => {
		const newSet = new Set(operations);
		newSet.add(
			possibleOps.find(
				(el) => Number(el.list_order) === Number(e.target.value)
			)
		);
		const collator = new Intl.Collator(undefined, {
			numeric: true,
			sensitivity: "base",
		});
		var myArray = [...newSet];
		setOperations(myArray.sort(collator.compare).sort(sortByListOrder));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let newDoc = {
			part_type,
			model,
			box_number: Number(box_number),
			quantity: Number(quantity),
			operations,
			note,
			isActive: true,
			createdAt: new Date(),
			status: 1,
		};
		if (part_type === "Frames") {
			newDoc = {
				...newDoc,
				serial_range_min,
				serial_range_max,
			};
		}
		createBox(newDoc)
			.then((doc) => {
				alert(`Successfully created box! ${doc.id}`);
				if (!window.confirm("Would you like to create another?")) {
					history.push(`/box/${doc.id}`);
				}
			})
			.catch((err) => {
				console.log(err);
				alert(
					"There was an error processing your submission. (See console for details)"
				);
			});
	};

	return (
		<div>
			<header>
				<h1>Create Box</h1>
			</header>
			<div className="grid">
				<button
					className="btn-danger justify-self-end mb-2"
					type="button"
					onClick={() => clearForm()}
				>
					Clear
				</button>
				<form
					className="grid bg-gray-700 shadow-2xl rounded-xl"
					onSubmit={handleSubmit}
				>
					<fieldset className="flex flex-col m-5 mx-10">
						<label>Part Type</label>
						<select
							autoComplete="off"
							id="partTypeSelect"
							onChange={(e) => setPartType(e.target.value)}
							value={part_type}
						>
							<option>Barrels</option>
							<option>Frames</option>
						</select>
					</fieldset>
					<fieldset className="flex flex-col m-5 mx-10">
						<label>Model</label>
						<select
							autoComplete="off"
							id="modelSelect"
							onChange={(e) => setModel(e.target.value)}
							value={model}
						>
							<option value="BB">Big Bore</option>
							<option value="CL">Classic</option>
						</select>
					</fieldset>
					<fieldset className="flex flex-col m-5 mx-10">
						<label>Box Number</label>
						<input
							className="pl-2"
							type="number"
							autoComplete="off"
							required
							onChange={(e) => setBoxNumber(e.target.value)}
							value={box_number}
						/>
					</fieldset>
					{part_type === "Frames" ? (
						<fieldset className="flex flex-col m-5 mx-10">
							<label>Serial Range</label>
							<div className="flex">
								<input
									className="pl-2"
									type="text"
									autoComplete="off"
									required
									onChange={(e) =>
										setSerialRangeMin(e.target.value)
									}
									value={serial_range_min}
								/>
								<div className="mx-4">thru</div>
								<input
									className="pl-2"
									type="text"
									autoComplete="off"
									required
									onChange={(e) =>
										setSerialRangeMax(e.target.value)
									}
									value={serial_range_max}
								/>
							</div>
						</fieldset>
					) : null}
					<fieldset className="flex flex-col m-5 mx-10">
						<label>Quantity</label>
						<input
							className="pl-2"
							type="number"
							autoComplete="off"
							required
							onChange={(e) => setQuantity(e.target.value)}
							value={quantity}
						/>
					</fieldset>
					<fieldset className="flex flex-col m-5 mx-10">
						<label>Operations</label>
						<div className="mb-2">
							<select
								autoComplete="off"
								id="operationsSelect"
								onChange={handleOperationSelection}
							>
								<option value="">Select an operation</option>
								{possibleOps
									? possibleOps.map((op, index) => (
											<option
												key={index}
												value={op.list_order}
											>{`${op.part_type} ${op.model} - #${op.list_order} - ${op.description} `}</option>
									  ))
									: null}
							</select>
							<button
								type="button"
								className="btn-primary mx-2 p-2 text-sm"
								onClick={() => setOperations(possibleOps)}
							>
								Add All
							</button>
							{operations.length > 0 ? (
								<button
									type="button"
									className="btn-danger mx-2 p-2 text-sm"
									onClick={() => {
										setOperations([]);
										const operationsSelectNode = document.getElementById(
											"operationsSelect"
										);
										operationsSelectNode.value = "";
									}}
								>
									Clear Operations
								</button>
							) : null}
						</div>
						<div className="p-10 bg-gray-300 text-center font-semibold text-xl text-black">
							<ul className="grid justify-items-start">
								{operations
									? operations.map((op, index) => (
											<li
												className="flex items-center justify-center my-2"
												key={index}
											>
												{chevronRight}
												<p>{`${op.part_type} ${op.model} - #${op.list_order} - ${op.description} `}</p>
											</li>
									  ))
									: null}
							</ul>
						</div>
					</fieldset>
					<fieldset className="flex flex-col m-5 mx-10">
						<label>Notes</label>
						<input
							className="pl-2"
							type="textarea"
							autoComplete="off"
							onChange={(e) => setNote(e.target.value)}
							value={note}
						/>
					</fieldset>
					<button
						className="btn-primary p-4 mx-44 my-4"
						type="submit"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateBox;
