import { db } from "../config/firebase";

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
		.orderBy("created_at")
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
// export const addDocumentsToDatabase = (docs) => {
// 	docs.forEach((doc) => {
// 		let newDoc = doc;
// 		newDoc.operations.forEach((op) => {
// 			op.model = newDoc.model;
// 			op.part_type = newDoc.part_type;
// 			op.interruptions = [
// 				{
// 					interrupted_at: new Date().getTime(),
// 					interrupted_by: "",
// 					reason: "OP was left interrupted",
// 				},
// 			];
// 			return;
// 		});
// 		if (newDoc.retiredAt) {
// 			newDoc.created_at = new Date(newDoc.retiredAt);
// 			delete newDoc.retiredAt;
// 		} else if (newDoc.created_at) {
// 			newDoc.created_at = new Date(newDoc.created_at);
// 		}
// 		newDoc.history = [];
// 		return db.collection("Boxes").add(newDoc);
// 	});
// };
