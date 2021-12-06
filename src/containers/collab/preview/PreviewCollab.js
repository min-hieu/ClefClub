import React, { useState, useEffect } from 'react';
import {Link, useLocation, useHistory} from 'react-router-dom';
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
import { useAuth } from "../../../contexts/AuthContext"
import { getRequest, getCollab } from "../../../contexts/DBContext"
import { db } from "../../../firebase"
import { arrayUnion } from "firebase/firestore";

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
  const history = useHistory()
  const [collabId, setCollabId] = useState()
  const [collabTitle, setCollabTitle] = useState()
  const [collabUrls, setCollabUrls] = useState([])
  const [message, setMessage] = useState()
  const [videoURL, setVideoURL] = useState()
  const [requestId, setRequestId] = useState()
  const [requesterName, setRequesterName] = useState()
  const [requesterId, setRequesterId] = useState()
  const [acceptN, setAcceptN] = useState()
  const [declineN, setDeclineN] = useState()
  const [finalDecision, setFinalDecision] = useState()

  const [num_owners, setNumOwners] = useState()
  const { currentUser } = useAuth()
  const { state } = useLocation();
  const [accepted, setAccepted] = useState();

  useEffect(() => {
    // console.log(state)

    setCollabId(state.collabId)
    setCollabTitle(state.title)
    setMessage(state.message)
    setVideoURL(state.video)
    setRequestId(state.requestId)
    setRequesterName(state.requesterName)
    setRequesterId(state.requesterId)
    setAcceptN(state.acceptN)
    setDeclineN(state.declineN)

    let request = getRequest (state.requestId);
    request.then(request => {
      setFinalDecision(request.status)
      setAccepted(request.acceptedIds.includes(currentUser.email) ? 'accepted' : (request.declinedIds.includes(currentUser.email) ? 'declined' : 'unknown'));
      setNumOwners(request.receiverIds.length)
    })

    let cl = getCollab(state.collabId)
    cl.then(cl => setCollabUrls(cl.videos));

  }, [accepted]);


  const title =
    <Grid container alignItems="center" justifyContent="center">
    <Grid item xs={2}>
        <ArrowBackIosIcon
          style={styles.backIcon}
          onClick={() => history.goBack()}
        />
      </Grid>
      <Grid item xs={10}>
        <Typography className={classes.title}>{collabTitle}</Typography>
      </Grid>
    </Grid>

  const subTitle1 =
  <Grid container alignItems="center" justifyContent="center">
    <Grid item>
      <Typography className={classes.subTitle}>
        Contribution requests by <span style={{fontWeight: 'bold'}}>{requesterName}</span>:
      </Typography>
    </Grid>
  </Grid>

const messageText =
  <Grid container alignItems="center" justifyContent="center">
    <Grid item>
      <Typography variant="h10">
        "{message}"
      </Typography>
    </Grid>
  </Grid>

  const subTitle2 =
    <Grid container alignItems="center" justifyContent="center">
      <Grid item>
        <Typography className={classes.subTitle}>Still not sure? Let's see how it currently looks like</Typography>
      </Grid>
    </Grid>

  const handleApprove = () => {
    // approved = true;
    // num_approve += 1;
    db.collection("requests").doc(requestId).update({
      acceptedIds: arrayUnion(currentUser.email),
    });
    if ((acceptN+1)/num_owners>=0.5){
      db.collection("requests").doc(requestId).update({
        acceptedIds: arrayUnion(currentUser.email),
        status: 'accepted',
      });
      // console.log('requesterId',requesterId,collabId)
      db.collection("sessions").doc(collabId).update({
        userIds: arrayUnion(requesterId),
        videos: arrayUnion(videoURL),
      });
      setAccepted('accepted');
    }
    // console.log('Approved btn:',accepted)
    setAcceptN(acceptN + 1);
  };

  const handleDecline = () => {
    if ((declineN+1)/num_owners>0.5){
      db.collection("requests").doc(requestId).update({
        declinedIds: arrayUnion(currentUser.email),
        status: 'declined',
      });
      setAccepted('declined')
    }else{
      db.collection("requests").doc(requestId).update({
        declinedIds: arrayUnion(currentUser.email),
      });
    }
    setDeclineN(declineN + 1);

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
  const decisionText = () => {
    return requesterId === currentUser.email
      ? finalDecision === 'pending'
        ? `Your request is still under review`
        : `Your request has been ${finalDecision==="accepted" ? 'approved' : 'declined'}`
      : finalDecision !== 'pending'
        ? `The request has been ${finalDecision==="accepted" ? 'approved' : 'declined'}`
        : accepted !== 'unknown'
          ? `You have ${accepted==="accepted" ? 'approved' : 'declined'} this contribution`
          : null
}


  const vote =
      <Stack className = {classes.decision} direction="row" spacing={5} justifyContent="center">
        {approveButton}
        {declineButton}
      </Stack>
  const decision =
        <Stack className = {classes.decision} direction="row" spacing={5} justifyContent="center">
          <Typography variant="body1" className={(accepted ==='accepted' || finalDecision === 'accepted') ? classes.approveText : ( (accepted ==='declined' || finalDecision === 'declined') ?classes.declineText : null)}>
            {decisionText()}
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
          <br/>
          {title}
          {subTitle1}
          {messageText}
          {/* <YoutubeEmbed embedId="6mYw53V9RGM?autoplay=1" w="99%" h="100%" /> */}
          {collabUrls.map((v) => (
            <video
            src={v}
            autoPlay={true}
            // controls
            width="99%"
            loading="lazy"
          />
          ))}
          { finalDecision==="accepted" ?
            null
          : <video
              src={videoURL}
              autoPlay={true}
              // controls
              width="99%"
              loading="lazy"
              style={{marginTop: -10}}
            />
          }
          
          {(requesterId !== currentUser.email ) && accepted==='unknown'
            ? <>{vote}</>
            : <>{decision}</>
          }
          {progressInstance}
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
