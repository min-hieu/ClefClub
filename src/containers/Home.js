import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Btn from '../components/shared/button';

const styles = {
	main: {
		background: 'white',
		borderRadius: 20,
		height: '100%',
	},
};

function Home({ classes }) {
  return (
    <div className="Home" className={classes.main}>
			<span id="main-title">
				Hello this is main page.
			</span>
			<Btn text="Login" link="ok"/>
    </div>
  );
}

export default withStyles(styles)(Home);
