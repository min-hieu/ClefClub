import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Navbar from '../../../components/shared/Navbar';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
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
};

function NewSession({ classes }) {
  return (
    <div className={classes.main}>
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
      <div className={classes.dropzone}>
        <AddCircleOutlineOutlinedIcon className={classes.addIcon} />
        <Typography className={classes.addText}>Upload video</Typography>
      </div>
			<Navbar />
    </div>
  );
}

export default withStyles(styles)(NewSession);
