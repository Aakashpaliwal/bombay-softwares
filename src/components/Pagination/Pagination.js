import React, { Component } from "react";
import "./pagination.css";

export default class Pagination extends Component {
	constructor(props) {
		super(props);
	}
	pages() {
		var pages = [];
		for (var i = this.rangeStart(); i <= this.rangeEnd(); i++) {
			pages.push(i);
		}
		return pages;
	}

	rangeStart() {
		var start = this.props.current - this.props.pageRange;
		return start > 0 ? start : 1;
	}

	rangeEnd() {
		var end = this.props.current + this.props.pageRange;
		var totalPages = this.totalPages();
		return end < totalPages ? end : totalPages;
	}

	totalPages() {
		return Math.ceil(this.props.total / this.props.perPage);
	}

	nextPage() {
		return this.props.current + 1;
	}

	prevPage() {
		return this.props.current - 1;
	}

	hasFirst() {
		return this.rangeStart() !== 1;
	}

	hasLast() {
		return this.rangeEnd() < this.totalPages();
	}

	hasPrev() {
		return this.props.current > 1;
	}

	hasNext() {
		return this.props.current < this.totalPages();
	}

	changePage(page) {
		window.scrollTo({ top: 0, behavior: "smooth" });
		setTimeout(
			function () {
				this.props.onPageChanged(page);
			}.bind(this),
			1000
		);
	}
	render() {
		return (
			<div>
				{" "}
				<div className="pagination">
					<div className="pagination__left">
						<div
							className={
								!this.hasPrev()
									? "hidden"
									: "pagination_bottom_div"
							}
							onClick={(e) => this.changePage(this.prevPage())}
						>
							Prev
						</div>
					</div>

					<div className="pagination__mid">
						<ul>
							<li className={!this.hasFirst() ? "hidden" : ""}>
								<div
									className="pagination_bottom_div"
									onClick={(e) => this.changePage(1)}
								>
									1
								</div>
							</li>
							<li className={!this.hasFirst() ? "hidden" : ""}>
								...
							</li>
							{this.pages().map((page, index) => {
								return (
									<li key={index}>
										<div
											onClick={(e) =>
												this.changePage(page)
											}
											className={
												this.props.current == page
													? "pagination_bottom_div"
													: "pagination_bottom_div"
											}
										>
											{page}
										</div>
									</li>
								);
							})}
							<li className={!this.hasLast() ? "hidden" : ""}>
								...
							</li>
							<li className={!this.hasLast() ? "hidden" : ""}>
								<div
									className="pagination_bottom_div"
									onClick={(e) =>
										this.changePage(this.totalPages())
									}
								>
									{this.totalPages()}
								</div>
							</li>
						</ul>
					</div>

					<div className="pagination__right">
						<div
							className={
								!this.hasNext()
									? "hidden"
									: "pagination_bottom_div"
							}
							onClick={(e) => this.changePage(this.nextPage())}
						>
							Next
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Pagination.defaultProps = {
	pageRange: 2,
};
