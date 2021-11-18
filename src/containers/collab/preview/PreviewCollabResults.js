import React, { useState, useEffect } from 'react';
import {Link, useLocation, useHistory} from 'react-router-dom';
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
import { useAuth } from "../../../contexts/AuthContext"
import { getRequest } from "../../../contexts/DBContext"

import { db, arrayUnion } from "../../../firebase"

const receive = true;
const requester = 'ABMs';
let approved = null;
let final_approved = null;
let num_approve = 2;
let num_decline = 1;
let num_owners = 5;

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
  const history = useHistory()
  const [collabId, setCollabId] = useState()
  const [collabTitle, setCollabTitle] = useState()
  const [requestId, setRequestId] = useState()
  const [requesterName, setRequesterName] = useState()
  const [acceptN, setAcceptN] = useState()
  const [declineN, setDeclineN] = useState()
  const [num_owners, setNumOwners] = useState()
  const { currentUser } = useAuth()
  const { state } = useLocation();
 
  useEffect(() => {
    console.log(state)

    setCollabId(state.collabId)
    setCollabTitle(state.title)
    setRequestId(state.requestId)
    setRequesterName(state.requesterName)
    setAcceptN(state.acceptN)
    setDeclineN(state.declineN)

    let request = getRequest (state.requestId);
    request.then(request => {

      setNumOwners(request.receiverIds.length)
    
      })
    
  }, []);




  const title = 
    <Grid container alignItems="center" justifyContent="center">
      <Grid item>
        <Typography className={classes.title}>{collabTitle}</Typography>
      </Grid>
    </Grid>

  const subTitle1 = 
  <Grid container alignItems="center" justifyContent="center">
    <Grid item>
      <Typography className={classes.subTitle}>Contribution requested by {requesterName}</Typography>
    </Grid>
  </Grid>

  const subTitle2 = 
      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          <Typography className={classes.subTitle}>Still not sure? Let's see how it currently looks like</Typography>
        </Grid>
      </Grid>


  const approveButton = 
    <Link  to="/notification" style={{ textDecoration: 'none' }}>         
      <Button className={classes.acceptButton} color="success" onClick={handleApprove}>
          <CheckIcon />
          <Typography className={classes.btnText}> Accept </Typography>
      </Button>
    </Link>
  const declineButton =
    <Link to="/notification" style={{ textDecoration: 'none' }}>         
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
          <ProgressBar variant="success" now={acceptN/num_owners*100} key={1}/>
          <ProgressBar variant="danger" now={declineN/num_owners*100} key={2}/>
        </ProgressBar>
        <Stack direction="row" spacing={1} alignItems="center" className={classes.caption}>
          <Typography variant="caption" className={classes.approveText}> Approved by {acceptN}/{num_owners} owner(s) </Typography>        
          <Typography variant="caption"> - </Typography>        
          <Typography variant="caption" className={classes.declineText}> Declined by {declineN}/{num_owners} owner(s) </Typography> 
        </Stack>       
      </Stack>;

  return (
    <>
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
