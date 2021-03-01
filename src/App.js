import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoadingSymbol from "./components/common/LoadingSymbol";
import BottomBar from "./components/navigation/BottomBar";
import Navbar from "./components/navigation/Navbar";
import About from "./pages/About";

import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
	const isLogged = useSelector((state) => state.user.isLogged);
	const isLogging = useSelector((state) => state.user.isLogging);

	return (
		<BrowserRouter>
			<div className="App">
				<Navbar />
				<div
					className="max-w-screen-2xl mx-auto border-l-4 border-r-4 border-red-500"
					style={{ marginTop: "58px" }} //This is hard coded (subject to change)
				>
					<div className="min-h-screen">
						{isLogging ? (
							<LoadingSymbol />
						) : isLogged ? (
							// Logged in Routes
							<Switch>
								<Route exact path="/" component={Home} />
								<Route exact path="/about" component={About} />
								<Route exact path="/Login" component={Login} />
							</Switch>
						) : (
							// Standard Routes
							<Switch>
								<Route exact path="/" component={Home} />
								<Route exact path="/about" component={About} />
								<Route exact path="/Login" component={Login} />
							</Switch>
						)}
					</div>
					<BottomBar />
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
