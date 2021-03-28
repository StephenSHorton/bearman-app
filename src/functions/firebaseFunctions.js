import { db } from "../config/firebase";

//Boxes
export const createBox = (doc) => db.collection("Boxes").add(doc);
export const retrieveBox = (id) => db.collection("Boxes").doc(id).get();
export const streamBox = (id, observer) =>
	db.collection("Boxes").doc(id).onSnapshot(observer);
export const updateBox = (id, updatedDoc) =>
	db.collection("Boxes").doc(id).set(updatedDoc, { merge: true });

export const streamActiveBoxesByAttribute = (attribute, value, observer) =>
	db
		.collection("Boxes")
		.where("is_active", "==", true)
		.where(attribute, "==", value)
		.onSnapshot(observer);

export const getRetiredBoxesByAttribute = (attribute, value) =>
	db
		.collection("Boxes")
		.where("is_active", "==", false)
		.where(attribute, "==", value)
		.get();

//Operations
export const getOperations = (partType, model) =>
	db
		.collection("Operations")
		.where("part_type", "==", partType)
		.where("model", "==", model)
		.get();

//Employees
export const createEmployee = (doc) => db.collection("Employees").add(doc);
export const getEmployees = () => db.collection("Employees").get();
