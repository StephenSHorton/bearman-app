import React from "react";

const QRCodeGenerator = ({ width, boxID }) => {
	return (
		<a
			href={`https://chart.googleapis.com/chart?cht=qr&chs=256x256&chl=https://bearman-app-eaf20.web.app/box/${boxID}&choe=UTF-8`}
			target="blank"
		>
			<img
				className="mx-auto my-auto"
				src={`https://chart.googleapis.com/chart?cht=qr&chs=256x256&chl=https://bearman-app-eaf20.web.app/box/${boxID}&choe=UTF-8`}
				alt="qr code"
				// onLoad={() => setQRImageLoaded(true)} //TODO get loader to show up while image loads
				width={`${width ? width : "256px"}`}
			/>
		</a>
	);
};

export default QRCodeGenerator;
