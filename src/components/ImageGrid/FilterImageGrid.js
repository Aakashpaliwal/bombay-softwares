import React, { Component } from "react";
import { withRouter } from "react-router";
import Pagination from "../Pagination/Pagination";
import axios from "axios";

const key = "olFKDlOJvm_Rm97aVlPs7j-yRe_ixTempI6ishtyy2E";

class FilterImageGrid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filterImages: [],
			totalPhotos: 0,
			perPage: 10,
			currentPage: 1,
			no_data: false,
		};
		this.fetchPhotos = this.fetchPhotos.bind(this);
	}

	componentDidMount() {
		this.fetchPhotos(this.state.currentPage);
		this.props.history.push(`/?q=${this.props.queryvalue}`);
		console.log(this.props.history);

		// console.log(`${this.props.match.url}?q=${this.props.queryvalue}`);
		// const newurl = `${this.props.match.url}?q=${this.props.queryvalue}`;
		// this.props.match.url = newurl;
		// console.log(this.props.match.url);
	}

	//function to fetch filter photos depends on user query
	async fetchPhotos(page) {
		await axios
			.get(
				`https://api.unsplash.com/search/photos/?page=${page}&query=${this.props.queryvalue}&per_page=${this.state.perPage}/&client_id=${key}`
			)
			.then((res) => {
				console.log(res);
				if (res.data.results) {
					this.setState({
						filterImages: res.data.results,
						totalPhotos: res.headers["x-total"],
						currentPage: page,
						no_data: false,
					});
				} else {
					this.setState({
						no_data: true,
					});
				}
			});
	}
	render() {
		let filterData;
		if (!this.state.no_data) {
			filterData = (
				<section className="grid">
					{this.state.filterImages.length ? (
						this.state.filterImages.map(function (item, index) {
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
			filterData = (
				<center>
					<p>There is No Data.</p>
				</center>
			);
		}
		return (
			<div>
				{" "}
				{filterData}
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

export default withRouter(FilterImageGrid);
