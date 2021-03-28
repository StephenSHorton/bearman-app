import React from "react";
import ReactDOM from "react-dom";
import "./assets/main.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import PrintProvider from "react-easy-print";

ReactDOM.render(
	<React.StrictMode>
		<PrintProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</PrintProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
