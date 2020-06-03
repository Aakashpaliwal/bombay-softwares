import React, { Component } from "react";
import axios from "axios";
import "./imagegrid.css";
import FilterImageGrid from "./FilterImageGrid";
import SearchBox from "../SearchBox/SearchBox";

const key = "olFKDlOJvm_Rm97aVlPs7j-yRe_ixTempI6ishtyy2E";

class ImageGrid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			query: "",
			search_images: [],
			filtered_images: false,
		};
		this.setQuery = this.setQuery.bind(this);
	}

	async componentDidMount() {
		let response = await axios.get(
			`https://api.unsplash.com/photos/?client_id=${key}&per_page=28`
		);
		this.setState({
			images: response.data,
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
							</div>
						</div>
					</div>
				</section>
			</React.Fragment>
		);
	}
}

export default ImageGrid;
