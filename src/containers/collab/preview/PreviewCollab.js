import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
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

const receive = true;
const requester = 'ABMs';
let approved = null;
let final_approved = null;
let num_approve = 2;
let num_decline = 1;
let num_owners = 5;

const styles = {
  backIcon: {
    zIndex: 999,
    fontSize: 30,
    top: 40,
    left: 20,
    position: 'sticky',
    color: PRIMARY_COLOR,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10,
    marginLeft: -35,
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
    margin: `30px 0 0 0`,
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
    color: PRIMARY_COLOR,
  },
  declineText: {
    color: NEGATIVE_PRIMARY_COLOR,
  }

};

const CollabPreview = ({ classes }) => {
  const history = useHistory();

  const title =
    <Grid container alignItems="center" justifyContent="center">
      <Grid item xs={2}>
        <ArrowBackIosIcon
          style={styles.backIcon}
          onClick={() => history.goBack()}
        />
      </Grid>
      <Grid item xs={10}>
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
    num_approve += 1;
  }
  const handleDecline = () => {
    approved = false;
    num_decline += 1;
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

  const decisionText = final_approved === null
    ? `You have ${approved ? 'approved' : 'declined'} this contribution`
    : `This contribution has been ${final_approved ? 'approved' : 'declined'}`

  const decision =
    final_approved === null && approved === null
    ? <Stack className = {classes.decision} direction="row" spacing={5} justifyContent="center">
        {approveButton}
        {declineButton}
      </Stack>
    : <Stack className = {classes.decision} direction="row" spacing={5} justifyContent="center">
        <Typography variant="body1" className={final_approved || approved ? classes.approveText : classes.declineText}>
          {decisionText}
        </Typography>
      </Stack>

  const progressInstance =
      <Stack direction="column" spacing={5} alignItems="center">
        <ProgressBar style={{width: '90%', marginTop: '20px'}}>
          <ProgressBar variant="success" now={num_approve/num_owners*100} key={1}/>
          <ProgressBar variant="danger" now={num_decline/num_owners*100} key={2}/>
        </ProgressBar>
        <Stack direction="row" spacing={1} alignItems="center" className={classes.caption}>
          <Typography variant="caption" className={classes.approveText}> Approved by {num_approve}/{num_owners} owner(s) </Typography>
          <Typography variant="caption"> - </Typography>
          <Typography variant="caption" className={classes.declineText}> Declined by {num_decline}/{num_owners} owner(s) </Typography>
        </Stack>
      </Stack>;

  return (
    <>
      <br/>
      <br/>
      {title}
      {subTitle1}
      <YoutubeEmbed embedId="6mYw53V9RGM?autoplay=1" w="99%" h="100%" />
      {receive ? decision : null}
      {progressInstance}
      {receive
        ? <>
            {subTitle2}
            <YoutubeEmbed embedId="u5IEr6jMuHw"  w="99%" h="100%" ></YoutubeEmbed>
          </>
        : null
      }
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
