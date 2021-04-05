import React from "react";

const SelectSortParam = ({ sortP, setSortP }) => {
	const [isOpenModal, setIsOpenModal] = React.useState(false);
	const wrapperRef = React.useRef(null);
	const params = [
		"box_number",
		"serial_range_min",
		"serial_range_max",
		"quantity",
	];

	//This listener will close the employeelist modal when click outside (Can handle other refs)
	React.useEffect(() => {
		const handleClickOutside = (event) => {
			if (!isOpenModal) return;
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target)
			) {
				setIsOpenModal(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [wrapperRef, isOpenModal]);

	const handleParamSelection = (selection) => {
		setSortP(selection);
		setIsOpenModal(!isOpenModal);
	};

	return (
		<div>
			<button
				className={`btn-success flex items-center h-full`}
				onClick={() => setIsOpenModal(true)}
			>
				Sort By:
				<p className="text-lg ml-2 font-bold text-yellow-300">
					{sortP}
				</p>
			</button>
			<div>
				<div className={`${isOpenModal ? "" : "hidden"} absolute z-20`}>
					<div
						className="grid space-y-8 p-10 bg-gray-700 rounded-md text-black"
						ref={wrapperRef}
					>
						{params.map((param, index) => (
							<button
								key={index}
								className="btn-primary px-8 py-8 text-white text-3xl"
								onClick={() => handleParamSelection(param)}
							>
								{param}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SelectSortParam;
