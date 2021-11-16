import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Navbar from '../../../components/shared/Navbar';
import YoutubeEmbed from '../../../components/shared/YoutubeEmbed';
import {Typography, Grid} from '@material-ui/core'
import {PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../../Constant';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';
import ClearIcon from '@mui/icons-material/Clear';
import ProgressBar from 'react-bootstrap/ProgressBar'

const styles = {
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10,
    marginTop: 50,
  },
  subTitle: {
    fontSize: 15,
    margin: 10,
    color: PRIMARY_COLOR,
  },
  acceptButton: {
    textTransform: 'none !important',
    backgroundColor: `${TERTIARY_COLOR} !important`,
    '&:hover': {
      backgroundColor: `${SECONDARY_COLOR} !important`,
      color: PRIMARY_COLOR,
    },
  },
  declineButton: {
    textTransform: 'none !important',
    backgroundColor: '#ffdddd !important',
    '&:hover': {
      backgroundColor: `#ffbbbb !important`,
      color: '#ff2222',
    },
  },
  decision: {
    margin: `30px 0 15px 0`,
    border: 1
  },

  btnText: {
    marginLeft: 10,
    marginRight: 10,
  },

  caption: {
    marginTop: '6px !important',
    color: PRIMARY_COLOR,
  }
};

const CollabPreview = ({ classes }) => {
  const title =
    <Grid container alignItems="center" justifyContent="center">
      <Grid item>
        <Typography className={classes.title}>CARPE DIEM</Typography>
      </Grid>
    </Grid>

  const subTitle1 =
  <Grid container alignItems="center" justifyContent="center">
    <Grid item>
      <Typography className={classes.subTitle}>Contribution requested by ABC</Typography>
    </Grid>
  </Grid>

  const subTitle2 =
      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          <Typography className={classes.subTitle}>Still not sure? Let's see how it currently looks like</Typography>
        </Grid>
      </Grid>

  const decision =
    <Stack className = {classes.decision} direction="row" spacing={5} justifyContent="center">
      <Link to='/notification' style={{ textDecoration: 'none' }}>
        <Button className={classes.acceptButton} color="success" >
            <CheckIcon />
            <Typography className={classes.btnText}> Accept </Typography>
        </Button>
      </Link>
      <Link to='/notification' style={{ textDecoration: 'none' }}>
        <Button className={classes.declineButton} color="error" >
            <ClearIcon />
            <Typography className={classes.btnText}> Decline </Typography>
        </Button>
      </Link>
    </Stack>

  const progressInstance =
      <Stack direction="column" spacing={5} alignItems="center">
        <ProgressBar variant="success" now={40} style={{width: '90%'}} />
        <Typography variant="caption" className={classes.caption}> Approved by 2/5 owner(s) </Typography>
      </Stack>;

  return (
    <>
      {title}
      {subTitle1}
      <YoutubeEmbed embedId="6mYw53V9RGM?autoplay=1" />
      {decision}
      {progressInstance}
      {subTitle2}
      <YoutubeEmbed embedId="u5IEr6jMuHw"></YoutubeEmbed>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <Navbar />
    </>
  );
}

export default withStyles(styles)(CollabPreview);
