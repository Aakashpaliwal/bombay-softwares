import React, { Component, lazy, Suspense } from "react";
import axios from "axios";
import "./imagegrid.css";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "./Pagination";

const key = "olFKDlOJvm_Rm97aVlPs7j-yRe_ixTempI6ishtyy2E";
const FilterImageGrid = lazy(() => import("./FilterImageGrid"));
const renderLoader = () => <div className="loading" />;

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
					// totalPhotos: res.headers["x-total"],
					// currentPage: page,
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
										<Suspense fallback={renderLoader()}>
											<FilterImageGrid
												filterImageValue={
													this.state.search_images
												}
											/>
										</Suspense>
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
															className="grid__item"
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
											<Pagination
												current={this.state.currentPage}
												total={this.state.totalPhotos}
												perPage={this.state.perPage}
												onPageChanged={this.fetchPhotos.bind(
													this
												)}
											/>
										</section>
									)}
								</div>
							</div>
						</div>
					</div>
				</section>
			</React.Fragment>
		);
	}
}

export default ImageGrid;
