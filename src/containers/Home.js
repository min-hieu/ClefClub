import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { PRIMARY_COLOR } from '../Constant';
import testImg from '../assets/test/test_img.png';
import Navbar from '../components/shared/Navbar';
import CardList from '../components/shared/CardList';
import CollabHeading from '../components/shared/CollabHeading';
import testImg1 from '../assets/test/test_img.png';
import testImg2 from '../assets/test/jam.jpeg';
import testImg3 from '../assets/test/jam2.jpeg';
import testImg4 from '../assets/test/jam69.jpeg';
import testImg5 from '../assets/test/jam1.jpeg';
import testImg6 from '../assets/test/jam4.jpeg';
import testImg7 from '../assets/test/jam5.jpeg';

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
  homeCardList: {},
};

function Home({ classes }) {

  const topCollabData = [
    {   img: testImg1,
      title: 'this is a jam',
       link: '/collab/view',
       clap: 123},
    {   img: testImg2,
      title: 'this is a jam',
       link: '/collab/view',
       clap: 123},
    {   img: testImg3,
      title: 'this is a jam',
       link: '/collab/view',
       clap: 123},
    {   img: testImg4,
      title: 'this is a jam',
       link: '/collab/view',
       clap: 123},
    {   img: testImg5,
      title: 'this is a jam',
       link: '/collab/view',
       clap: 123},
    {   img: testImg6,
      title: 'this is a jam',
       link: '/collab/view',
       clap: 123},
    {   img: testImg1,
      title: 'this is a jam',
       link: '/collab/view',
       clap: 123},
    {   img: testImg7,
      title: 'this is a jam',
       link: '/collab/view',
       clap: 123},
  ];

  const banner =
    <Card>
      <CardActionArea>
        <CardMedia className={classes.media} image={require('../assets/test/test_img.png')}/>
      </CardActionArea>
    </Card>

    const topCollabs =
      <CardList data={topCollabData} conSx={styles.homeCardList}></CardList>

    return (
      <>
        {banner}
        <CollabHeading text="This week's top jams" />
        {topCollabs}
        <Navbar />
      </>
    );
}

export default withStyles(styles)(Home);
