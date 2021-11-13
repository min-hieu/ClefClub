import React from 'react';
import { PRIMARY_COLOR } from '../../Constant';
import { withStyles } from '@material-ui/core/styles';
import testImg from '../../assets/test/test_img.png';

const styles = {
	hud: {
		height: '16%',
		width: '100%',
		background: `linear-gradient(#00000000, ${PRIMARY_COLOR} 40%)`,
		bottom: 0,
		position: 'absolute',
	},
};

function CollabView({ classes }) {
  return (
    <>
			<div className={classes.hud}>
			</div>
    </>
  );
}

export default withStyles(styles)(CollabView);
