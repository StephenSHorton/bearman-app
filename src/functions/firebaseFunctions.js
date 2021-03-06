import { db } from "../config/firebase";

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
