export const chevronRight = (
	<path
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="2"
		d="M9 5l7 7-7 7"
	></path>
);

export const chevronDown = (
	<path
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="2"
		d="M19 9l-7 7-7-7"
	></path>
);
export const chevronUp = (
	<path
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="2"
		d="M5 15l7-7 7 7"
	></path>
);

export const arrowRight = (
	<path
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="2"
		d="M14 5l7 7m0 0l-7 7m7-7H3"
	></path>
);

export const arrowLeft = (
	<path
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="2"
		d="M10 19l-7-7m0 0l7-7m-7 7h18"
	></path>
);

export const boxIcon = (
	<path
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="2"
		d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
	></path>
);

export const boxIcon2 = (
	<path
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="2"
		d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
	></path>
);

export const printer = (
	<path
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="2"
		d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
	></path>
);

export const history = (
	<path
		strokeWidth="0.5"
		d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"
	/>
);

export const trash = (
	<path
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="2"
		d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
	></path>
);

export const person = (
	<path
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="2"
		d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
	></path>
);

export const close = (
	<path
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="2"
		d="M6 18L18 6M6 6l12 12"
	></path>
);

export const qrcode = (
	<path
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="2"
		d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
	></path>
);

export const clock = (
	<path
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="2"
		d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
	></path>
);

export const infoCircle = (
	<path
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="2"
		d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
	></path>
);

export const getCog = (dimension) => {
	return (
		<svg
			className={`w-${dimension} h-${dimension}`}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
			></path>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
			></path>
		</svg>
	);
};

export const getIcon = (icon, dimension, fill) => {
	return (
		<svg
			className={`w-${dimension} h-${dimension}`}
			fill={fill ? fill : "none"}
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			{icon}
		</svg>
	);
};
