import React from "react";

const QRCodeGenerator = ({ width, boxID }) => {
	return (
		<a
			href={`https://api.qrserver.com/v1/create-qr-code/?data=https://bearman-app-eaf20.web.app/box/${boxID}&amp;size=256x256`}
			target="blank"
		>
			<img
				className="mx-auto my-auto"
				src={`https://api.qrserver.com/v1/create-qr-code/?data=https://bearman-app-eaf20.web.app/box/${boxID}&amp;size=256x256`}
				alt="qr code"
				// onLoad={() => setQRImageLoaded(true)} //TODO get loader to show up while image loads
				width={`${width ? width : "256px"}`}
			/>
		</a>
	);
};

export default QRCodeGenerator;
