import { createSlice } from "@reduxjs/toolkit";
import { auth, provider } from "../config/firebase";

// console.log(
//     `%c LOGIN_FAILURE: ${err.message} `,
//     "background: #1b235e; color: #1fd3b8; padding: 20px"
// )

const initialState = {
	email: null,
	isAdmin: false,
	isLogged: false,
	isLogging: false,
};

const user = createSlice({
	name: "user",
	initialState,
	reducers: {
		loginRequest: (state) => {
			state.isLogging = true;
		},
		loginSuccess: (state, action) => {
			state.email = action.payload.email;
			state.isAdmin = action.payload.isAdmin;
			state.isLogging = false;
			state.isLogged = true;
		},
		loginFailure: (state) => {
			state.isLogging = false;
		},
		logout: () => {
			return initialState;
		},
	},
});

export const {
	loginRequest,
	loginSuccess,
	loginFailure,
	logout,
} = user.actions;

export const signInOld = () => {
	return (dispatch) => {
		dispatch(loginRequest());
		auth.signInWithPopup(provider)
			.then((res) => {
				const user = res.user;
				user.getIdTokenResult().then((idTokenResult) => {
					const payload = {
						firstName: user.displayName.split(" ")[0],
						lastName: user.displayName.split(" ")[1],
						email: user.email,
						photoURL: user.photoURL,
					};
					if (idTokenResult.claims.admin === true) {
						payload.isAdmin = true;
						dispatch(loginSuccess(payload));
					} else {
						payload.isAdmin = false;
						dispatch(loginSuccess(payload));
					}
				});
			})
			.catch((err) => {
				console.error(
					err.code,
					err.message,
					err.email,
					err.credentials
				);
				dispatch(loginFailure());
			});
	};
};

export const signIn = (email, password) => {
	return (dispatch) => {
		dispatch(loginRequest());
		auth.signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				// dispatch(loginSuccess(user))
				console.log(user);
				return;
				// ...
			})
			.catch((err) => {
				dispatch(loginFailure());
				return `Error ${err.code}: ${err.message}`;
			});
	};
};

// export const signOut = () => {
// 	return (dispatch) => {
// 		dispatch(loginRequest());
// 		auth.signOut()
// 			.then(() => {
// 				dispatch(logout());
// 			})
// 			.catch((err) => {
// 				console.error(err);
// 				dispatch(loginFailure());
// 			});
// 	};
// };

// export const checkLoggedStatus = () => {
// 	return (dispatch) => {
// 		dispatch(loginRequest());
// 		const user = auth.currentUser;
// 		if (user) {
// 			user.getIdTokenResult().then((idTokenResult) => {
// 				const payload = {
// 					firstName: user.displayName.split(" ")[0],
// 					lastName: user.displayName.split(" ")[1],
// 					email: user.email,
// 					photoURL: user.photoURL,
// 				};
// 				if (idTokenResult.claims.admin === true) {
// 					payload.isAdmin = true;
// 					dispatch(loginSuccess(payload));
// 				} else {
// 					payload.isAdmin = false;
// 					dispatch(loginSuccess(payload));
// 				}
// 			});
// 		} else {
// 			console.log("Not logged in");
// 			dispatch(loginFailure());
// 		}
// 	};
// };

export default user;
