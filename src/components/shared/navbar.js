import '../../css/navbar.scss';
import React from 'react';
import { styled, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import Fab from '@material-ui/core/Fab';

const styles = {
  appBar: {
    top: 'auto',
    bottom: 0,
  }
};

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

function Navbar({ classes }) {


  return (
	  <nav class="menu">
      <AppBar position="fixed" className={classes.appBar}>
        <StyledFab color="secondary" aria-label="add">
          <AddCircleRoundedIcon />
        </StyledFab>
      </AppBar>
		</nav>
  );
}

export default withStyles(styles)(Navbar);
