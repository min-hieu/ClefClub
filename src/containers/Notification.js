import React, {useState, useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Navbar from '../components/shared/Navbar';
import NotificationList  from '../components/notification/NotificationList';
import testImg from '../assets/test/test_img.png';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { PRIMARY_COLOR,SECONDARY_COLOR,TERTIARY_COLOR } from '../Constant';



// mine
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { getOutgoingRequests, getIncomingRequests, getUser, getCollab } from "../contexts/DBContext"



const styles = {
  profile: {
    margin: '0 auto',
    marginTop: 8,
    background: TERTIARY_COLOR,
    padding: '15px',
    width: '90%',
    borderRadius: 2,
    height: 130,
    overflow: 'hidden',
  },
  avatar: {
    width: 100,
    height: 100,
  },
  name: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 1.5,
  },
  collabs: {
    textAlign: 'center',
    fontSize: 15,
    color: PRIMARY_COLOR,
  },
  titleBar: {
    margin: '2vh 0',
  },
  title: {
    textAlign: 'center',
    borderRadius: '16px',
    width: 'fit-content',
    padding: '3px 9px',
    margin: '0 auto',
    color: SECONDARY_COLOR,
    userSelect: 'none',
    '&:hover': {
      color: PRIMARY_COLOR,
      background: SECONDARY_COLOR,
      cursor: 'pointer',
    },
  },
  titleActive: {
    textAlign: 'center',
    borderRadius: '16px',
    width: 'fit-content',
    padding: '3px 9px',
    margin: '0 auto',
    color: 'white',
    background: PRIMARY_COLOR,
    userSelect: 'none',
  },
};


function Notification({ classes }) {
  const [showIncoming, setshowIncoming] = useState(false);
  const [showMy, setshowMy] = useState(true);
  const { currentUser } = useAuth()
  const history = useHistory()
  const [userPendingRequests, setUserPendingRequests] = useState()
  const [userClosedRequests, setUserClosedRequests] = useState()
  const [userWaitingRequests, setUserWaitingRequests] = useState()
  const [userUnpublishedRequests, setUserUnpublishedRequests] = useState()


  useEffect(() => {
    // Run! Like go get some data from an API.
    if (!currentUser) {
      history.push("/login")
      return;
    }else{

      let outResult = getOutgoingRequests (currentUser.email);
      outResult.then(outResult => {
        // console.log("Pending Out",outResult)
        setUserPendingRequests(outResult[0])
        setUserClosedRequests(outResult[1])
      })

      let inResult = getIncomingRequests (currentUser.email);
      inResult.then(inResult => {
        // console.log("Pending In",inResult)
        setUserWaitingRequests(inResult[0])
        setUserUnpublishedRequests(inResult[1])
      })

    }
  }, []);

  const tabNames = 
  <Grid container sx={styles.titleBar}>
    <Grid item xs={6}>
      <Typography sx={ showIncoming ? styles.titleActive : styles.title }
      onClick={(e) => {setshowMy(false);setshowIncoming(true)}}
      >
        Incoming Requests
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography
        sx={ showMy ? styles.titleActive : styles.title }
        onClick={(e) => {setshowMy(true);setshowIncoming(false)}}
      >
        My Requests
      </Typography>
    </Grid>
  </Grid>

  // const IncomingDataInProgress = [
  //   { 	
  //     img: testImg,
  //     title: 'Carpe Diem',
  //     receive: true,
  //     accept: null,
  //     finalAccept: null,
  //   },
  //   { 	
  //     img: testImg,
  //     title: 'Carpe',
  //     receive: true,
  //     accept: true,
  //     finalAccept: null,
  //   },
  //   { 	
  //     img: testImg,
  //     title: 'Diem',
  //     receive: true,
  //     accept: false,
  //     finalAccept: null,
  //   },
  // ];

  var IncomingDataInProgress=[];
  if (userWaitingRequests){
    // console.log("userWaitingRequests:",userWaitingRequests)
      for(var i=0;i<userWaitingRequests.length;i++){
        IncomingDataInProgress.push({ 
          requestId: userWaitingRequests[i].requestId,
          requesterId: userWaitingRequests[i].requesterId,
          collabId: userWaitingRequests[i].collabId,
          requesterName: userWaitingRequests[i].requesterName,
          title: userWaitingRequests[i].collabTitle,
          video: userWaitingRequests[i].videoURL,
          receive: true,
          accept: null,
          finalAccept: null, 
          acceptN:  userWaitingRequests[i].acceptedN,
          declineN:  userWaitingRequests[i].declinedN,
          acceptedIds:  userWaitingRequests[i].acceptedIds,
          declinedIds:  userWaitingRequests[i].declinedIds,
          message: userWaitingRequests[i].message

        });
      }
  }
  // console.log("Elements IncomingDataInProgress:",IncomingDataInProgress)


  var IncomingDataClosed=[];
  if (userUnpublishedRequests){
    // console.log("userWaitingRequests:",userWaitingRequests)
      for(var i=0;i<userUnpublishedRequests.length;i++){

        IncomingDataClosed.push({ 
          requestId: userUnpublishedRequests[i].requestId,
          requesterId: userUnpublishedRequests[i].requesterId,
          collabId: userUnpublishedRequests[i].collabId,
          requesterName: userUnpublishedRequests[i].requesterName,
          title: userUnpublishedRequests[i].collabTitle,
          video: userUnpublishedRequests[i].videoURL,
          receive: true,
          accept: null,
          finalAccept: null, 
          acceptN:  userUnpublishedRequests[i].acceptedN,
          declineN:  userUnpublishedRequests[i].declinedN,
          acceptedIds:  userUnpublishedRequests[i].acceptedIds,
          declinedIds:  userUnpublishedRequests[i].declinedIds,
          message: userUnpublishedRequests[i].message

        });
      }
  }
  // console.log("Elements IncomingDataInProgress:",IncomingDataInProgress)


  var OutcomingDataInprogress=[];
  if (userPendingRequests){
      for(var i=0;i<userPendingRequests.length;i++){
        OutcomingDataInprogress.push({ 
          requestId: userPendingRequests[i].requestId,
          requesterId: userPendingRequests[i].requesterId,
          collabId: userPendingRequests[i].collabId,
          requesterName: userPendingRequests[i].requesterName,
          title: userPendingRequests[i].collabTitle,
          video: userPendingRequests[i].videoURL,
          receive: false,
          accept: null,
          finalAccept: null, 
          acceptN:  userPendingRequests[i].acceptedN,
          declineN:  userPendingRequests[i].declinedN,
          acceptedIds:  userPendingRequests[i].acceptedIds,
          declinedIds:  userPendingRequests[i].declinedIds,
          message: userPendingRequests[i].message

        });
      }
  }
  // console.log("Elements OutcomingDataInprogress:",OutcomingDataInprogress)

  var OutcomingDataClosed=[];
  if (userClosedRequests){
      for(var i=0;i<userClosedRequests.length;i++){
        OutcomingDataClosed.push({ 
          requestId: userClosedRequests[i].requestId,
          requesterId: userClosedRequests[i].requesterId,
          collabId: userClosedRequests[i].collabId,
          // collabVideo: userUnpublishedRequests[i].collabVideo,
          requesterName: userClosedRequests[i].requesterName,
          title: userClosedRequests[i].collabTitle,
          video: userClosedRequests[i].videoURL,
          receive: false,
          accept: null,
          finalAccept: null, 
          acceptN:  userClosedRequests[i].acceptedN,
          declineN:  userClosedRequests[i].declinedN,
          acceptedIds:  userClosedRequests[i].acceptedIds,
          declinedIds:  userClosedRequests[i].declinedIds,
          message: userClosedRequests[i].message

        });
      }
  }
  // console.log("Elements OutcomingDataClosed:",OutcomingDataClosed)


  return (
    <>
      <br/>
      <br/>
      {tabNames}
      { showIncoming 
        ? <>
            <NotificationList data = {IncomingDataInProgress} section = 'In progress' notifPage="inReq"></NotificationList>
            <NotificationList data = {IncomingDataClosed} section = 'Closed' notifPage="inReq"></NotificationList>
          </>
        : null 
      }
      { showMy 
        ? <>
            <NotificationList data = {OutcomingDataInprogress} section = 'In progress' notifPage="outReq"></NotificationList>
            <NotificationList data = {OutcomingDataClosed} section = 'Closed' notifPage="outReq"></NotificationList> 
          </>
        : null 
      }

      <br/>
      <br/>
      <br/>
      <Navbar />
    </>
  );
}

export default withStyles(styles)(Notification);
