import React, { useState, useEffect } from 'react';
import { styled, withStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import RefreshIcon from '@material-ui/icons/Refresh';
import CheckIcon from '@material-ui/icons/Check';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../../Constant';
import testCover from '../../../assets/test/test_cover.png'
import testAddCollab from '../../../assets/test/testAddCollab.png'
import Navbar from '../../../components/shared/Navbar';
import { storage, db } from "../../../firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {getCollab} from "../../../contexts/DBContext"
import { useAuth,getUserInfo } from "../../../contexts/AuthContext"

const styles = {
  backIcon: {
    zIndex: 999,
    fontSize: 30,
    top: 40,
    left: 20,
    position: 'sticky',
    color: PRIMARY_COLOR,
  },
  main: {
    margin: '50px 35px 20px 35px',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: -45,
  },
  videoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 10,
  },
  cover: {
    borderRadius: '10px 10px 0px 0px',
  },
  dropzone: {
    margin: 'initial',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: '0px 0px 10px 10px',
    borderColor: PRIMARY_COLOR,
    borderStyle: 'dashed',
    backgroundColor: TERTIARY_COLOR,
    color: SECONDARY_COLOR,
    outline: 'none',
    transition: 'border .24s ease-in-out',
    justifyContent: 'center',
    height: 300,
  },
  addIcon: {
    color: PRIMARY_COLOR,
    fontSize: 40,
    paddingTop: 20,
  },
  addText: {
    fontSize: 15,
    paddingBottom: 20,
  },
  message: {
    width: '100%',
  },
  preview: {
    borderRadius: 10,
    paddingBottom: 4,
  },
  submitButton: {
    background: PRIMARY_COLOR,
    color: TERTIARY_COLOR,
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
    '&:hover': {
      background: TERTIARY_COLOR,
      color: SECONDARY_COLOR,
    },
  },
  snackbar: {
    background: PRIMARY_COLOR,
  },
  alertSnackbar: {
    background: 'red',
  },
  snackbarMessage: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
};

const StyledFab = styled(Fab)({
  position: 'absolute',
  top: 405,
  right: 50,
  color: TERTIARY_COLOR,
  background: SECONDARY_COLOR,
  zIndex: 1,
  margin: '0 auto',
  '&:hover': {
    background: TERTIARY_COLOR,
    color: SECONDARY_COLOR
  },
});

function AddCollab({ classes }) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [video, setVideo] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("Upload video");
  const [collabId, setCollabId] = useState();
  const [collabVideo, setCollabVideo] = useState();
  const [collabTitle, setCollabTitle] = useState()
  const [collabDescription, setCollabDescription] = useState()
  const [collabSize, setCollabSize] = useState();
  const [collabOwners, setCollabOwners] = useState([]);
  const [userName, setUserName] = useState([]);
  const history = useHistory();
  const { state } = useLocation();
  const [formData, setFormData] = useState({});
  const { currentUser } = useAuth();
  const [uploaded, setUploaded] = useState(false);


  useEffect(() => {
    setCollabId(state.collabId)
    let collab = getCollab (state.collabId);
    collab.then(collab => {
      setCollabVideo(collab.videos[0])
      setCollabTitle(collab.title ? collab.title : "")
      setCollabDescription(collab.description)
      setCollabSize(collab.userIds.length)
      setCollabOwners(collab.userIds)
      })

    let user = getUserInfo (currentUser.email);
        user.then(user => {
      setUserName(user.nickname)
      })
  }, []);


  const updateFormData = (key, value) => {
    setFormData({...formData, [key]: value})
  }

  const hiddenFileInput = React.useRef(null);
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleChoose = e => {
    const chosenFile = e.target.files[0];
    if (chosenFile) {
      // setVideo(e.target.files[0]);
      if (!chosenFile.type.includes('video')) {
        setOpenAlert(true);
        return;
      }
      handleVideoUpload(chosenFile);
      setTitle("Video is chosen!");
      setUploaded(true);
    };
  };

  const handleClickUpload = e => {
    hiddenFileInput.current.click();
  }

  const addCollabToDB  = async () =>{
    const acceptedIds = collabOwners.includes(currentUser) ? [] : [currentUser]
    const status = acceptedIds.length/setCollabOwners.length > 0.5 ? 'accepted' : 'pending'
    try{
      db.collection("requests").add({
        ...formData,
        collabId: collabId,
        collabTitle: collabTitle ? collabTitle : "Untitled",
        status: status,
        acceptedIds: acceptedIds,
        declinedIds: [],
        videoURL: url,
        requesterId: currentUser.email,
        requesterName: userName,
        receiverIds: collabOwners,
      });
      setOpen(true);
      await delay(1000);
      history.goBack();
    } catch (e) {
      alert(e)
      alert("Please choose a video first!")
    }
  }

  const handleVideoUpload = (video) => {
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
      setTitle('Just a moment: ' + Math.round(progress) + '%');
      setProgress(progress);
      switch (snapshot.state) {
        case 'paused':
          setTitle('Upload is paused');
          break;
        case 'running':
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
        setUrl(downloadURL)
        setUploaded(true);
      });
    }
    );
  };

  const mainCover =
		{ img: testCover,
			title: 'test cover' };
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const successMessage =
    <div className={classes.snackbarMessage}>
      <CheckIcon />
      <span> Your jam is published! </span>
    </div>

  const alertMessage =
    <div className={classes.snackbarMessage}>
      <CancelOutlinedIcon />
      <span> Unsupported file type! </span>
    </div>

  const header =
    <Grid container alignItems="center" justifyContent="center">
      <Grid item xs={2}>
        <ArrowBackIosIcon
          style={styles.backIcon}
          onClick={() => history.goBack()}
        />
      </Grid>
      <Grid item xs={10}>
        <Typography className={classes.title}>Add to Jam</Typography>
      </Grid>
    </Grid>

  const videoUpload =
      <div className={classes.videoWrapper}>
        {/* <img src={mainCover.img} alt={mainCover.title} className={classes.cover} /> */}
        <video src = {collabVideo} className={classes.cover} autoPlay loop muted/>
        <div className={classes.dropzone}>
          {uploaded ? (
            <>
            {progress<100?
            <>
            <br/>
            <br/>
            <Typography className={classes.addText}>{title}</Typography>
            </>
            : null}
            <video src = {url} style={{ height: '100%', width: '100%' }} autoPlay loop/>
            {/* <img src={testAddCollab} alt="test add collab" style={{ height: '100%', width: '100%' }}/> */}
              <StyledFab aria-label="reupload" onClick={() => setUploaded(false)}>
                <RefreshIcon />
              </StyledFab>
            </>
          ) : (
            <>
              <AddCircleOutlineOutlinedIcon className={classes.addIcon} style= {{cursor:'pointer'}} onClick = {handleClickUpload}/>
              <input type="file" style={{display:'none'}} ref={hiddenFileInput}  onChange={handleChoose}/>
              <Typography className={classes.addText}>{title}</Typography>
            </>
          )}
        </div>
      </div>

  const messageToOwner =
    <Input
      onChange={(event) => {
        updateFormData('message', event.target.value)
      }}
      className={classes.message}
      placeholder="Message for the jam owners..."
      required
    />

  const submitButton =
    <Button
      className={classes.submitButton}
      onClick={addCollabToDB}
    >
      Submit your jam
    </Button>

  const successSnackbar =
    <Snackbar
      open={open}
      onClose={handleClose}
      ContentProps={{
        classes: {
          root: classes.alertSnackbar
        }
      }}
      message={successMessage}
    />

  const alertSnackbar =
    <Snackbar
      open={openAlert}
      onClose={handleCloseAlert}
      ContentProps={{
        classes: {
          root: classes.alertSnackbar
        }
      }}
      message={alertMessage}
    />

  return (
    <div className={classes.main}>
      {header}
      <br />
      {videoUpload}
      {messageToOwner}
      {submitButton}
      {successSnackbar}
      {alertSnackbar}
      <Navbar />
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
  );
}

export default withStyles(styles)(AddCollab);
