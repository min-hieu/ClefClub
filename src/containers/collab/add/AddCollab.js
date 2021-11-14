import React from 'react';
import { styled, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Input from '@material-ui/core/Input';
import RefreshIcon from '@material-ui/icons/Refresh';
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

  return (
    <div className={classes.main}>
      <Typography className={classes.title}>Add to Jam</Typography>
      {uploaded ? (
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
          <img src={mainCover.img} className={classes.cover} />
          <div className={classes.dropzone} onClick={() => setUploaded(true)}>
            <AddCircleOutlineOutlinedIcon className={classes.addIcon} />
            <Typography className={classes.addText}>Upload video</Typography>
          </div>
        </div>
      )}
      <Input
        className={classes.message}
        placeholder="Message for the jam owner..."
        required
      />
      <Navbar />
    </div>
  );
}

export default withStyles(styles)(AddCollab);
