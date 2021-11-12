import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Navbar from '../../../components/shared/Navbar';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import PublicIcon from '@material-ui/icons/Public';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../../Constant';

const styles = {
  main: {
    margin: 35,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  done: {
    fontSize: 20,
    fontWeight: 500,
    textAlign: 'right',
    color: PRIMARY_COLOR,
  },
  subtitle: {
    color: 'grey',
    margin: '5px 0 20px 0',
  },
  dropzone: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 20,
    borderColor: PRIMARY_COLOR,
    borderStyle: 'dashed',
    backgroundColor: TERTIARY_COLOR,
    color: SECONDARY_COLOR,
    outline: 'none',
    transition: 'border .24s ease-in-out',
    width: 300,
    height: 300,
    justifyContent: 'center',
  },
  addIcon: {
    color: PRIMARY_COLOR,
    fontSize: 72,
  },
  addText: {
    fontSize: 20,
  },
  name: {
    fontSize: 20,
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
    width: '100%',
    padding: 4,
  },
  nameInput: {
    textAlign: 'center',
  },
  description: {
    width: '100%',
  },
  viewButton: {
    textTransform: 'none',
    color: SECONDARY_COLOR,
    backgroundColor: TERTIARY_COLOR,
    borderRadius: 15,
    marginTop: 10,
    minWidth: 140,
    fontSize: 18,
  },
  menuItem: {
    color: SECONDARY_COLOR,
    backgroundColor: TERTIARY_COLOR,
    minWidth: 140,
    fontSize: 18,
    justifyContent: 'center !important',
    '&:hover': {
      backgroundColor: `${PRIMARY_COLOR} !important`,
      color: TERTIARY_COLOR,
    },
  },
};

function NewSession({ classes }) {
  const viewOptions = ['Public', 'Inviters'];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClickButton = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const header =
    <Grid container alignItems="center">
      <Grid item xs={10}>
        <Typography className={classes.title}>New Session</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography className={classes.done}>Done</Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.subtitle}>Start cooking up some jam!</Typography>
      </Grid>
    </Grid>

  const addZone =
    <div className={classes.dropzone}>
      <AddCircleOutlineOutlinedIcon className={classes.addIcon} />
      <Typography className={classes.addText}>Upload video</Typography>
    </div>

  const button =
    <Button
      ref={anchorEl}
      onClick={handleClickButton}
      className={classes.viewButton}
      startIcon={selectedIndex ? <PeopleOutlineIcon/> : <PublicIcon />}
      endIcon={<ExpandMoreIcon />}
    >
      {viewOptions[selectedIndex]}
    </Button>

  const menu =
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
    {viewOptions.map((option, index) => (
      <MenuItem
        ListItemClasses={{ button: classes.menuItem }}
        key={option}
        selected={index === selectedIndex}
        onClick={(event) => handleMenuItemClick(event, index)}
      >
        {option}
      </MenuItem>
    ))}
  </Menu>

  const visibilityButton = [button, menu]

  const titleField =
    <InputBase
      className={classes.name}
      placeholder="Session Title"
      required
      inputProps={{ 'aria-label': 'naked' }}
      classes={{
        input: classes.nameInput,
      }}
    />
  const descriptionField =
    <Input
      className={classes.description}
      placeholder="Description"
      required
    />

  return (
    <div className={classes.main}>
      {header}
      {addZone}
      {titleField}
      {descriptionField}
      {visibilityButton}
			<Navbar />
    </div>
  );
}

export default withStyles(styles)(NewSession);
