import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import testImg from '../../assets/test/test_img.png';
import { Player, ControlBar } from 'video-react';
import styles from '../../css/View.css';
import Navbar from '../../components/shared/Navbar';
import Button from '@material-ui/core/Button';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import Fab from '@material-ui/core/Fab';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../Constant'
import { styled, withStyles } from '@material-ui/core/styles';
{/* his */}
import { PRIMARY_COLOR } from '../../Constant';
import { withStyles } from '@material-ui/core/styles';
import YoutubeEmbed from '../../components/shared/YoutubeEmbed';

const styles = {
  hud: {
    height: '16%',
    width: '100%',
    background: `linear-gradient(#00000000, ${PRIMARY_COLOR} 40%)`,
    bottom: 0,
    position: 'absolute',
  },
};

{/* function CollabView({ videoId }) {
  return (
    <>
      <YoutubeEmbed embedId="6mYw53V9RGM?autoplay=1" w="853" h="480" />
      <div className={styles.hud}>
      </div> */}

const StyledFab = styled(Fab)({
	position: 'absolute',
	color: TERTIARY_COLOR,
	background: SECONDARY_COLOR,
	zIndex: 1,
	top: 'auto',
	bottom: 25,
	left: 0,
	right: 0,
	margin: '0 auto',
	'&:hover': {
	  background: TERTIARY_COLOR,
	  color: SECONDARY_COLOR
	},
  });

const joinButton =
	<Button onClick={event =>  window.location.href='/session/new'} variant="contained" className='joinButton'>
	Contribute
	</Button>

const AddOption =           
<Link to='/session/new'>
  <StyledFab aria-label="add">
	<AddCircleRoundedIcon class = "addIcon"/>
  </StyledFab>
</Link>



function CollabView({ classes }) {

	const [url, getUrl] = useState("");

  return (
    <>

		<div class="container" >
		<div class="vertical-center bg-dark" >

			 <video controls autoPlay className="uploadedVideo" src={url || "http://www.w3schools.com/html/mov_bbb.mp4"} alt="firebase-video" />
			 <div class="horizontal-right">
	
			 {AddOption}

			 </div>
		 </div>

    	</div>

		{/* <Navbar /> */}
		

    </>
  );
}

export default CollabView;
