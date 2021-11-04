import React from 'react';
import Home from './containers/Home.js';
import './css/App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/"> <Home /> </Route>
				</Switch>
			</div>
		</Router>
  );
}


export default App;
