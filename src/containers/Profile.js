import React, { useState } from 'react';
import { PRIMARY_COLOR,SECONDARY_COLOR,TERTIARY_COLOR } from '../Constant';
import Navbar from '../components/shared/Navbar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CollabHeading from '../components/shared/CollabHeading';
import CardList from '../components/shared/CardList';
import testImg1 from '../assets/test/test_img.png';
import testImg2 from '../assets/test/jam.jpeg';
import testImg3 from '../assets/test/jam2.jpeg';
import testImg4 from '../assets/test/jam69.jpeg';
import testImg5 from '../assets/test/jam1.jpeg';
import testImg6 from '../assets/test/jam4.jpeg';
import testImg7 from '../assets/test/jam5.jpeg';
// mine
import React, { useContext, useState, useEffect } from "react"
import { withStyles } from '@material-ui/core/styles';
import Navbar from '../components/shared/Navbar';
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../Constant';
import testImg from '../assets/test/test_img.png'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import CardList from '../components/shared/CardList';
import CollapsibleDescription from '../components/shared/CollapsibleDescription'
import { Card, Button, Alert } from "react-bootstrap"
import { getUserCollabs } from "../contexts/DBContext"
import { getUserInfo } from "../contexts/AuthContext"


const styles = {
  profile: {
    margin: '0 auto',
    marginTop: 8,
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
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 1.5,
  },
  collabs: {
    textAlign: 'center',
    fontSize: 15,
    color: PRIMARY_COLOR,
  },
  titleBar: {
    margin: '2vh 0',
  },
  title: {
    textAlign: 'center',
    borderRadius: '16px',
    width: 'fit-content',
    padding: '3px 9px',
    margin: '0 auto',
    color: SECONDARY_COLOR,
    userSelect: 'none',
    '&:hover': {
      color: PRIMARY_COLOR,
      background: SECONDARY_COLOR,
      cursor: 'pointer',
    },
  },
  titleActive: {
    textAlign: 'center',
    borderRadius: '16px',
    width: 'fit-content',
    padding: '3px 9px',
    margin: '0 auto',
    color: 'white',
    background: PRIMARY_COLOR,
    userSelect: 'none',
  },
};

// mine
class CardVideo extends React.Component {   
  render() {
      return (
          <div> 
          <h2>{ this.props.value.title }</h2>
          <h4>{ this.props.value.description }</h4>
          <h4>Number of claps: { this.props.value.likes }</h4>
          <video controls className="uploadedVideo" src={this.props.value.videos[0] } alt="firebase-video" />

          </div>
      );
  }
}

function Profile(props) {
  const {
    name,
    picture,
    collabs,
  } = props

  // mine
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [userCollabs, setUserCollabs] = useState()
  const [userInfo, setUserInfo] = useState()
  

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

  const clapData = [
    {   img: testImg1,
      title: 'you clapped this',
       link: '/collab/view'},
    {   img: testImg3,
      title: 'you clapped this',
       link: '/collab/view'},
    {   img: testImg5,
      title: 'you clapped this',
       link: '/collab/view'},
    {   img: testImg1,
      title: 'you clapped this',
       link: '/collab/view'},
    {   img: testImg7,
      title: 'you clapped this',
       link: '/collab/view'},
  ]

  const [showCollabs, setShowCollabs] = React.useState(true);
  const [showClaps, setShowClaps] = React.useState(false);

// mine
  useEffect(() => {
    let collabs = getUserCollabs (currentUser.email);
    const settingCollabs = collabs.then(collabs => {
      setUserCollabs(collabs)
    })

    let user = getUserInfo (currentUser.email);
    console.log("Found a user:\n",user)
    const setInfo = user.then(user => {
      setUserInfo (user)
    })
    
    return settingCollabs , setInfo
  }, [])


  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  (userInfo) ? console.log("Nickname:\n",userInfo.nickname) : console.log("nothing");

  const title = 
  <Grid container alignItems="center" justifyContent="center">
  <Grid item>
    <Typography className={classes.title}> {(userInfo) ? userInfo.nickname : "nothing"}</Typography>
  </Grid>
  </Grid>

  console.log("User collabs:\n",userCollabs);
  var elements=[];
  if (userCollabs){
    console.log("User collabs length:\n",userCollabs.length);
      for(var i=0;i<userCollabs.length;i++){
    // push the component to elements!
    // console.log(userCollabs[i] );
    elements.push(<CardVideo value={ userCollabs[i] } />);
  }
  }

//   <Card>
//   <Card.Body>
//   {title}
  
//   <Grid container alignItems="center" justifyContent="center">
//     <Grid item>
//       <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
//             Update Profile
//       </Link>
//     </Grid>
//   </Grid>

//   <Grid container alignItems="center" justifyContent="center">
//     <Grid item>
//       <Link to="/login" onClick={handleLogout} className="btn btn-primary w-100 mt-3">
//             Log Out
//       </Link>
//     </Grid>
//   </Grid>

//   <div> 
//     <h1 center>Your jams</h1>
//   {elements}
//   </div>

//   </Card.Body>
// </Card>

  return (
    <div>
      <Grid container sx={styles.profile}>
        <Grid item xs={8} container direction="column" justifyContent="center">
          <Grid item>
            <Typography variant="h1" sx={styles.name}>{name}</Typography>
          </Grid>
          <Grid item>
            <Typography sx={styles.collabs}>{`${collabs} `}jams</Typography>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Avatar sx={styles.avatar} alt={ name } src={ picture }/>
        </Grid>
      </Grid>

      <Grid container sx={styles.titleBar}>
        <Grid item xs={6}>
          <Typography sx={ showCollabs ? styles.titleActive : styles.title }
          onClick={(e) => {setShowClaps(false);setShowCollabs(true)}}>
            Previous Jams
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            sx={ showClaps ? styles.titleActive : styles.title }
            onClick={(e) => {setShowClaps(true);setShowCollabs(false)}}
          >
            Claps
          </Typography>
        </Grid>
      </Grid>

      { showCollabs ? <CardList data={topCollabData}/> : null }
      { showClaps ? <CardList data={clapData}/> : null }

      <Navbar />
    </div>
  );
}

export default Profile;
