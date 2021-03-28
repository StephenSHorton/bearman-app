import React from "react";

const SerialListGenerator = ({ serialMin, serialMax, model }) => {
	const jsxArray = [];
	switch (model) {
		case "CL":
			for (let i = serialMin; i <= serialMax; i++) {
				jsxArray.push(
					<div className="h-12 overflow-hidden mx-4 my-3">
						<img
							style={{ transform: "translateY(-70px)" }}
							key={i}
							alt="Barcoded value"
							src={`http://bwipjs-api.metafloor.com/?bcid=code128&scale=1&text=${i}&includetext`}
							width="100px"
						/>
					</div>
				);
			}
			return (
				<div className="grid grid-cols-5">
					{jsxArray.map((el) => el)}
				</div>
			);
		default:
			const min = serialMin.slice(2);
			const max = serialMax.slice(2);
			console.log(serialMax, serialMin);
			console.log(min, max);
			for (let i = min; i <= max; i++) {
				jsxArray.push(
					<div className="h-20 overflow-hidden mx-4">
						<img
							style={{ transform: "translateY(-40px)" }}
							key={i}
							alt="Barcoded value"
							src={`http://bwipjs-api.metafloor.com/?bcid=code128&scale=1&text=${
								"BT0" + i
							}&includetext`}
							width="100px"
						/>
					</div>
				);
			}
			return (
				<div className="grid grid-cols-5">
					{jsxArray.map((el) => el)}
				</div>
			);
	}
};

export default SerialListGenerator;
