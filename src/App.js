import React, { lazy, Suspense } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";

const ImageGrid = lazy(() => import("./components/ImageGrid/ImageGrid"));
const renderLoader = () => <div className="loading" />;

function App() {
	return (
		<div>
			<Header />
			<Suspense fallback={renderLoader()}>
				<ImageGrid />
			</Suspense>
		</div>
	);
}

export default App;
