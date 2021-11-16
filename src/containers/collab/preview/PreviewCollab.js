import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Navbar from '../../../components/shared/Navbar';
import YoutubeEmbed from '../../../components/shared/YoutubeEmbed';
import {Typography, Grid} from '@material-ui/core'
import {PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR, NEGATIVE_PRIMARY_COLOR, NEGATIVE_SECONDARY_COLOR} from '../../../Constant';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';
import ClearIcon from '@mui/icons-material/Clear';
import ProgressBar from 'react-bootstrap/ProgressBar'

const requester = 'ABMs';
let approved = null;
let final_approved = null;

const styles = {
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10,
  },
  subTitle: {
    marginTop: '15px !important',
    fontSize: 15,
    margin: '30px 10px 10px 10px',
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
      backgroundColor: `${NEGATIVE_SECONDARY_COLOR} !important`,
      color: NEGATIVE_PRIMARY_COLOR,
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
    marginTop: '0px !important',
  },
  approveText: {
    color: PRIMARY_COLOR
  },
  declineText: {
    color: NEGATIVE_PRIMARY_COLOR,
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
      <Typography className={classes.subTitle}>Contribution requested by {requester}</Typography>
    </Grid>
  </Grid>

  const subTitle2 = 
      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          <Typography className={classes.subTitle}>Still not sure? Let's see how it currently looks like</Typography>
        </Grid>
      </Grid>

  const handleApprove = () => {
    approved = true;
  }
  const handleDecline = () => {
    approved = false;
  }
  const approveButton = 
    <Link to='/notification' style={{ textDecoration: 'none' }}>         
      <Button className={classes.acceptButton} color="success" onClick={handleApprove}>
          <CheckIcon />
          <Typography className={classes.btnText}> Accept </Typography>
      </Button>
    </Link>
  const declineButton =
    <Link to='/notification' style={{ textDecoration: 'none' }}>         
      <Button className={classes.declineButton} color="error" onClick = {handleDecline}>
          <ClearIcon />
          <Typography className={classes.btnText}> Decline </Typography>
      </Button>
    </Link>

  const decision = 
    approved === null
    ? <Stack className = {classes.decision} direction="row" spacing={5} justifyContent="center">
        {approveButton}
        {declineButton}
      </Stack>
    : <Stack className = {classes.decision} direction="row" spacing={5} justifyContent="center">
        <Typography variant="body1" className={approved ? classes.approveText : classes.declineText}> 
          You have {approved ? 'approved' : 'declined'} this contribution 
        </Typography>        
      </Stack>

  const progressInstance =   
      <Stack direction="column" spacing={5} alignItems="center">
        <ProgressBar style={{width: '90%'}}>
          <ProgressBar variant="success" now={40} key={1}/>
          <ProgressBar variant="danger" now={20} key={2}/>
        </ProgressBar>
        <Stack direction="row" spacing={1} alignItems="center" className={classes.caption}>
          <Typography variant="caption" className={classes.approveText}> Approved by 2/5 owner(s) </Typography>        
          <Typography variant="caption"> - </Typography>        
          <Typography variant="caption" className={classes.declineText}> Declined by 1/5 owner(s) </Typography> 
        </Stack>       
      </Stack>;

  return (
    <>
      <br/>
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
