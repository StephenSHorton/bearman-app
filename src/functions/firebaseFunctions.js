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
// export const getBoxStatistics = () => {
// 	db.collection("Boxes")
// 		.get()
// 		.then((querySnapshot) => {
// 			let total = 0;
// 			let partsTotal = 0;
// 			querySnapshot.forEach((d) => {
// 				const doc = d.data();
// 				if (!doc.created_at) return;
// 				const created_at = doc.created_at.toDate();
// 				if (created_at.getMonth() < 3) return;
// 				if (created_at.getFullYear() < 2021) return;
// 				if (doc.is_active === true) return;
// 				if (doc.status !== 4) return;
// 				total += 1;
// 				partsTotal += doc.quantity;
// 			});
// 			console.log(
// 				`%cTotal Boxes:${total} Total Parts: ${partsTotal}`,
// 				"color: #00ffcc; background: #003366; padding: 20px;"
// 			);
// 		});
// };
