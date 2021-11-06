import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Home from './containers/Home';
import NewSession from './containers/session/new/NewSession';
import './css/App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const styles = {
	root: {
		background: 'white',
		borderRadius: '20px 20px 0 0',
		height: '90%',
		overflow: 'scroll',
		marginBottom: 20,
	},
};

function App({ classes }) {
  return (
		<Router>
			<div className="App">
        <div className={classes.root}>
          <Switch>
            <Route exact path="/"> <Home /> </Route>
            <Route exact path="/newSession"> <NewSession /> </Route>
          </Switch>
        </div>
			</div>
		</Router>
  );
}


export default withStyles(styles)(App);
