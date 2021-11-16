import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Home from './containers/Home';
import Profile from './containers/Profile';
import History from './containers/History';
import Search from './containers/Search';
import NewCollab from './containers/collab/new/NewCollab';
import ViewSession from './containers/session/view/ViewSession';
import CollabView from './containers/collab/CollabView';
import './css/App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import iphoneX from './assets/iPhoneX.png'

import monkey from './assets/test/monkey.jpeg';

const styles = {
	root: {
		background: 'white',
		borderRadius: 20,
		height: '100%',
		overflow: 'auto',
		marginBottom: 20,
    backgroundImage: `url(${iphoneX})`,
	},
};

function App({ classes }) {
  return (
		<Router>
			<div className="App">
				<div className={classes.root}>
				<Switch>
					<Route exact path="/"> <Home /> </Route>
					<Route exact path="/profile"> <Profile
						name = "Charlie"
						picture = {monkey}
            collabs="169"
					/> </Route>
					<Route exact path="/history"> <History /> </Route>
					<Route exact path="/search"> <Search /> </Route>
						<Route exact path="/session/new"> <NewCollab /> </Route>
						<Route exact path="/session/view"> <ViewSession /> </Route>
						<Route exact path="/collab/view"> <CollabView /> </Route>
				</Switch>
				</div>
			</div>
		</Router>
  );
}

export default withStyles(styles)(App);
