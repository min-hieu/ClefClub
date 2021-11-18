import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Navbar from '../../components/shared/Navbar';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../Constant';

import { storage, db } from "../../firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {getCollab} from "../../contexts/DBContext"
import { useHistory } from "react-router-dom"
import { useAuth,getUserInfo } from "../../contexts/AuthContext"

const styles = {
  main: {
    margin: '50px 35px 20px 35px',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  jamTitle: {
    textAlign: 'center',
    // fontSize: 20,
    // fontWeight: 'bold',
    color: 'grey',
  },
  jamDescription: {
    color: 'PRIMARY_COLOR',
    // margin: '5px 0 20px 0',
  },
  done: {
    fontSize: 20,
    fontWeight: 500,
    textAlign: 'right',
    color: PRIMARY_COLOR,
  },
  subtitle: {
    color: 'black',
    margin: '5px 0 10px 0',
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
    height: 200,
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
    marginBottom: 50,
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

function ContributeToCollab({ classes }) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [video, setVideo] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("Upload video");
  const [collabId, setCollabId] = useState()
  const [collabTitle, setCollabTitle] = useState()
  const [collabDescription, setCollabDescription] = useState()
  const [collabSize, setCollabSize] = useState()
  const [collabOwners, setCollabOwners] = useState([])
  const [userName, setUserName] = useState([])
  const history = useHistory()
  const [formData, setFormData] = useState({})
  const { currentUser } = useAuth()


  const updateFormData = (key, value) => {
    setFormData({...formData, [key]: value})
  }

  const { state } = useLocation();

  useEffect(() => {
    
    setCollabId(state.collabId)
    let collab = getCollab (state.collabId);
    collab.then(collab => {
      // console.log(collab.title)
      setCollabTitle(collab.title)
      setCollabDescription(collab.description)
      setCollabSize(collab.userIds.length)
      setCollabOwners(collab.userIds)

      })

    let user = getUserInfo (currentUser.email);
    // console.log("Found a user:\n",user)
        user.then(user => {
      setUserName(user.nickname)
      })
    
  }, [collabId,collabTitle,collabDescription]);


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


  const handleVideoUpload = () => {

    console.log("Uploading the video!\n");
    console.log(video.name);

    const storageRef = ref(storage, 'videos/' + video.name);
    const metadata = {
      username: 'firstUser',
    };    
    const uploadTask = uploadBytesResumable(storageRef, video, metadata);
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
        db.collection("requests").add({
          ...formData,
          collabTitle: collabTitle,
          status: "pending",
          acceptedIds: [],
          declinedIds: [],
          videoURL: downloadURL,
          requesterId: currentUser.email,
          requesterName: userName,
          receiverIds: collabOwners,
        });
      });
      alert("Your request is sent!");
      history.push("/notification")
    }
    );
  };

  const messageField =
  <Input
  onChange={(event) => {
    updateFormData('message', event.target.value)
  }}
    className={classes.description}
    placeholder="Message to owners"
    required
  />

  const header =
    <>
      <Typography className={classes.title}>Join the Jam</Typography>
      <Typography className={classes.jamTitle}>Start cooking up some joy!</Typography>
    </>

const jamInfo =
    <>
      <Typography className={classes.subtitle}><b>Jam's Title:</b> {collabTitle}</Typography>
      <Typography className={classes.subtitle}><b>Description: </b>{collabDescription}</Typography>
      <Typography className={classes.subtitle}><b>Number of collaborators:</b> {collabSize}</Typography>
    </>

const addZone = 
    <div className={classes.dropzone}>
      <AddCircleOutlineOutlinedIcon className={classes.addIcon} style= {{cursor:'pointer'}} onClick = {handleClickUpload}/>
      <input type="file" style={{display:'none'}} ref={hiddenFileInput}  onChange={handleChoose}/>
      <Typography className={classes.addText}>{title}</Typography>
    </div>

 
  const publishButton =
    <Button onClick = {handleVideoUpload} variant="contained" className={classes.publishButton}>
      Send a request
    </Button>

  return (
    <div className={classes.main}>
      {header}
      <br/>
      {jamInfo}
      <br/>
      {addZone}
      <br/>
      {messageField}
      <br/>
      {publishButton}
			<Navbar />
    </div>
  );
}

export default withStyles(styles)(ContributeToCollab);
