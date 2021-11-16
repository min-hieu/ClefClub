import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { PRIMARY_COLOR, SECONDARY_COLOR,TERTIARY_COLOR } from '../../../Constant';
import testImg from '../../../assets/test/test_img.png';
import YoutubeEmbed from '../../../components/shared/YoutubeEmbed';
import ChatIcon from '@mui/icons-material/Chat';

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
  chatIcon:{
    position: 'absolute',
    right: 20,
    bottom: 40,
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

  return (
    <>
      {video}
      <div style={styles.overlay}>
        <div style={styles.overlayBg}/>
        <div style={styles.textWrapper}>
          {title}
          {description}
          <ChatIcon sx={styles.chatIcon}/>
        </div>
      </div>
    </>
  );
}

export default CollabView;
