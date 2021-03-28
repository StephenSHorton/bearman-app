import React from "react";
import { getIcon, person } from "./icons";

const employees = [
	{ name: "Stephen Horton" },
	{ name: "Stephen Horton" },
	{ name: "Stephen Horton" },
	{ name: "Stephen Horton" },
	{ name: "Stephen Horton" },
	{ name: "Stephen Horton" },
	{ name: "Stephen Horton" },
];

const SelectEmployee = ({ selectedEmployee, setSelectedEmployee }) => {
	const [isOpenEmployeeList, setIsOpenEmployeeList] = React.useState(false);
	const employeeListWrapperRef = React.useRef(null);

	//This listener will close the employeelist modal when click outside (Can handle other refs)
	React.useEffect(() => {
		const handleClickOutside = (event) => {
			if (!isOpenEmployeeList) return;
			if (
				employeeListWrapperRef.current &&
				!employeeListWrapperRef.current.contains(event.target)
			) {
				setIsOpenEmployeeList(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [employeeListWrapperRef, isOpenEmployeeList]);

	const handleEmployeeSelection = (employee) => {
		setSelectedEmployee(employee);
		setIsOpenEmployeeList(!isOpenEmployeeList);
	};

	return (
		<div>
			<button
				className={`${
					selectedEmployee ? "btn-success" : "btn-warning"
				} flex items-center`}
				onClick={() => setIsOpenEmployeeList(true)}
			>
				{selectedEmployee ? selectedEmployee.name : "Select Employee"}{" "}
				<p className="ml-1">{getIcon(person, 6)}</p>
			</button>
			<div>
				<div
					className={`${
						isOpenEmployeeList ? "" : "hidden"
					} absolute z-20`}
				>
					<div
						className="grid space-y-8 p-10 bg-gray-700 rounded-md text-black"
						ref={employeeListWrapperRef}
					>
						<button
							className="btn-danger px-8 py-8 text-white text-3xl"
							onClick={() => handleEmployeeSelection(null)}
						>
							None
						</button>
						{employees.map((employee, index) => (
							<button
								key={index}
								className="btn-primary px-8 py-8 text-white text-3xl"
								onClick={() =>
									handleEmployeeSelection(employee)
								}
							>
								{employee.name}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SelectEmployee;
