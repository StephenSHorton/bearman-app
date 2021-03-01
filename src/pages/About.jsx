import React from "react";

const About = () => {
	return (
		<div className="text-3xl">
			<header>
				<h1>About Us</h1>
			</header>
			<div>
				<div className="m-20 text-center">
					<p className="p-10">
						Bearman Industries is a handgun manufacturer in
						Millcreek Utah.
					</p>
					<p className="p-10">
						Main product is the Derringer handgun.
					</p>
				</div>
				<div className="grid justify-center">
					<p>Contact:</p>
					<p>4033 S Howick St, Millcreek, UT 84107</p>
					<p>385.500.9860</p>
				</div>
			</div>
		</div>
	);
};

export default About;
