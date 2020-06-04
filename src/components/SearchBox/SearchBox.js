import React, { useState } from "react";
import "./searchbox.css";
const SearchBox = (props) => {
	const [query, setQuery] = useState("");
	const [error, setError] = useState("");

	//function to change value of query and to send query parameter to parent component
	function submitHandler(event) {
		if (query.length > 0) {
			setError("");
			props.getQueryFunction(query);
		} else {
			setError("Please Enter The Search Parameter.");
		}
	}

	return (
		<div>
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control custom_search_input_css"
					placeholder="Search Query..."
					aria-label="Search Query..."
					aria-describedby="basic-addon2"
					name="query"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<div className="input-group-append">
					<button
						className="btn btn-outline-secondary custom_search_btn_css"
						type="button"
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

export default SearchBox;
