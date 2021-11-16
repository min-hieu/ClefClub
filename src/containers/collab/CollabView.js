import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import testImg from '../../assets/test/test_img.png';
import { Player, ControlBar } from 'video-react';
import styles from '../../css/View.css';
import Navbar from '../../components/shared/Navbar';
import Button from '@material-ui/core/Button';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Fab from '@material-ui/core/Fab';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../Constant'
import { styled, withStyles } from '@material-ui/core/styles';
import { storage } from "../../firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from "../../firebase"



const handleLikes  = () => {
    var collab = db.collection("sessions").doc('CHROc1YPAEJXHjAX7iJ9');
    collab.get().then(function (doc) {
      if (doc.exists) {
        collab.get().then((snapshot) => {
          var likes = snapshot.data().likes;
          collab.update({
            likes: likes+1,
          });
        });
      } else {
        alert("session is no longer available");
      }
    });
        
  }

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


const AddOption =           
<Link to='/collab/contribute'>
  <StyledFab aria-label="add">
	<AddCircleRoundedIcon class = "addIcon"/>
  </StyledFab>
</Link>

const Like =           
  <StyledFab aria-label="like">
	<FavoriteIcon onClick = {handleLikes} class = "Favorite"/>
  </StyledFab>

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
		 <div class="horizontal-sec-right">
				{Like}
		</div>
		 </div>
		 
    	</div>

		{/* <Navbar /> */}
		

    </>
  );
}

export default withStyles(styles)(CollabView);
