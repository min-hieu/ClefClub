import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import CancelIcon from '@material-ui/icons/Cancel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Navbar from '../components/shared/Navbar';

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
  searchUser: {},
  searchCollab: {
    background: '#ffddd2',
    width: 270,
    height: 300,
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
<<<<<<< HEAD
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
            className={classes.searchUser}
          >
          </Grid>
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            className={classes.searchCollab}
          >
          </Grid>
        </Grid>
      )}
=======
    <>
      This is search page
>>>>>>> b1a47992fe424003ef5a3071e4fb9a6062aa31d5
      <Navbar />
    </div>
  );
}

export default withStyles(styles)(Search);
