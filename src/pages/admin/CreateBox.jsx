import React from "react";
import { chevronRight } from "../../components/common/icons";

const CreateBox = () => {
	const [part_type, setPartType] = React.useState("");
	const [model, setModel] = React.useState("");
	const [box_number, setBoxNumber] = React.useState(0);
	const [quantity, setQuantity] = React.useState(0);
	const [operations, setOperations] = React.useState([]);
	const [note, setNote] = React.useState("");
	const [serialRangeMin, setSerialRangeMin] = React.useState("");
	const [serialRangeMax, setSerialRangeMax] = React.useState("");

	const clearForm = () => {
		setPartType("");
		setModel("");
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
				<form className="grid bg-gray-700 shadow-2xl rounded-xl">
					<fieldset className="flex flex-col m-5 mx-10">
						<label>Part Type</label>
						<select
							autoComplete="off"
							id="partTypeSelect"
							onChange={(e) => setPartType(e.target.value)}
						>
							<option value="">Select</option>
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
						>
							<option value="">Select</option>
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
								value={serialRangeMin}
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
								value={serialRangeMax}
							/>
						</div>
					</fieldset>
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
							<select autoComplete="off" id="operationsSelect">
								<option value="">Select an operation</option>
							</select>
							<button
								type="button"
								className="btn-primary mx-2 p-2 text-sm"
							>
								Add All
							</button>
						</div>
						<div className="p-10 bg-gray-300 text-center font-semibold text-xl text-black">
							<ul className="grid grid-cols-4">
								<li className="flex items-center justify-center my-2">
									{chevronRight}
									<p>Operation</p>
								</li>
								<li className="flex items-center justify-center my-2">
									{chevronRight}
									<p>Operation</p>
								</li>
								<li className="flex items-center justify-center my-2">
									{chevronRight}
									<p>Operation</p>
								</li>
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
