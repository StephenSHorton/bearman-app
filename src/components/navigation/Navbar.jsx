import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
	const isLogged = useSelector((state) => state.user.isLogged);
	return (
		<nav className="fixed z-50 top-0 bg-gray-700 w-full shadow-xl">
			<div className="flex justify-between p-2 pt-4 max-w-screen-2xl mx-auto pb-4">
				<Link to="/" className="font-semibold">
					BEARMAN INDUSTRIES
				</Link>
				<div>
					<NavLink exact to="/" className="link mx-2">
						Home
					</NavLink>
					<NavLink to="/about" className="link mx-2">
						About
					</NavLink>
					{isLogged ? (
						<NavLink to="/dashboard" className="link mx-2">
							Dashboard
						</NavLink>
					) : (
						<NavLink to="/login" className="link mx-2">
							Login
						</NavLink>
					)}
					<div>
						{/* TODO: add logged in user's info to show logged in status (pfp, fname lname) */}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
