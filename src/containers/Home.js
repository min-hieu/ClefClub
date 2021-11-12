import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { PRIMARY_COLOR } from '../Constant';
import testImg from '../assets/test/test_img.png';

import Navbar from '../components/shared/Navbar';
import CardList from '../components/shared/CardList';
import CollabHeading from '../components/shared/CollabHeading';

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
	collabHeading: {
		fontSize: 20,
		color: PRIMARY_COLOR,
		paddingLeft: 16,
		padding: 10,
	},
};

function Home({ classes }) {
	const topSessionData = [
		{		img: testImg,
			title: 'Carpe Diem'},
		{		img: testImg,
			title: 'title'},
		{		img: testImg,
			title: 'title'},
		{		img: testImg,
			title: 'another session'},
	];

  const topCollabData = [
		{		img: testImg,
			title: 'this is a jam'},
		{		img: testImg,
			title: 'title'},
		{		img: testImg,
			title: 'title'},
		{		img: testImg,
			title: 'another jam'},
	];

  const banner = 
    <Card>
      <CardActionArea>
        <CardMedia className={classes.media} image={require('../assets/test/test_img.png')}/>
      </CardActionArea>
    </Card>

    const topCollabs = <CardList 
				data={topCollabData}
				displayCols={2.5} 
				link={'./collab/view'}
				offsetFlag={1}
			></CardList>

  return (
    <>
      {banner}
      
			<CollabHeading text="This week's top collab" />
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
