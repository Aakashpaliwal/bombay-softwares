import React, { useState } from "react";

const SearchBox = (props) => {
	const [query, setQuery] = useState("");
	const [error, setError] = useState("");

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
					className="form-control"
					placeholder="Search Query..."
					aria-label="Search Query..."
					aria-describedby="basic-addon2"
					name="query"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<div className="input-group-append">
					<button
						className="btn btn-outline-secondary"
						type="button"
						onClick={submitHandler}
					>
						Search
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
