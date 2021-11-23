import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@mui/icons-material/Chat';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Grid from '@mui/material/Grid';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { SECONDARY_COLOR,TERTIARY_COLOR } from '../../../Constant';
import ClapIcon from '../../../assets/clap.svg';
import ViewSession from '../ViewSession';
import './clap.css';
import { useHistory } from "react-router-dom"
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
    bottom: 83,
    position: 'relative',
    backgroundColor: 'black',
  },
  iconList: {
    width: 'fit-content',
    bottom: 9,
    right: 20,
  },
  cmtSection: {
    bottom: 0,
  },
  cmtBg: {
    position: 'absolute',
    background: 'white',
    bottom: 20,
    borderRadius: 20,
    width: 360,
    height: 450,
    left: '50%',
    transform: "translate(-50%,0)",
    transition: "all .3s ease-out",
  },
  closeCmt: {
    position: 'absolute',
    background: 'rgba(2,2,2,0.7)',
    borderRadius: 20,
    top: 0,
    width: 374,
    height: 700,
    left: '50%',
    transform: "translate(-50%,0)",
  },
  flyClap: {
    position: 'absolute',
    opacity: 0,
    top: 0,
    width: 50,
    height: 50,
  },
  backIcon: {
    zIndex: 999,
    fontSize: 30,
    top: 40,
    left: 20,
    position: 'sticky',
    color: TERTIARY_COLOR,
  },
  clap: {
    cursor: 'pointer',
    width: 24,
    height: 24,
    "&:hover": {
      width: 30,
      height: 30,
    },
  },
};


function ViewCollab() {
  const history = useHistory();
  const backIcon =
    <ArrowBackIosIcon
      style={styles.backIcon}
      onClick={() => history.goBack()}
    />
  const [collabId, setCollabId] = useState()
  const [collabTitle, setCollabTitle] = useState()
  const [collabClaps, setCollabClaps] = useState()
  const [collabSize, setCollabSize] = useState()
  const [collabVideos, setCollabVideos] = useState([])
  const [collabDescription, setCollabDescription] = useState()
  const { currentUser } = useAuth()


  const { state } = useLocation();
  useEffect(() => {
    setCollabId(state.collabId)
    let collab = getCollab (state.collabId);
    collab.then(collab => {
      // console.log(collab.title)
      // console.log("Videos:",collab.videos)
      setCollabVideos(collab.videos)
      setCollabTitle(collab.title)
      setCollabDescription(collab.description)
      setCollabSize(collab.userIds.length)
      setCollabClaps(collab.claps)
      })
  }, [collabId,collabTitle,collabClaps,collabSize,collabDescription]);



  async function handleJam() {
    try {
      history.push( {pathname: "/collab/add/", state: {collabId: collabId}})
    } catch {
      console.log("Failed to join")
    }
  }

  const handleLikes  = () => {
    setShowFlower(true);
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

  const handleClap = () => {
    setClaps(claps => [...claps, <img src={ClapIcon} alt="clap" className="userClap"/>])
    console.log(claps);
    console.log("clapped");
  }

  const video =
  <>
    {collabVideos.map((v) => (
        <video
        style={styles.video}
        src={v}
        width="375px"
        // height='700'
        autoPlay={true}
        loop
      />
      ))}
  </>

  const title =
    <Typography sx={styles.title}>
      <span style={{color:SECONDARY_COLOR}}>{collabTitle} </span>
       - 2 days ago
    </Typography>

  const description =
  <>
    <Typography sx={styles.desc}>
      Joined by {collabSize}
    </Typography>
      <Typography sx={styles.desc}>
      {collabDescription}
    </Typography>
  </>

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
      <Grid item xs={3}>
        <GroupAddIcon onClick={handleJam}/>
      </Grid>
      <Grid item xs={3}>
        <LocalFloristIcon onClick={handleLikes}/>
      </Grid>
      <Grid item xs={3}>
        <img src={ClapIcon} style={styles.clap} alt="clap" onClick={handleClap}/>
      </Grid>
      <Grid item xs={3}>
        <ChatIcon
          onClick={(e) => {setShowComments(true)}}
        />
      </Grid>
    </Grid>

  const flower =
    <FilterVintageIcon sx={{ position: 'absolute', right:22, bottom:106 }}/>


  const [showComments, setShowComments] = useState(false);
  const [showFlower, setShowFlower] = useState(false);
  const [claps, setClaps] = useState([]);

  return (
    <div style={{height: 690, backgroundColor:"black"}}>
      {backIcon}
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      {video}
      <div style={styles.overlay}>
        <div style={styles.overlayBg}/>
        <div style={styles.textWrapper}>
          {title}
          {description}
          {iconList}
          {showFlower ? flower : null}
          {collabClaps ? flower : null}
        </div>
      </div>
      <img src={ClapIcon} alt="fly-claps" className="flyClaps" id="clap1"/>
      <img src={ClapIcon} alt="fly-claps" className="flyClaps" id="clap2"/>
      <img src={ClapIcon} alt="fly-claps" className="flyClaps" id="clap3"/>
      <img src={ClapIcon} alt="fly-claps" className="flyClaps" id="clap4"/>
      <img src={ClapIcon} alt="fly-claps" className="flyClaps" id="clap5"/>
      <img src={ClapIcon} alt="fly-claps" className="flyClaps" id="clap6"/>
      { claps }
      { showComments ? <div style={styles.closeCmt} onClick={(e)=>{setShowComments(false)}}/> : null }
      { showComments ? <div style={styles.cmtBg} /> : null }
      { showComments ? <ViewSession sx={styles.cmtSection}/> : null }
    </div>
  );
}

export default ViewCollab;
