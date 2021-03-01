import { db } from "./firebase";
import getQRStatus from "../functions/getQRStatus";

export const fixQR = () =>
	db
		.collection("RetiredQRs")
		.doc("fArkTG2PHIwqW4vCy4aY")
		.get()
		.then((doc) =>
			db
				.collection("ActiveQRs")
				.doc("fArkTG2PHIwqW4vCy4aY")
				.set({ ...doc.data() })
		)
		.catch((err) => console.error(err));

//QR functions
export const getActiveQR = (id) => db.collection("ActiveQRs").doc(id).get();
export const getActiveQRs = () => db.collection("ActiveQRs").get();
export const createActiveQR = (doc) => db.collection("ActiveQRs").add(doc);
export const updateActiveQR = (id, newDoc) => {
	const newStatus = getQRStatus(newDoc);
	if (newStatus === 4) {
		return db
			.collection("ActiveQRs")
			.doc(id)
			.set({ ...newDoc, status: newStatus }, { merge: true });
	} else {
		return db
			.collection("ActiveQRs")
			.doc(id)
			.set({ ...newDoc, status: newStatus }, { merge: true });
	}
};
export const updateActiveQRNoMerge = (id, newDoc) => {
	const newStatus = getQRStatus(newDoc);
	return db
		.collection("ActiveQRs")
		.doc(id)
		.set({ ...newDoc, status: newStatus }, { merge: false });
};
export const deleteActiveQR = (id) =>
	db.collection("ActiveQRs").doc(id).delete();
export const retireActiveQR = (id, doc) => {
	db.collection("RetiredQRs")
		.doc(id)
		.set(doc)
		.then(db.collection("ActiveQRs").doc(id).delete());
};
export const streamActiveQR = (id, observer) =>
	db.collection("ActiveQRs").doc(id).onSnapshot(observer);
export const streamActiveQRs = (observer) =>
	db.collection("ActiveQRs").onSnapshot(observer);
export const getRetiredQRs = () => db.collection("RetiredQRs").get();
//Employee
export const getEmployee = (id) => db.collection("Employees").doc(id).get();
export const getEmployees = () => db.collection("Employees").get();
export const createEmployee = (doc) => db.collection("Employees").add(doc);

// TESTING PURPOSES/DATABASE CHANGES
// export const transferTest = () => {
// 	QRs.forEach((doc) => {
// 		const boxNumber = doc.boxNumber;
// 		const currentOp = doc.subStatus ? doc.subStatus : "";
// 		const lastModifiedBy = "";
// 		const logs = [];
// 		const model = doc.model;
// 		const note = doc.note;
// 		const partCategory = doc.category;
// 		const quantity = doc.quantity;
// 		const serial = doc.serial;

// 		let status;
// 		switch (doc.subStatusState) {
// 			case "NOTSTARTED":
// 				status = 1;
// 				break;
// 			case "INTERRUPTED":
// 				status = 2;
// 				break;
// 			case "INPROGRESS":
// 				status = 3;
// 				break;
// 			case "COMPLETED":
// 				status = 4;
// 				break;
// 			default:
// 				status = 1;
// 				break;
// 		}

// 		let operations = doc.operations.map((op, index) => {
// 			let s;
// 			switch (doc.operations[index].status) {
// 				case "NOTSTARTED":
// 					s = 1;
// 					break;
// 				case "INTERRUPTED":
// 					s = 2;
// 					break;
// 				case "INPROGRESS":
// 					s = 3;
// 					break;
// 				case "COMPLETED":
// 					s = 4;
// 					break;
// 				default:
// 					s = 1;
// 					break;
// 			}
// 			return {
// 				description: doc.operations[index].operation.description,
// 				id: doc.operations[index].operation.id,
// 				listOrder: doc.operations[index].operation.list_order,
// 				logs: [],
// 				status: s,
// 			};
// 		});

// 		if (doc.serial) {
// 			db.collection("ActiveQRs").add({
// 				boxNumber,
// 				currentOp,
// 				lastModifiedBy,
// 				logs,
// 				model,
// 				serial,
// 				note,
// 				operations,
// 				partCategory,
// 				quantity,
// 				status,
// 			});
// 		} else {
// 			db.collection("ActiveQRs").add({
// 				boxNumber,
// 				currentOp,
// 				lastModifiedBy,
// 				logs,
// 				model,
// 				note,
// 				operations,
// 				partCategory,
// 				quantity,
// 				status,
// 			});
// 		}
// 	});
// };
