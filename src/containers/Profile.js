import React from 'react';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR} from '../Constant';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Navbar from '../components/shared/Navbar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CollabHeading from '../components/shared/CollabHeading';

const styles = {
	profile: {
		position: 'absolute',
		left: '50%',
		transform: 'translate(-50%,30px)',
		background: TERTIARY_COLOR,
		padding: '15px',
		width: '90%',
		borderRadius: 2,
		height: 130,
		overflow: 'hidden',
	},
	avatar: {
		width: 100,
		height: 100,
	},
	name: {
		textAlign: 'center',
		lineHeight: 3.3,
		fontSize: 30,
		fontWeight: 'bold',
	},
	heading: {
		fontSize: 20,
		color: PRIMARY_COLOR,
		paddingLeft: 20,
		position: 'absolute',
		top: 160,
	}
};

function Profile(props) {
	const { 
		classes,
		name,
		picture,
		collabs
	} = props;

	return (
		<>
			<Grid container sx={styles.profile}>
				<Grid item xs={8}>
					<Typography variant="h1" sx={styles.name}>{ name }</Typography>
				</Grid>
				<Grid item xs={2}>
					<Avatar sx={styles.avatar} alt={ name } src={ picture }/>
				</Grid>
			</Grid>
			
			<CollabHeading text="Your Previous Collab" sx={styles.heading}/>

			<Navbar />
		</>
	);
}

export default Profile;
