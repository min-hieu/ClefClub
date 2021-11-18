import React, { useState, useEffect } from "react"
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { PRIMARY_COLOR } from '../Constant';
import Navbar from '../components/shared/Navbar';
import CardList from '../components/shared/CardList';
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
  select: {
    minWidth: 80,
    margin: 10,
    background: 'white',
    color: PRIMARY_COLOR,
    fontSize: 18,
    '&:focus':{
      backgroundColor: 'white',
    },
  },
};

function Home({ classes }) {
  const { currentUser } = useAuth();
  const history = useHistory();
  const [allCollabs, setAllCollabs] = useState();


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


  var topCollabData=[];
  if (allCollabs){
      for(var i=0;i<allCollabs.length;i++){
        topCollabData.push({   img: testImg3,
          video: allCollabs[i].videos[0],
          title: allCollabs[i].title,
          link: '/collab/view',
          clap: allCollabs[i].claps,
          collabId: allCollabs[i].collabId,
          collabSize: allCollabs[i].userIds.length,
        });
      }
  }

  const banner =
    <Card onClick={(e)=>{
      history.push(
        {
          pathname:'/collab/view',
          state:{collabId:"lQr-MMn639Q?autoplay=1"
        }
      })}}>
      <CardActionArea>
        <CardMedia className={classes.media} image={require('../assets/test/test_img.png')}/>
      </CardActionArea>
    </Card>

  const sortOptions = ['Hot', 'New', 'Rising'];
  const [sortOption, setSortOption] = React.useState(sortOptions[0]);
  const sortSelect =
    <Select
      native
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      disableUnderline
      classes={{ root: classes.select }}
    >
      {sortOptions.map((option) => (
        <option value={option}>
          {option}
        </option>
      ))}
    </Select>

  const topCollabs =
    <CardList data={topCollabData} conSx={styles.homeCardList}></CardList>

  return (
    <>
      {banner}
      {sortSelect}
      {topCollabs}
      <Navbar />
    </>
  );
}

export default withStyles(styles)(Home);
