import React from "react";
import { updateBox } from "../../functions/firebaseFunctions";

const NewNote = ({ box, selectedEmployee }) => {
	const [newNote, setNewNote] = React.useState(box.note);

	const handleNoteSave = (e) => {
		e.preventDefault();
		if (!selectedEmployee) {
			alert(
				"Error: An employee must be selected in order to make changes."
			);
			return;
		}
		const newHistory = box.history;
		newHistory.push({
			description: "Note was changed",
			old_value: box.note,
			new_value: newNote,
			updated_at: new Date().getTime(),
			updated_by: selectedEmployee.name,
		});
		const updatedDoc = {
			...box,
			note: newNote,
			history: newHistory,
			updated_by: selectedEmployee.name,
		};
		updateBox(box.id, updatedDoc);
	};

	const checkIfSelectedEmployee = (e) => {
		if (!selectedEmployee) {
			e.target.blur();
			alert("Please select an employee before making changes.");
		}
	};

	return (
		<div className="w-full h-full flex">
			<textarea
				className="p-4 w-full h-full border-b-0 resize-none"
				value={newNote}
				placeholder={"Note Section"}
				onChange={(e) => setNewNote(e.target.value)}
				onFocus={checkIfSelectedEmployee}
			/>
			{box.note !== newNote ? (
				<div className="grid">
					<button
						className="btn-primary p-0 rounded-none"
						onClick={handleNoteSave}
					>
						Save Note
					</button>
					<button
						className="btn-danger"
						onClick={() => setNewNote(box.note)}
					>
						Undo
					</button>
				</div>
			) : null}
		</div>
	);
};

export default NewNote;
