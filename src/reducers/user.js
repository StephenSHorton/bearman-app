import { createSlice } from "@reduxjs/toolkit";
import firebase, { auth } from "../config/firebase";
import Cookies from "js-cookie";

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

const postIdTokenToSessionLogin = (endpoint, idToken, csrfToken) => {
	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		},
		body: JSON.stringify({ idToken, csrfToken }),
	};
	return fetch(
		`https://us-central1-bearman-app-eaf20.cloudfunctions.net${endpoint}`,
		requestOptions
	)
		.then((res) => res.json())
		.then(
			(result) => result,
			(error) => error
		);
};

export const signInUser = (email, pass) => {
	return (dispatch) => {
		dispatch(loginRequest());
		// As httpOnly cookies are to be used, do not persist any state client side.
		auth.setPersistence(firebase.auth.Auth.Persistence.NONE);
		// When the user signs in with email and password.
		auth.signInWithEmailAndPassword(email, pass)
			.then((res) => {
				// Get the user's ID token as it is needed to exchange for a session cookie.
				return res.user.getIdToken().then((idToken) => {
					// Session login endpoint is queried and the session cookie is set.
					const payload = { isAdmin: false };
					if (idToken.claims && idToken.claims.isAdmin === true) {
						payload.isAdmin = true;
					}
					dispatch(loginSuccess(payload));
					const csrfToken = Cookies.get("csrfToken");
					return postIdTokenToSessionLogin(
						"/sessionLogin",
						idToken,
						csrfToken
					);
				});
			})
			.then(() => {
				// A page redirect would suffice as the persistence is set to NONE.
				return auth.signOut();
			})
			.then(() => {
				// window.location.assign("/");
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

export const signOutUser = () => {
	return (dispatch) => {
		dispatch(loginRequest());
		//remove session cookie?
		auth.signOut()
			.then(() => {
				dispatch(logout());
			})
			.catch((err) => {
				console.error(err);
				dispatch(loginFailure());
			});
	};
};

export default user;
