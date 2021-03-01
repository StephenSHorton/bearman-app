import React from "react";

import RimmedVsRimlessImage from "../assets/images/bullet-image.png";
import Derringer from "../assets/images/derringer.png";

const Home = () => {
	return (
		<div className="text-center">
			<header className="font-semibold">
				<h1>BEARMAN INDUSTRIES</h1>
			</header>
			<div className="text-2xl">
				<div>
					<img
						src={Derringer}
						alt="Derringer gun"
						className="mx-auto m-10"
					/>
				</div>
				<div>
					<p>
						*2020 Rimless Cartridge models will no longer have
						extractors installed. Current rimless cartridges in
						production are 9mm and .380 auto.
					</p>
					<img
						src={RimmedVsRimlessImage}
						alt="Rimmed vs Rimless comparison"
						className="mx-auto m-10"
					/>
				</div>
				<div>
					<p>
						If you need assistance with warranty work, technical
						service or parts & accessories, please call:
						385.500.9860
					</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
