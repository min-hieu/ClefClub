import React, { useState, useEffect } from "react"
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { PRIMARY_COLOR } from '../Constant';
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


import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { getAllCollabs } from "../contexts/DBContext"




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
  const { currentUser} = useAuth()
  const history = useHistory()
  const [allCollabs, setAllCollabs] = useState()


  useEffect(() => {
    // Run! Like go get some data from an API.
    if (!currentUser) {
      history.push("/login")
      return;
    }else{

      let claps = getAllCollabs ();
      claps.then(claps => {
        setAllCollabs(claps)
      })

    }
  }, []);

  // const topCollabData = [
  //   {   img: testImg1,
  //     title: 'this is a jam',
  //      link: '/collab/view',
  //      clap: 123},
  //   {   img: testImg2,
  //     title: 'this is a jam',
  //      link: '/collab/view',
  //      clap: 123},
  //   {   img: testImg3,
  //     title: 'this is a jam',
  //      link: '/collab/view',
  //      clap: 123},
  //   {   img: testImg4,
  //     title: 'this is a jam',
  //      link: '/collab/view',
  //      clap: 123},
  //   {   img: testImg5,
  //     title: 'this is a jam',
  //      link: '/collab/view',
  //      clap: 123},
  //   {   img: testImg6,
  //     title: 'this is a jam',
  //      link: '/collab/view',
  //      clap: 123},
  //   {   img: testImg1,
  //     title: 'this is a jam',
  //      link: '/collab/view',
  //      clap: 123},
  //   {   img: testImg7,
  //     title: 'this is a jam',
  //      link: '/collab/view',
  //      clap: 123},
  // ];

  var topCollabData=[];
  if (allCollabs){
      for(var i=0;i<allCollabs.length;i++){
        topCollabData.push({   img: testImg3,
          video: allCollabs[i].videos[0],
          title: allCollabs[i].title,
          link: '/collab/view',
          clap: allCollabs[i].claps,
          collabId: allCollabs[i].collabId,
        });
      }
  }
  // console.log("Elements topCollabData:",topCollabData)


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
