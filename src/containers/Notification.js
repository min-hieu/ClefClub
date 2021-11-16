import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Navbar from '../components/shared/Navbar';
import NotificationList  from '../components/notification/NotificationList';
import testImg from '../assets/test/test_img.png';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { PRIMARY_COLOR,SECONDARY_COLOR,TERTIARY_COLOR } from '../Constant';

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
  const [showIncoming, setshowIncoming] = useState(true);
  const [showMy, setshowMy] = useState(false);

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

  const IncomingDataInProgress = [
    { 	
      img: testImg,
      title: 'Carpe Diem',
      receive: true,
      accept: null,
      finalAccept: null,
    },
    { 	
      img: testImg,
      title: 'Carpe',
      receive: true,
      accept: true,
      finalAccept: null,
    },
    { 	
      img: testImg,
      title: 'Diem',
      receive: true,
      accept: false,
      finalAccept: null,
    },
  ];

  const IncomingDataClosed = [
    { 	
      img: testImg,
      title: 'Carpe Diem',
      receive: true,
      accept: true,
      finalAccept: true,
    },
    { 	
      img: testImg,
      title: 'Carpe',
      receive: true,
      accept: true,
      finalAccept: true,
    },
    { 	
      img: testImg,
      title: 'Diem',
      receive: true,
      accept: false,
      finalAccept: false,
    },
  ];

  const OutcomingDataInprogress = [
    { 	
      img: testImg,
      title: 'Carpe Diem',
      receive: false,
      accept: null,
      finalAccept: null,
    },
    { 	
      img: testImg,
      title: 'Carpe',
      receive: false,
      accept: null,
      finalAccept: null,
    },
    { 	
      img: testImg,
      title: 'Diem',
      receive: false,
      accept: null,
      finalAccept: null,
    },
  ];
  
  const OutcomingDataClosed = [
    { 	
      img: testImg,
      title: 'Carpe Diem',
      receive: false,
      accept: null,
      finalAccept: true,
    },
    { 	
      img: testImg,
      title: 'Carpe',
      receive: false,
      accept: null,
      finalAccept: false,
    },
    { 	
      img: testImg,
      title: 'Diem',
      receive: false,
      accept: null,
      finalAccept: true,
    },
  ];

  return (
    <>
      <br/>
      <br/>
      {tabNames}
      { showIncoming 
        ? <>
            <NotificationList data = {IncomingDataInProgress} section = 'In progress'></NotificationList>
            <NotificationList data = {IncomingDataClosed} section = 'Closed'></NotificationList>
          </>
        : null 
      }
      { showMy 
        ? <>
            <NotificationList data = {OutcomingDataInprogress} section = 'In progress'></NotificationList>
            <NotificationList data = {OutcomingDataClosed} section = 'Closed'></NotificationList> 
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
