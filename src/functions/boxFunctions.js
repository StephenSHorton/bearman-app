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

export const getSortedBoxes = (boxes, param) => {
	switch (param) {
		case "completed_at":
			return boxes.sort((a, b) => {
				const _a = new Date(a[param]).getTime();
				const _b = new Date(b[param]).getTime();
				let comparison = 0;
				if (_a < _b) {
					comparison = 1;
				} else if (_a > _b) {
					comparison = -1;
				}
				return comparison;
			});
		default:
			console.log(param);
			if (param) {
				return boxes.sort((a, b) => {
					const _a = a[param];
					const _b = b[param];
					let comparison = 0;
					if (_a > _b) {
						comparison = 1;
					} else if (_a < _b) {
						comparison = -1;
					}
					return comparison;
				});
			} else return boxes;
	}
};
