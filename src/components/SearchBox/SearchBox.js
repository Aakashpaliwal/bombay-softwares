import React, { useState } from "react";
import { withRouter } from "react-router";
import "./searchbox.css";
const SearchBox = (props) => {
	const [query, setQuery] = useState("");
	const [error, setError] = useState("");

	//function to change value of query and to send query parameter to parent component
	function submitHandler(event) {
		if (query.length > 0) {
			setError("");
			props.getQueryFunction(query);
			// console.log(props);
			// console.log(`${props.match.url}?q=${query}`);
			// let newurl = `${props.match.url}?q=${query}`;
			// props.match.url = newurl;
			// console.log(props.match.url);
		} else {
			setError("Please Enter The Search Parameter.");
		}
	}

	function checkEvent(event) {
		if (event.key == "Enter") {
			submitHandler();
		}
	}

	return (
		<div>
			<div className="input-group mb-3">
				<input
					type="Search"
					className="form-control custom_search_input_css"
					placeholder="Search Query..."
					aria-label="Search Query..."
					aria-describedby="basic-addon2"
					name="query"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyPress={checkEvent}
				/>
				<div className="input-group-append">
					<button
						className="btn btn-outline-secondary custom_search_btn_css"
						type="submit"
						onClick={submitHandler}
					>
						<ion-icon name="search-outline"></ion-icon>
					</button>
				</div>
				<br />
			</div>
			<div>
				<p className="text-danger">{error.length > 0 ? error : null}</p>
			</div>
		</div>
	);
};

export default withRouter(SearchBox);
