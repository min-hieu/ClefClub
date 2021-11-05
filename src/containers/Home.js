import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { PRIMARY_COLOR } from '../Constant';
import Btn from '../components/shared/button';
import Navbar from '../components/shared/Navbar';

const styles = {
	main: {
		background: 'white',
		borderRadius: 20,
		height: '100%',
	},
	media: {
    height: 300,
		borderRadius: '20px 20px 0 0',
  },
	mediaList: {
    width: 133,
    height: 177,
		borderRadius: 10,
  },
	sessionHeading: {
		fontSize: 20,
		color: PRIMARY_COLOR,
		padding: 16,
	},
	listWrapper: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	testCard: {
		padding: 16,
	},
};

function Home({ classes }) {
	const sessionList = [
		<Card className={classes.testCard}>
			<CardActionArea>
				<CardMedia
					className={classes.mediaList}
					image={require('../assets/test/test_img.png')}
				/>
			</CardActionArea>
		</Card>,
		<Card className={classes.testCard}>
			<CardActionArea>
				<CardMedia
					className={classes.mediaList}
					image={require('../assets/test/test_img.png')}
				/>
			</CardActionArea>
		</Card>,
		<Card className={classes.testCard}>
			<CardActionArea>
				<CardMedia
					className={classes.mediaList}
					image={require('../assets/test/test_img.png')}
				/>
			</CardActionArea>
		</Card>,
	];

  return (
    <div className={classes.main}>
			<Card>
				<CardActionArea>
					<CardMedia
						className={classes.media}
						image={require('../assets/test/test_img.png')}
					/>
				</CardActionArea>
			</Card>
			<Typography className={classes.sessionHeading}>This week's top sessions</Typography>
			<div className={classes.listWrapper}>
				{sessionList.map(
					session => session
				)}
			</div>
			<Navbar />
    </div>
  );
}

export default withStyles(styles)(Home);
