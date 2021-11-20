import React, { useState, useEffect } from "react"
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@mui/material/Typography';
import { PRIMARY_COLOR } from '../Constant';
import Navbar from '../components/shared/Navbar';
import CardList from '../components/shared/CardList';
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { getAllCollabs } from "../contexts/DBContext";

const styles = {
  bannerTitle: {
    position: 'absolute',
    left: "50%",
    transform: "translate(-50%,0)",
    color: 'white',
    top: 140,
    fontSize: 30,
    fontWeight: 'bold',
    width: 'fit-content',
  },
  media: {
    height: 300,
    borderRadius: '20px 20px 0 0',
    backgroundColor: 'black',
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
  let bannerThumbnail = "";
  if (allCollabs){
      for(var i=0;i<allCollabs.length;i++){
        topCollabData.push({
          video: allCollabs[i].videos[0],
          title: allCollabs[i].title,
          link: '/collab/view',
          clap: allCollabs[i].claps,
          collabId: allCollabs[i].collabId,
          collabSize: allCollabs[i].userIds.length,
        });
      };
      bannerThumbnail = allCollabs[0].videos[0];
      console.log("This is banner")
      console.log(bannerThumbnail);
  }


  const banner =
    <Card onClick={(e)=>{
      history.push(
        {
          pathname:'/collab/view',
          state:{collabId:"2STQPpgbcBeOoOc1uwAl"
        }
      })}}>
      <CardActionArea>
        <Typography sx={styles.bannerTitle}>
          Collab of the week!
        </Typography>
        <video
          style={styles.media}
          src={bannerThumbnail}
          width="364px"
          autoPlay={true}
          muted
          loop
        />
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
    <>
      <CardList data={topCollabData} conSx={styles.homeCardList}></CardList>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>

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
