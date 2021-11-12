import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { PRIMARY_COLOR } from '../../Constant';

const styles = {
	collabHeading: {
		fontSize: 20,
		color: PRIMARY_COLOR,
		paddingLeft: 16,
		padding: 10,
	},
}

const CollabHeading = ({ classes, text , sx }) => 
	<Typography className={ classes.collabHeading } sx={ sx } >
		{ text }
	</Typography>
;

export default withStyles(styles)( CollabHeading );
