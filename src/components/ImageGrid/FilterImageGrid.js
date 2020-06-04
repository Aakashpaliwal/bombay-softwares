import React, { useState, useEffect, Component } from "react";
import Pagination from "./Pagination";
import axios from "axios";

const key = "olFKDlOJvm_Rm97aVlPs7j-yRe_ixTempI6ishtyy2E";

class FilterImageGrid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filterImages: [],
			totalPhotos: 0,
			perPage: 6,
			currentPage: 1,
		};
		this.fetchPhotos = this.fetchPhotos.bind(this);
	}

	componentDidMount() {
		this.fetchPhotos(this.state.currentPage);
	}
	async fetchPhotos(page) {
		await axios
			.get(
				`https://api.unsplash.com/search/photos/?page=${page}&query=${this.props.queryvalue}&per_page=${this.state.perPage}/&client_id=${key}`
			)
			.then((res) => {
				console.log(res);
				this.setState({
					filterImages: res.data.results,
					totalPhotos: res.headers["x-total"],
					currentPage: page,
				});
			});
	}
	render() {
		return (
			<div>
				{" "}
				<section className="grid">
					{this.state.filterImages.length ? (
						this.state.filterImages.map(function (item, index) {
							return (
								<div key={index} className="grid__item" _>
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
				<Pagination
					current={this.state.currentPage}
					total={this.state.totalPhotos}
					perPage={this.state.perPage}
					onPageChanged={this.fetchPhotos.bind(this)}
				/>
			</div>
		);
	}
}

export default FilterImageGrid;
