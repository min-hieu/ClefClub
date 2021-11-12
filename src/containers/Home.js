import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { PRIMARY_COLOR } from '../Constant';
import Navbar from '../components/shared/Navbar';
import testImg from '../assets/test/test_img.png';

import CardList from '../components/shared/CardList';

const styles = {
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
	const topSessionData = [
		{ 	img: testImg,
			title: 'Carpe Diem'},
		{ 	img: testImg,
			title: 'title'},
		{ 	img: testImg,
			title: 'title'},
		{ 	img: testImg,
			title: 'another session'},
	];

  const topCollabData = [
		{ 	img: testImg,
			title: 'this is a jam'},
		{ 	img: testImg,
			title: 'title'},
		{ 	img: testImg,
			title: 'title'},
		{ 	img: testImg,
			title: 'another jam'},
	];

  const banner = 
    <Card>
      <CardActionArea>
        <CardMedia className={classes.media} image={require('../assets/test/test_img.png')}/>
      </CardActionArea>
    </Card>

    const topSession =       
      <CardList data={topSessionData} displayCols={2.5} link={'/session/view'}></CardList>  
    
    const topCollabs = 
      <CardList data={topCollabData} displayCols={2.5} link={'./collab/view'}></CardList>

  return (
    <>
      {banner}
      
      <Typography className={classes.sessionHeading}>This week's top sessions</Typography>
      {topSession}

      <Typography className={classes.sessionHeading}>This week's top collab</Typography>
      {topCollabs}
      
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <Navbar />
    </>
  );
}

export default withStyles(styles)(Home);
