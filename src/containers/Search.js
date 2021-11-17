import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import CancelIcon from '@material-ui/icons/Cancel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@mui/material/Avatar';
import { PRIMARY_COLOR, TERTIARY_COLOR } from '../Constant';
import Navbar from '../components/shared/Navbar';
import picture from '../assets/test/monkey.jpeg';

const styles = {
  main: {
    margin: '50px 35px 20px 35px',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  search: {
    position: 'relative',
    borderRadius: 10,
    background: '#dadada',
    marginRight: 16,
    width: '100%',
    margin: '10px auto',
  },
  searchIcon: {
    width: 30,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resizeIcon: {
    fontSize: 18,
  },
  inputRoot: {
    width: 'inherit',
    color: 'inherit',
  },
  inputInput: {
    padding: 8,
    paddingLeft: 30,
    width: '100%',
    fontSize: 15,
  },
  searchCollab: {
    maxWidth: 400,
    margin: '10px auto',
  },
  searchUser: {
    background: '#fff7f4',
    maxWidth: 400,
    height: 100,
    margin: '10px auto',
  },
  media: {
    height: 150,
    borderRadius: 10,
  },
  searchCollabTitle: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchCollabSubtitle: {
    fontSize: 12,
    color: PRIMARY_COLOR,
  },
  avatar: {
    width: '70px !important',
    height: '70px !important',
  },
  name: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 1.5,
  },
  collabs: {
    textAlign: 'center',
    fontSize: 15,
    color: PRIMARY_COLOR,
  },
};

function Search({ classes }) {
  const [searchValue, setSearchValue] = useState('');
  const [fakeSearch, setFakeSearch] = useState(false);
  const handleChangeSeachValue = e => setSearchValue(e.target.value);
  const handleMouseDownCancelSearch = (event) => {
    event.preventDefault();
  };
  const handleResetSearch = () => {
    setSearchValue('');
  };
  const handlePressKey = (e) => {
    if (e.keyCode === 13 && searchValue === 'John') {
      setFakeSearch(true);
    }
  };

  return (
    <div className={classes.main}>
      <Typography className={classes.title}>Search</Typography>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon className={classes.resizeIcon} />
        </div>
        <InputBase
          placeholder="Search for your favorite jam..."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={searchValue}
          onChange={handleChangeSeachValue}
          onKeyDown={handlePressKey}
          inputProps={{ 'aria-label': 'search' }}
          endAdornment={
            searchValue && (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleResetSearch}
                  onMouseDown={handleMouseDownCancelSearch}
                >
                  <CancelIcon className={classes.resizeIcon} />
                </IconButton>
              </InputAdornment>
            )
          }
        />
      </div>
      {fakeSearch && (
        <Grid container direction="column">
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            className={classes.searchCollab}
          >
            <Card>
              <CardActionArea>
                <CardMedia className={classes.media} image={require('../assets/test/test_img.png')}/>
              </CardActionArea>
            </Card>
            <Typography className={classes.searchCollabTitle}>Carpe DiJohn</Typography>
            <Typography className={classes.searchCollabSubtitle}>John Wahjosky · 69K views · 6 days ago</Typography>
          </Grid>
          <Grid
            item
            container
            className={classes.searchUser}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={2}>
              <Avatar className={classes.avatar} alt="John" src={ picture }/>
            </Grid>
            <Grid item xs={8} container direction="column" justifyContent="center">
              <Grid item>
                <Typography variant="h1" className={classes.name}>John</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.collabs}>169 jams</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Navbar />
    </div>
  );
}

export default withStyles(styles)(Search);
