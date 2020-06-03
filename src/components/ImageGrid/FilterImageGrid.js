import React, { Component, useState, useEffect } from "react";

function FilterImageGrid(props) {
	const [filterImages, setFilterImages] = useState([]);

	useEffect(() => {
		const response = props.filterImageValue;
		setFilterImages(response);
	});

	return (
		<div>
			{" "}
			<section className="grid">
				{filterImages.length ? (
					filterImages.map(function (item, index) {
						return (
							<div
								key={index}
								className={`item item-${Math.ceil(
									item.height / item.width
								)}`}
							>
								<img
									src={item.urls.small}
									alt={item.user.username}
								/>
							</div>
						);
					})
				) : (
					<div className="loading" />
				)}
			</section>
		</div>
	);
}

export default FilterImageGrid;
