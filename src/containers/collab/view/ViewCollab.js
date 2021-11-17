import React,{ useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { PRIMARY_COLOR, SECONDARY_COLOR,TERTIARY_COLOR } from '../../../Constant';
import testImg from '../../../assets/test/test_img.png';
import YoutubeEmbed from '../../../components/shared/YoutubeEmbed';
import ChatIcon from '@mui/icons-material/Chat';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import ClapIcon from '../../../assets/clap.svg';
import Grid from '@mui/material/Grid';
import ViewSession from '../../session/view/ViewSession';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import style from './clap.css';


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
    top: 0,
    width: 400,
    height: 800,
    left: '50%',
    transform: "translate(-50%,0)",
  },
  flyClap: {
    position: 'absolute',
    opacity: 0,
    top: 0,
    width: 50,
    height: 50,
  }
};


function CollabView(props) {
  const {
    videoId,
    videoUser,
    videoTitle,
    videoDescription,
  } = props

  const tmpVideoId = "lQr-MMn639Q?autoplay=1";

  const video =
    <YoutubeEmbed
      embedId={ tmpVideoId }
      w="375"
      h="700"
      sx={styles.video}
    />

  const title =
    <Typography sx={styles.title}>
      <span style={{color:SECONDARY_COLOR}}>John</span>
      - 69K views - 6 days ago
    </Typography>

  const description =
    <Typography sx={styles.desc}>
      Ayo whassubdog...
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
        <LocalFloristIcon onClick={(e)=>{setShowFlower(true)}}/>
      </Grid>
      <Grid item xs={4}>
        <img src={ClapIcon} style={{width:24,height:24}}/>
      </Grid>
      <Grid item xs={4}>
        <ChatIcon
        onClick={(e) => {setShowComments(true)}}
        />
      </Grid>
    </Grid>

  const flower =
        <FilterVintageIcon sx={{position: 'absolute',right:23.4,bottom:118.1}}/>

  const [showComments, setShowComments] = useState(false);
  const [showFlower, setShowFlower] = useState(false);

  return (
    <>
      { video }
      <div style={styles.overlay}>
        <div style={styles.overlayBg}/>
        <div style={styles.textWrapper}>
          {title}
          {description}
          {showFlower ? flower : null}
          {iconList}
        </div>
      </div>
      <img src={ClapIcon} className="flyClaps" id="clap1"/>
      <img src={ClapIcon} className="flyClaps" id="clap2"/>
      <img src={ClapIcon} className="flyClaps" id="clap3"/>
      <img src={ClapIcon} className="flyClaps" id="clap4"/>
      <img src={ClapIcon} className="flyClaps" id="clap5"/>
      <img src={ClapIcon} className="flyClaps" id="clap6"/>
      { showComments ? <div style={styles.closeCmt} onClick={(e)=>{setShowComments(false)}}/> : null }
      { showComments ? <div style={styles.cmtBg} /> : null }
      { showComments ? <ViewSession sx={styles.cmtSection}/> : null }
    </>
  );
}

// export default withStyles(styles)(CollabView);
export default CollabView;
