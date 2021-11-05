import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { PRIMARY_COLOR } from '../../Constant';

/* this function return the fancy bouncy button as placeholder,
 * feel free to change it later on. */

const styles = {
	btn: {
		textTransform: 'none',
		color: 'white',
		background: PRIMARY_COLOR,
  },
};

function Btn({ classes, text }) {
	return (
		<Button
			variant="contained"
			className={classes.btn}
		>
			{text}
		</Button>
	);
}

export default withStyles(styles)(Btn);
