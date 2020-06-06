import React, { lazy, Suspense } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";
import Header from "./components/Header/Header";

const ImageGrid = lazy(() => import("./components/ImageGrid/ImageGrid"));
const FilterImageGrid = lazy(() =>
	import("./components/ImageGrid/FilterImageGrid")
);

const renderLoader = () => <div className="loading" />;

function App() {
	return (
		<div>
			<Header />
			<Suspense fallback={renderLoader()}>
				<Route path="/" exact={true} component={ImageGrid} />
				{/*<Route
					path="/:search"
					exact={true}
					component={FilterImageGrid}
				/>*/}
			</Suspense>
		</div>
	);
}

export default App;
