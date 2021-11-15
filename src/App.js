import React from 'react';
import Home from './containers/Home';
import Profile from './containers/Profile';
import Notification from './containers/Notification';
import Search from './containers/Search';
import NewCollab from './containers/collab/new/NewCollab';
import ViewSession from './containers/session/view/ViewSession';
import CollabPreview from './containers/collab/preview/PreviewCollab';
import ViewCollab from './containers/collab/view/ViewCollab';

import Login from "./components/userAuth/Login";
import Signup from "./components/userAuth/Signup";
import PrivateRoute from "./components/userAuth/PrivateRoute";
import ForgotPassword from "./components/userAuth/ForgotPassword";
import UpdateProfile from "./components/userAuth/UpdateProfile";

import { AuthProvider } from "./contexts/AuthContext"

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
  },
  iphoneOverlay: {
    position: 'fixed',
    zIndex: 2,
    pointerEvents: 'none',
  }
};


function App({ classes }) {
  return (
        <Router>
            <div className="App">
                <div style={styles.root}>
                <img src={ iphoneX } style={styles.iphoneOverlay}/>
                <Switch>
                    <Route exact path="/"> <Home /> </Route>
                    <PrivateRoute path="/update-profile" component={UpdateProfile} />
					          <Route path="/signup" component={Signup} />
					          <Route path="/login" component={Login} />
          					<Route path="/forgot-password" component={ForgotPassword} />
                    <Route exact path="/profile"> 
                        <Profile
                        name = "Charlie"
                        picture = {monkey}
                        collabs="169"
                        /> 
                    </Route>
                    <Route exact path="/notification"> <Notification /> </Route>
                    <Route exact path="/search"> <Search /> </Route>
                        <Route exact path="/session/new"> <NewCollab /> </Route>
                        <Route exact path="/session/view"> <ViewSession /> </Route>
                        <Route exact path="/collab/view"> <ViewCollab /> </Route>
                        <Route exact path="/collab/preview"> <CollabPreview /> </Route>
                </Switch>
                </div>
            </div>
        </Router>
  );
}

export default App;
