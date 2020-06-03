import React, { useState } from "react";

const SearchBox = (props) => {
	const [query, setQuery] = useState("");

	function submitHandler(event) {
		props.getQueryFunction(query);
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
			</div>
		</div>
	);
};

export default SearchBox;
