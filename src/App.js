import React from "react";
import { Navbar } from "./components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Sukses from "./Pages/Sukses";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/sukses" exact component={Sukses} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
