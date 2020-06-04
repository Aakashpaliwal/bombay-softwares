import React, { useState, useEffect } from "react";
// import Pagination from "./Pagination";

function FilterImageGrid(props) {
	const [filterImages, setFilterImages] = useState([]);

	useEffect(() => {
		const response = props.filterImageValue;
		setFilterImages(response);
		console.log(response);
	}, [props.filterImageValue]);

	return (
		<div>
			{" "}
			<section className="grid">
				{filterImages.length ? (
					filterImages.map(function (item, index) {
						return (
							<div key={index} className="grid__item">
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
			{/*<Pagination
				current={this.state.currentPage}
				total={this.state.totalPhotos}
				perPage={this.state.perPage}
				onPageChanged={this.fetchPhotos.bind(this)}
			/>*/}
		</div>
	);
}

export default FilterImageGrid;
