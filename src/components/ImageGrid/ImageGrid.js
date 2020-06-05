import React, { Component, lazy, Suspense } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import "./imagegrid.css";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

const key = "olFKDlOJvm_Rm97aVlPs7j-yRe_ixTempI6ishtyy2E";
const FilterImageGrid = lazy(() => import("./FilterImageGrid"));
const renderLoader = () => <div className="loading" />;

class ImageGrid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			query: "",
			filtered_images: false,
			totalPhotos: 0,
			perPage: 10,
			currentPage: 1,
		};
		this.setQuery = this.setQuery.bind(this);
		this.fetchPhotos = this.fetchPhotos.bind(this);
	}

	async componentDidMount() {
		this.fetchPhotos(this.state.currentPage);
		console.log(this.props.history);
	}

	//function to fetch photos
	async fetchPhotos(page) {
		let response = await axios.get(
			`https://api.unsplash.com/photos/?page=${page}&client_id=${key}&per_page=${this.state.perPage}`
		);
		this.setState({
			images: response.data,
			totalPhotos: response.headers["x-total"],
			currentPage: page,
		});
		console.log(response);
	}

	//function to get value from searchbox component through props

	async setQuery(queryValue) {
		await this.setState({
			query: queryValue,
			filtered_images: true,
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
										<div>
											<Suspense fallback={renderLoader()}>
												<FilterImageGrid
													queryvalue={
														this.state.query
													}
												/>
											</Suspense>
										</div>
									) : (
										<div>
											<section className="grid">
												{this.state.images.length ? (
													this.state.images.map(
														function (item, index) {
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
																			item
																				.urls
																				.small
																		}
																		alt={
																			item
																				.user
																				.username
																		}
																	/>
																</div>
															);
														}
													)
												) : (
													<div className="loading" />
												)}
											</section>
											<Pagination
												current={this.state.currentPage}
												total={this.state.totalPhotos}
												perPage={this.state.perPage}
												onPageChanged={this.fetchPhotos.bind(
													this
												)}
											/>
										</div>
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

export default withRouter(ImageGrid);
