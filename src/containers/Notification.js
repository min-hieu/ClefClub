import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Navbar from '../components/shared/Navbar';
import NotificationList  from '../components/notification/NotificationList';
import testImg from '../assets/test/test_img.png';

const styles = {};

function Notification({ classes }) {
  const notiData = [
    { 	
      img: testImg,
      title: 'Carpe Diem',
      receive: true,
      accept: null,
    },
    { 	
      img: testImg,
      title: 'Carpe',
      receive: false,
      accept: true,
    },
    { 	
      img: testImg,
      title: 'Diem',
      receive: false,
      accept: false
    },
  ];

  const oldNotiData = [
    { 	
      img: testImg,
      title: 'Carpe Diem',
      receive: true,
      accept: null,
    },
    { 	
      img: testImg,
      title: 'Carpe',
      receive: false,
      accept: true,
    },
    { 	
      img: testImg,
      title: 'Diem',
      receive: false,
      accept: false
    },
  ];
  return (
    <>
      <br/>
      <NotificationList data = {notiData} section = 'New'></NotificationList>
      <NotificationList data = {oldNotiData} section = 'Earlier'></NotificationList>
      <br/>
      <br/>
      <br/>
      <Navbar />
    </>
  );
}

export default withStyles(styles)(Notification);
