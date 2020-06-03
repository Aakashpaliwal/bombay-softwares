import React, { Component } from "react";
import axios from "axios";
import "./imagegrid.css";
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
	}

	async componentDidMount() {
		let response = await axios.get(
			`https://api.unsplash.com/photos/?client_id=${key}&per_page=28`
		);
		this.setState({
			images: response.data,
		});
	}

	changeHandler = (e) => {
		this.setState({
			query: e.target.value,
		});
	};

	submitHandler = (e) => {
		e.preventDefault();
		let response = axios
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
	};

	render() {
		let filtered_images_component;
		if (this.state.filtered_images) {
			filtered_images_component = (
				<section className="grid">
					{this.state.search_images.length ? (
						this.state.search_images.map(function (item, index) {
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
			);
		} else {
			filtered_images_component = (
				<section className="grid">
					{this.state.images.length ? (
						this.state.images.map(function (item, index) {
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
			);
		}
		return (
			<React.Fragment>
				<section className="imagegrid-main">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="input-group mb-3">
									<input
										type="text"
										className="form-control"
										placeholder="Search Query..."
										aria-label="Search Query..."
										aria-describedby="basic-addon2"
										name="query"
										value={this.state.query}
										onChange={(e) => this.changeHandler(e)}
									/>
									<div className="input-group-append">
										<button
											className="btn btn-outline-secondary"
											type="button"
											onClick={(e) =>
												this.submitHandler(e)
											}
										>
											Search
										</button>
									</div>
								</div>
								<div className="">
									{filtered_images_component}
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
