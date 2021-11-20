import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import RefreshIcon from '@material-ui/icons/Refresh';
import Navbar from '../../../components/shared/Navbar';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../../Constant';
import { useAuth } from "../../../contexts/AuthContext"
import { storage } from "../../../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from "../../../firebase"
import { useHistory } from "react-router-dom"
import Snackbar from '@material-ui/core/Snackbar';

const styles = {
  main: {
    margin: '50px 35px 20px 35px',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  snackbar: {
    background: PRIMARY_COLOR,
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
  newdropzone: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 20,
    // borderColor: PRIMARY_COLOR,
    // borderStyle: 'dashed',
    // backgroundColor: TERTIARY_COLOR,
    color: SECONDARY_COLOR,
    outline: 'none',
    transition: 'border .24s ease-in-out',
    width: 300,
    height: 80,
    justifyContent: 'center',
  },
  addIcon: {
    color: PRIMARY_COLOR,
    fontSize: 72,
  },
  refreshIcon: {
    color: PRIMARY_COLOR,
    fontSize: 50,
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
  const [url, setUrl] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [title, setTitle] = useState("Upload video");
  const { currentUser } = useAuth()
  const history = useHistory()
  const [open, setOpen] = useState(false);
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const updateFormData = (key, value) => {
    setFormData({...formData, [key]: value})
  }


  const hiddenFileInput = React.useRef(null);

  const handleChoose = e => {
    if (e.target.files[0]) {
      handleVideoUpload(e.target.files[0]);
    }
  };

  const handleClickUpload = e => {
    hiddenFileInput.current.click();
  }

  const addCollabToDB  = async () =>{
    try {
      db.collection("sessions").add({
        ...formData,
        claps: 0,
        clappedIds: [currentUser.email],
        userIds: [currentUser.email],
        comments: [],
        createdAt: Date.now(),
        videos: [url],
        requests: []
      });

      setOpen(true);
      await delay(1000);
      history.push( {pathname: "/profile"})
    }
    catch{
      alert("Please choose a video first!")
    }
  }

  const handleVideoUpload = (video) => {
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
          setTitle('Loading...');
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
        setUrl(downloadURL)
        setTitle("Video is chosen!");
        setUploaded(true);
      });
    }
    );
  };

  const header =
    <>
      <Typography className={classes.title}>New Jam</Typography>
      <Typography className={classes.subtitle}>Start cooking up some joy!</Typography>
    </>

  const addZone = uploaded ? (
      <div className={classes.newdropzone}>
        <RefreshIcon className={classes.refreshIcon} style= {{cursor:'pointer'}} onClick = {handleClickUpload}/>
        <input type="file" style={{display:'none'}} ref={hiddenFileInput}  onChange={handleChoose}/>
        <Typography className={classes.addText}>{title}</Typography>
      </div>
  ) : (
    <div className={classes.dropzone}>
      <AddCircleOutlineOutlinedIcon className={classes.addIcon} style= {{cursor:'pointer'}} onClick = {handleClickUpload}/>
      <input type="file" style={{display:'none'}} ref={hiddenFileInput}  onChange={handleChoose}/>
      <Typography className={classes.addText}>{title}</Typography>
    </div>
  )

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
    <Button onClick = {addCollabToDB} variant="contained" className={classes.publishButton}>
      Publish your jam
    </Button>

  const videoDisplay = uploaded && (
    <div className="d-inline-flex p-2">
      <br/>
      <video
        src={url}
        controls
        width="290px"
        loading="lazy"
      />
    </div>
  );

  const successSnackbar =
    <Snackbar
      open={open}
      ContentProps={{
        classes: {
          root: classes.snackbar
        }
      }}
      message={"Your request is submitted!"}
    />

  return (
    <div className={classes.main}>
      {header}
      {addZone}
      {videoDisplay}
      {titleField}
      {descriptionField}
      {publishButton}
      {successSnackbar}
			<Navbar />
    </div>
  );
}

export default withStyles(styles)(NewCollab);
