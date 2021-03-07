import { db } from "../config/firebase";

//Boxes
export const createBox = (doc) => db.collection("Boxes").add(doc);

export const streamActiveBoxesByAttribute = (attribute, value, observer) =>
	db
		.collection("Boxes")
		.where("isActive", "==", true)
		.where(attribute, "==", value)
		.onSnapshot(observer);

export const getRetiredBoxesByAttribute = (attribute, value) =>
	db
		.collection("Boxes")
		.where("isActive", "==", false)
		.where(attribute, "==", value)
		.get();

//Operations
export const getOperations = (partType, model) =>
	db
		.collection("Operations")
		.where("part_type", "==", partType)
		.where("model", "==", model)
		.get();
