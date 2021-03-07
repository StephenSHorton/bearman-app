export const getStatus = (boxStatus) => {
	switch (boxStatus) {
		case 2:
			return "INPROGRESS";
		case 3:
			return "INTERRUPTED";
		case 4:
			return "COMPLETED";
		default:
			return "NOTSTARTED";
	}
};

export const getStatusColor = (boxStatus) => {
	switch (boxStatus) {
		case 2:
			return "blue";
		case 3:
			return "yellow";
		case 4:
			return "green";
		default:
			return "red";
	}
};
