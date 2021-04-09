import { db } from "../config/firebase";

//TODO fix database by removing boxes that have the same id attribute or serialmin/max range

//Boxes
export const createBox = (doc) => db.collection("Boxes").add(doc);
export const retrieveBox = (id) => db.collection("Boxes").doc(id).get();
export const streamBox = (id, observer) =>
	db.collection("Boxes").doc(id).onSnapshot(observer);
export const updateBox = (id, updatedDoc) =>
	db.collection("Boxes").doc(id).set(updatedDoc, { merge: true });
export const deleteBox = (id) => db.collection("Boxes").doc(id).delete();

export const streamActiveBoxesByAttribute = (attribute, value, observer) =>
	db
		.collection("Boxes")
		.where("is_active", "==", true)
		.where(attribute, "==", value)
		.orderBy("box_number")
		.onSnapshot(observer);

export const getRetiredBoxesByAttribute = (attribute, value) =>
	db
		.collection("Boxes")
		.where("is_active", "==", false)
		.where(attribute, "==", value)
		.orderBy("created_at", "desc")
		.limit(100)
		.get();

//Operations
export const getOperations = (partType, model) =>
	db
		.collection("Operations")
		.where("part_type", "==", partType)
		.where("model", "==", model)
		.orderBy("list_order")
		.get();

//Employees
export const createEmployee = (doc) => db.collection("Employees").add(doc);
export const getEmployees = () => db.collection("Employees").get();

//Testing
export const fixDocuments = () => {
	db.collection("Boxes")
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				const d = doc.data();
				d.operations.forEach((op) => {
					let newOP = op;
					if (newOP.hasOwnProperty("listOrder")) {
						newOP.list_order = newOP.listOrder;
						delete newOP.listOrder;
					}
					return newOP;
				});
				db.collection("Boxes")
					.doc(doc.id)
					.set(d, { merge: true })
					.catch((err) => console.log(err));
			});
		});
};
