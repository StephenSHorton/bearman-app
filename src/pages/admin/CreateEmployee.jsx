import React from "react";
import { Link } from "react-router-dom";
import { arrowLeft, getIcon } from "../../components/common/icons";
import { createEmployee } from "../../functions/firebaseFunctions";

const CreateEmployee = () => {
	const [name, setName] = React.useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const re = new RegExp(/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/);
		if (!re.test(name)) {
			alert("Please enter a name before submitting.");
			return;
		}
		createEmployee({ name })
			.then(() => {
				setName("");
				alert(`${name} has successfully been created.`);
			})
			.catch((err) => {
				alert(`There was an error submitting your request.`);
				console.log(err);
			});
	};

	return (
		<div className="flex flex-col">
			<header>
				<h1>Create Employee</h1>
			</header>
			<Link to={`/dashboard`}>
				<button className="btn-primary">
					<div className="flex items-center">
						<p className="mr-1">{getIcon(arrowLeft, 4)}</p> Back
					</div>
				</button>
			</Link>
			<form onSubmit={handleSubmit} className="flex flex-col">
				<fieldset className="flex flex-col m-5 mx-10">
					<label>Name</label>
					<input
						className="pl-2"
						type="text"
						autoComplete="off"
						onChange={(e) => setName(e.target.value)}
						value={name}
					/>
				</fieldset>
				<button type="submit" className="btn-primary">
					Create
				</button>
			</form>
		</div>
	);
};

export default CreateEmployee;
