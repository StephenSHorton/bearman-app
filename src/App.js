import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoadingSymbol from "./components/common/LoadingSymbol";
import BottomBar from "./components/navigation/BottomBar";
import Navbar from "./components/navigation/Navbar";
import About from "./pages/About";
import BoxView from "./pages/admin/BoxView";
import CreateBox from "./pages/admin/CreateBox";
import Dashboard from "./pages/admin/Dashboard";

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
								<Route exact path="/login" component={Login} />
								<Route
									exact
									path="/dashboard"
									component={Dashboard}
								/>
								<Route
									exact
									path="/create"
									component={CreateBox}
								/>
								<Route path="/box/:boxID" component={BoxView} />
							</Switch>
						) : (
							// Standard Routes
							<Switch>
								<Route exact path="/" component={Home} />
								<Route exact path="/about" component={About} />
								<Route exact path="/login" component={Login} />
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
