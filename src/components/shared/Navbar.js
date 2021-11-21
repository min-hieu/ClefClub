import '../../css/navbar.scss';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../Constant'
import { Link } from 'react-router-dom';
import React from 'react';
import { styled, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

const styles = {
  appBar: {
    background: SECONDARY_COLOR,
    top: '90%',
    bottom: 0,
    borderRadius: '0 0 20px 20px',
  },
  addIcon: {
    fontSize: 70,
  },
  navIcon: {
    color: PRIMARY_COLOR,
    fontSize: 35,
    margin: 10,
    '&:hover': {
      color: "white",
    },
  },
};

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

const IconWrapper = (icon, link) => (
  <Grid item xs>
    <Link to={link} style={{ textDecoration: 'none' }}>
      {icon}
    </Link>
  </Grid>
)

const Navbar = ({classes}) => {
  const HomeOption    = IconWrapper(<HomeOutlinedIcon className={classes.navIcon}/>,    '/')
  const ProfileOption = IconWrapper(<PersonOutlinedIcon className={classes.navIcon}/>,  '/profile')
  const NotiOption = IconWrapper(<NotificationsNoneIcon className={classes.navIcon}/>,  '/notification')
  const SearchOption  = IconWrapper(<SearchOutlinedIcon className={classes.navIcon}/>,  '/search')
  const AddOption =
    <Link to='/collab/new'>
      <StyledFab aria-label="add">
        <AddCircleRoundedIcon className={classes.addIcon}/>
      </StyledFab>
    </Link>

    return (
      <nav className="menu">
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <Grid container spacing={2} direction="row">
              {HomeOption}
              {ProfileOption}
              <Grid item xs></Grid>
              {NotiOption}
              {SearchOption}
            </Grid>
            {AddOption}
          </Toolbar>
        </AppBar>
      </nav>
    );
}

export default withStyles(styles)(Navbar);
