import React, { Component } from "react";
import axios from "axios";
import "./imagegrid.css";
import FilterImageGrid from "./FilterImageGrid";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "./Pagination";

const key = "olFKDlOJvm_Rm97aVlPs7j-yRe_ixTempI6ishtyy2E";

class ImageGrid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			query: "",
			search_images: [],
			filtered_images: false,
			totalPhotos: 0,
			perPage: 6,
			currentPage: 1,
		};
		this.setQuery = this.setQuery.bind(this);
		this.fetchPhotos = this.fetchPhotos.bind(this);
	}

	async componentDidMount() {
		this.fetchPhotos(this.state.currentPage);
	}

	async fetchPhotos(page) {
		let response = await axios.get(
			`https://api.unsplash.com/photos/?page=${page}&client_id=${key}&per_page=${this.state.perPage}`
		);
		console.log(response);
		this.setState({
			images: response.data,
			totalPhotos: response.headers["x-total"],
			currentPage: page,
		});
	}

	async setQuery(queryValue) {
		await this.setState({
			query: queryValue,
		});
		await axios
			.get(
				`https://api.unsplash.com/search/photos/?query=${this.state.query}/&client_id=${key}`
			)
			.then((res) => {
				console.log(res);
				this.setState({
					search_images: res.data.results,
					filtered_images: true,
				});
			});
	}

	render() {
		return (
			<React.Fragment>
				<section className="imagegrid-main">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<SearchBox getQueryFunction={this.setQuery} />
								<div className="">
									{this.state.filtered_images ? (
										<FilterImageGrid
											filterImageValue={
												this.state.search_images
											}
										/>
									) : (
										<section className="grid">
											{this.state.images.length ? (
												this.state.images.map(function (
													item,
													index
												) {
													return (
														<div
															key={index}
															className={`item item-${Math.ceil(
																item.height /
																	item.width
															)}`}
														>
															<img
																src={
																	item.urls
																		.small
																}
																alt={
																	item.user
																		.username
																}
															/>
														</div>
													);
												})
											) : (
												<div className="loading" />
											)}
										</section>
									)}
								</div>
								<Pagination
									current={this.state.currentPage}
									total={this.state.totalPhotos}
									perPage={this.state.perPage}
									onPageChanged={this.fetchPhotos.bind(this)}
								/>
							</div>
						</div>
					</div>
				</section>
			</React.Fragment>
		);
	}
}

export default ImageGrid;
