import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { PRIMARY_COLOR, SECONDARY_COLOR,TERTIARY_COLOR } from '../../../Constant';
import testImg from '../../../assets/test/test_img.png';
import YoutubeEmbed from '../../../components/shared/YoutubeEmbed';
import ChatIcon from '@mui/icons-material/Chat';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClapIcon from '../../../assets/clap.svg';
import Grid from '@mui/material/Grid';
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import { getCollab } from "../../../contexts/DBContext"


import { db } from "../../../firebase"

const styles = {
  overlay: {
    width: '100%',
    bottom: 0,
    position: 'absolute',
  },
  overlayBg: {
    height: 300,
    width: '100%',
    background: `linear-gradient(#00000000,black 80%)`,
    bottom: 0,
    position: 'absolute',
    borderRadius: 20,
    pointerEvents: 'none',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  desc: {
    fontSize: 14,
  },
  textWrapper: {
    width: 'calc(100%-20px)',
    padding: 20,
    color: TERTIARY_COLOR,
    position: 'relative',
    bottom: 20,
  },
  video: {
    bottom: 50,
    position: 'relative',
  },
  iconList: {
    bottom: 20,
    right: 40,
    width: 30,
  },
  clap: {
    '&:hover': {
      color: 'SECONDARY_COLOR',
      // background: SECONDARY_COLOR,
      cursor: 'pointer',
    },
    width: 24,
    height: 24,
  }
};




function ViewCollab(props) {
  const {
    videoId,
    videoUser,
    videoTitle,
    videoDescription,
  } = props

  const tmpVideoId = "lQr-MMn639Q?autoplay=1";
  const history = useHistory()
  const [collabId, setCollabId] = useState()
  const [collabTitle, setCollabTitle] = useState()
  const [collabClaps, setCollabClaps] = useState()
  const [collabSize, setCollabSize] = useState()
  const [collabDescription, setCollabDescription] = useState()
  const { currentUser } = useAuth()


  const { state } = useLocation();
 
  useEffect(() => {
    setCollabId(state.collabId)
    let collab = getCollab (state.collabId);
    collab.then(collab => {
      // console.log(collab.title)
      setCollabTitle(collab.title)
      setCollabDescription(collab.description)
      setCollabSize(collab.userIds.length)
      setCollabClaps(collab.claps)
    
      })
    
  }, [collabId,collabTitle,collabClaps,collabSize,collabDescription]);



  async function handleJam() {
    try {
      history.push( {pathname: "/collab/contribute/", state: {collabId: collabId}})
    } catch {
      console.log("Failed to join")
    }
  }

  const handleLikes  = () => {
    var collab = db.collection("sessions").doc(collabId);
    collab.get().then(function (doc) {
      if (doc.exists) {
        collab.get().then((snapshot) => {
          var claps = snapshot.data().claps;
          var clappedIds = snapshot.data().clappedIds;
          if (clappedIds && !clappedIds.includes(currentUser.email)){
            console.log(clappedIds)
            collab.update({
              claps: claps+1,
              clappedIds: clappedIds.concat([currentUser.email])
            });
            console.log("Clap!")
          }
        });
      } else {
        alert("session is no longer available");
      }
    });    
  }
  
  const video =
    <YoutubeEmbed
      embedId={ tmpVideoId }
      w="375"
      h="700"
      sx={styles.video}
    />

  const title =
    <Typography sx={styles.title}>
      <span style={{color:SECONDARY_COLOR}}>{collabTitle} </span>
       - {collabClaps} claps - 6 days ago
    </Typography>

  const description =
    <Typography sx={styles.desc}>
      {collabDescription}
    </Typography>

  const iconList =
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      position="absolute"
      sx={styles.iconList}
    >
      <Grid item xs={4}>
        <AddCircleIcon onClick={handleJam}/>
      </Grid>
      <Grid item xs={4} onClick={handleLikes} >
        <img src={ClapIcon} style={styles.clap}/>
      </Grid>
      <Grid item xs={4}>
        <ChatIcon/>
      </Grid>
    </Grid>

  return (
    <>
      {video}
      <div style={styles.overlay}>
        <div style={styles.overlayBg}/>
        <div style={styles.textWrapper}>
          {title}
          {description}
          {iconList}
        </div>
      </div>
    </>
  );
}

// export default withStyles(styles)(ViewCollab);
export default ViewCollab;
