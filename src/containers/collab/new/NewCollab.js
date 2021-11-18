import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Navbar from '../../../components/shared/Navbar';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../../Constant';

const styles = {
  main: {
    margin: '50px 35px 20px 35px',
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
  publishButton: {
    color: TERTIARY_COLOR,
    backgroundColor: PRIMARY_COLOR,
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center !important',
    '&:hover': {
      backgroundColor: `${PRIMARY_COLOR} !important`,
      color: TERTIARY_COLOR,
    },
    width: '100%',
    marginTop: 20,
  }
};

function NewCollab({ classes }) {
  const header =
    <>
      <Typography className={classes.title}>New Jam</Typography>
      <Typography className={classes.subtitle}>Start cooking up some joy!</Typography>
    </>

  const addZone =
    <div className={classes.dropzone}>
      <AddCircleOutlineOutlinedIcon className={classes.addIcon} />
      <Typography className={classes.addText}>Upload video</Typography>
    </div>

  const titleField =
    <InputBase
      className={classes.name}
      placeholder="Jam Title"
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

  const publishButton =
    <Button variant="contained" className={classes.publishButton}>
      Publish your jam
    </Button>

  return (
    <div className={classes.main}>
      {header}
      {addZone}
      {titleField}
      {descriptionField}
      {publishButton}
			<Navbar />
    </div>
  );
}

export default withStyles(styles)(NewCollab);
