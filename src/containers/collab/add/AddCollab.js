import React from 'react';
import { styled, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import RefreshIcon from '@material-ui/icons/Refresh';
import CheckIcon from '@material-ui/icons/Check';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../../Constant';
import testCover from '../../../assets/test/test_cover.png'
import Navbar from '../../../components/shared/Navbar';

const styles = {
  main: {
    margin: '50px 35px 20px 35px',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
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
  successMessage: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
};

const StyledFab = styled(Fab)({
  position: 'absolute',
  top: 420,
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
  const mainCover =
		{ img: testCover,
			title: 'test cover' };
  const [uploaded, setUploaded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const submit = async () => {
    setOpen(true);
    await delay(1000);
    window.location.href = '/';
  };
  const handleClose = () => {
    setOpen(false);
  };
  const successMessage =
    <div className={classes.successMessage}>
      <CheckIcon />
      <span> Your jam has been submitted! </span>
    </div>

  const header = <Typography className={classes.title}>Add to Jam</Typography>
  const videoUpload =
    uploaded ? (
      <>
        <iframe
          className={classes.preview}
          width="304"
          height="380"
          src={"https://www.youtube.com/embed/-xEpxWPAYXU?start=28&end=41"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
        <StyledFab aria-label="reupload" onClick={() => setUploaded(false)}>
          <RefreshIcon />
        </StyledFab>
      </>
    ) : (
      <div className={classes.videoWrapper}>
        <img src={mainCover.img} alt={mainCover.title} className={classes.cover} />
        <div className={classes.dropzone} onClick={() => setUploaded(true)}>
          <AddCircleOutlineOutlinedIcon className={classes.addIcon} />
          <Typography className={classes.addText}>Upload video</Typography>
        </div>
      </div>
    )

  const messageToOwner =
    <Input
      className={classes.message}
      placeholder="Message for the jam owner..."
      required
    />

  const submitButton =
    <Button
      className={classes.submitButton}
      onClick={submit}
    >
      Submit your jam
    </Button>

  const successSnackbar =
    <Snackbar
      open={open}
      onClose={handleClose}
      ContentProps={{
        classes: {
          root: classes.snackbar
        }
      }}
      message={successMessage}
    />

  return (
    <div className={classes.main}>
      {header}
      {videoUpload}
      {messageToOwner}
      {submitButton}
      {successSnackbar}
      <Navbar />
    </div>
  );
}

export default withStyles(styles)(AddCollab);
