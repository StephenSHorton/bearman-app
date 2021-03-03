import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/auth";
import "firebase/functions";
import "firebase/storage";
// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyC0Isy4dr2D_W0BV7RlTQyjs-KjUTAVFeM",
	authDomain: "bearman-app-eaf20.firebaseapp.com",
	projectId: "bearman-app-eaf20",
	storageBucket: "bearman-app-eaf20.appspot.com",
	messagingSenderId: "602353838211",
	appId: "1:602353838211:web:73bf0f9938c7cee07b13b6",
	measurementId: "G-784KH7CG7T",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const db = firebase.firestore();
export const auth = firebase.auth();
export const functions = firebase.functions();
// export const provider = new firebase.auth.GoogleAuthProvider();
// export const storage = firebase.storage();

export default firebase;
