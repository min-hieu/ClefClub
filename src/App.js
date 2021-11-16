import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Home from './containers/Home';
import Profile from './containers/Profile';
import History from './containers/History';
import Search from './containers/Search';
import NewCollab from './containers/collab/NewCollab';
import ContributeToCollab from './containers/collab/ContributeToCollab';
import ViewSession from './containers/collab/ViewSession';
import CollabView from './containers/collab/CollabView';

import Login from "./components/userAuth/Login";
import Signup from "./components/userAuth/Signup";
import PrivateRoute from "./components/userAuth/PrivateRoute";
import ForgotPassword from "./components/userAuth/ForgotPassword";
import UpdateProfile from "./components/userAuth/UpdateProfile";

import { AuthProvider } from "./contexts/AuthContext"

import './css/App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import iphoneX from './assets/iPhoneX.png'

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
				<AuthProvider>
				<Switch>
					<Route exact path="/"> <Home /> </Route>
					<PrivateRoute path="/update-profile" component={UpdateProfile} />
					<Route path="/signup" component={Signup} />
					<Route path="/login" component={Login} />
					<Route path="/forgot-password" component={ForgotPassword} />
					<Route exact path="/profile"> <Profile /> </Route>
					<Route exact path="/history"> <History /> </Route>
					<Route exact path="/search"> <Search /> </Route>
						<Route exact path="/session/new"> <NewCollab /> </Route>
						<Route exact path="/collab/contribute"> <ContributeToCollab /> </Route>
						<Route exact path="/session/view"> <ViewSession /> </Route>
						<Route exact path="/collab/view"> <CollabView /> </Route>
				</Switch>
				</AuthProvider>
				</div>
			</div>
		</Router>
  );
}

export default withStyles(styles)(App);
