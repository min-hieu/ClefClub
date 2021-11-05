import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { PRIMARY_COLOR } from '../Constant';
import Navbar from '../components/shared/Navbar';
import testImg from '../assets/test/test_img.png';

const styles = {
	main: {
		background: 'white',
		borderRadius: 20,
		height: '100%',
		overflow: 'scroll',
		marginBottom: 20,
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
		paddingLeft: 16,
		padding: 10,
	},
	tileTitle: {
		height: '100%',
    top: '50%',
    transform: 'translate(0, -50%)',
    textAlign: 'center',
		backgroundColor: '#00000036',
		'-webkit-user-select': 'none', /* Safari */        
		'-moz-user-select': 'none', /* Firefox */
		'-ms-user-select': 'none', /* IE10+/Edge */
		'user-select': 'none', /* Standard */
	},
	tileRoot: {
		marginLeft: 15,
	},
	tile: {
		borderRadius: 10,
	},
	gridListWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
		overflow: 'hidden',
		'-webkit-scrollbar-display': 'None',
  },
  gridList: {
    flexWrap: 'nowrap'
  },
};

function Home({ classes }) {
	const tileData = [
		{
			img: testImg,
			title: 'this is fucked'
		},	
		{
			img: testImg,
			title: 'title'
		},	
		{
			img: testImg,
			title: 'title'
		},	
		{
			img: testImg,
			title: 'fuck'
		},	
	]

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

			<div className={classes.gridListWrapper}>
				<GridList className={classes.gridList} cols={2.5}>
					{tileData.map((tile) => (
						<GridListTile key={tile.img}
							classes={{ root: classes.tileRoot, tile: classes.tile }}>
							<img src={tile.img} alt={tile.title} />
							<GridListTileBar className={classes.tileTitle}
								title={tile.title}
							/>
						</GridListTile>
					))}
				</GridList>
			</div>

			<Typography className={classes.sessionHeading}>This week's top collab</Typography>

			<div className={classes.gridListWrapper}>
				<GridList className={classes.gridList} cols={2.5}>
					{tileData.map((tile) => (
						<GridListTile key={tile.img}
							classes={{ root: classes.tileRoot, tile: classes.tile }}>
							<img src={tile.img} alt={tile.title} />
							<GridListTileBar className={classes.tileTitle}
								title={tile.title}
							/>
						</GridListTile>
					))}
				</GridList>
			</div>
			
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>

			<Navbar />
    </div>
  );
}

export default withStyles(styles)(Home);
