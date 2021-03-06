import React from "react";

const About = () => {
	return (
		<div className="text-3xl">
			<header>
				<h1>About Us</h1>
			</header>
			<div className="grid justify-items-center">
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
				<iframe
					className="m-10"
					title="address map"
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.550440580369!2d-111.89893648459602!3d40.683873379335104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87528b6cd453709d%3A0xcddf90ccb173689e!2s4033%20Howick%20St%2C%20Millcreek%2C%20UT%2084107!5e0!3m2!1sen!2sus!4v1615065816489!5m2!1sen!2sus"
					width="1000px"
					height="550px"
					style={{ border: "0" }}
					allowfullscreen=""
					loading="lazy"
				></iframe>
			</div>
		</div>
	);
};

export default About;
