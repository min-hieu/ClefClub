import React, { useRef, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Navbar from '../../components/shared/Navbar';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../Constant';
import { useAuth } from "../../contexts/AuthContext"

import { storage } from "../../firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from "../../firebase"
import {createId} from "../../contexts/DBContext"


const styles = {
  main: {
    margin: '50px 35px 20px 35px',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  done: {
    fontSize: 20,
    fontWeight: 500,
    textAlign: 'right',
    color: PRIMARY_COLOR,
  },
  subtitle: {
    color: 'grey',
    margin: '5px 0 20px 0',
  },
  dropzone: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 20,
    borderColor: PRIMARY_COLOR,
    borderStyle: 'dashed',
    backgroundColor: TERTIARY_COLOR,
    color: SECONDARY_COLOR,
    outline: 'none',
    transition: 'border .24s ease-in-out',
    width: 300,
    height: 300,
    justifyContent: 'center',
  },
  addIcon: {
    color: PRIMARY_COLOR,
    fontSize: 72,
  },
  addText: {
    fontSize: 20,
  },
  name: {
    fontSize: 20,
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
    width: '100%',
    padding: 4,
  },
  nameInput: {
    textAlign: 'center',
  },
  description: {
    width: '100%',
  },
  viewButton: {
    textTransform: 'none',
    color: SECONDARY_COLOR,
    backgroundColor: TERTIARY_COLOR,
    borderRadius: 15,
    marginTop: 10,
    minWidth: 140,
    fontSize: 18,
  },
  publishButton: {
    color: TERTIARY_COLOR,
    backgroundColor: SECONDARY_COLOR,
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center !important',
    '&:hover': {
      backgroundColor: `${PRIMARY_COLOR} !important`,
      color: TERTIARY_COLOR,
    },
    width: '100%',
    marginTop: 20,
  }
};

function NewCollab({ classes }) {
  const [formData, setFormData] = useState({})
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [video, setVideo] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("Upload video");
  const { currentUser, logout } = useAuth()
  const descriptionRef = useRef()
  const titleRef = useRef()

  const updateFormData = (key, value) => {
    setFormData({...formData, [key]: value})
  }

  var videoChosen = false;

  const hiddenFileInput = React.useRef(null);

  const handleClickButton = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChoose = e => {
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
    setTitle("Video is chosen!");
  };

  const handleClickUpload = e => {
    hiddenFileInput.current.click();
  }

  // const videoChosen () => {
  //   document.getElementById("load_text").innerHTML = 'New Phrase';
  // };

  const handleVideoUpload = () => {
    console.log("Uploading the video!\n");
    console.log(video.name);

    const storageRef = ref(storage, 'videos/' + video.name);   
    const uploadTask = uploadBytesResumable(storageRef, video);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setTitle('Just a moment:' + Math.round(progress) + '%');
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          setTitle('Upload is paused');
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);

        const sessionId = createId(20);
        console.log({
          ...formData,
          likes: 0,
          userIds: ['userId'],
          comments: [],
          createdAt: Date.now(),
          videos: [downloadURL],
        })
        db.collection("sessions").doc(sessionId).set({
          ...formData,
          likes: 0,
          userIds: [currentUser.email],
          comments: [],
          createdAt: Date.now(),
          videos: [downloadURL],
        });
      });
      alert("You jam is created!");
    }
    );
  };


  const header =
    <>
      <Typography className={classes.title}>New Jam</Typography>
      <Typography className={classes.subtitle}>Start cooking up some joy!</Typography>
    </>

const addZone = 
    <div className={classes.dropzone}>
      <AddCircleOutlineOutlinedIcon className={classes.addIcon} style= {{cursor:'pointer'}} onClick = {handleClickUpload}/>
      <input type="file" style={{display:'none'}} ref={hiddenFileInput}  onChange={handleChoose}/>
      <Typography className={classes.addText}>{title}</Typography>
    </div>

  const titleField =
    <InputBase
      onChange={(event) => {
        updateFormData('title', event.target.value)
      }}
      className={classes.name}
      placeholder="Jam Title"
      required
      inputProps={{ 'aria-label': 'naked' }}
      classes={{
        input: classes.nameInput,
      }}
    />
  const descriptionField =
    <Input
    onChange={(event) => {
      updateFormData('description', event.target.value)
    }}
      className={classes.description}
      placeholder="Description"
      required
    />

  const publishButton =
    <Button onClick = {handleVideoUpload} variant="contained" className={classes.publishButton}>
      Publish your jam
    </Button>

  return (
    <div className={classes.main}>
      {header}
      {addZone}
      {titleField}
      {descriptionField}
      {publishButton}
			<Navbar />
    </div>
  );
}

export default withStyles(styles)(NewCollab);
