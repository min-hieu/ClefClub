import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { PRIMARY_COLOR, TERTIARY_COLOR } from '../../../Constant';
import testImg from '../../../assets/test/test_img.png';

const styles = {
	hud: {
		height: '16%',
		width: '100%',
		background: `linear-gradient(#00000000,${PRIMARY_COLOR} 40%)`,
		bottom: 0,
		position: 'absolute',
	},
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  subTitle: {
    fontSize: 14,
  },
  videoWrapper: {
    marginTop: 50,
    width: '100%',
    height: '90%',
  },
  textWrapper: {
    padding: 20,
    color: TERTIARY_COLOR,
  },
};

function CollabView({ classes }) {
  return (
    <>
      <div className={classes.videoWrapper}>
      </div>
			<div className={classes.hud}>
        <div className={classes.textWrapper}>
          <Typography className={classes.title}>John - 69K views - 6 days ago</Typography>
          <Typography className={classes.subTitle}>Ayo whassubdog</Typography>
        </div>
			</div>
    </>
  );
}

export default withStyles(styles)(CollabView);
