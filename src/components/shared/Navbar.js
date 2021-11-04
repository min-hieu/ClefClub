import '../../css/navbar.scss';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../Constant'
import React from 'react';
import { styled, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

const styles = {
  appBar: {
    background: SECONDARY_COLOR,
    top: '630px',
    bottom: 0,
  },
  addIcon: {
    fontSize: 70,
  },
  leftIcon: {
    color: PRIMARY_COLOR,
    fontSize: 35,
    margin: 10,
  },
  rightIcon: {
    color: PRIMARY_COLOR,
    fontSize: 35,
    margin: 10,
  },
}
;

const StyledFab = styled(Fab)({
  position: 'absolute',
  color: TERTIARY_COLOR,
  background: SECONDARY_COLOR,
  zIndex: 1,
  top: 'auto',
  bottom: 25,
  left: 0,
  right: 0,
  margin: '0 auto',
  '&:hover': {
    background: TERTIARY_COLOR,
    color: SECONDARY_COLOR
  },
});


function Navbar({ classes }) {
  const icons = [
      <HomeOutlinedIcon className={classes.leftIcon}/>,
      <PersonOutlinedIcon className={classes.leftIcon}/>,
  ]

  return (
	  <nav class="menu">
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Grid container spacing={2} direction="row">
            <Grid item xs>
              <HomeOutlinedIcon className={classes.leftIcon}/>
            </Grid>
            <Grid item xs>
              <PersonOutlinedIcon className={classes.leftIcon}/>
            </Grid>
            <Grid item xs>
            </Grid>
            <Grid item xs>
              <HistoryOutlinedIcon className={classes.rightIcon}/>
            </Grid>
            <Grid item xs>
              <SearchOutlinedIcon className={classes.rightIcon}/>
            </Grid>
          </Grid>
          <StyledFab aria-label="add">
            <AddCircleRoundedIcon className={classes.addIcon}/>
          </StyledFab>
        </Toolbar>
      </AppBar>
		</nav>
  );
}

export default withStyles(styles)(Navbar);
