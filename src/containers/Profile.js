import React from 'react';
import { TERTIARY_COLOR } from '../Constant';
import Navbar from '../components/shared/Navbar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CollabHeading from '../components/shared/CollabHeading';
import CardList from '../components/shared/CardList';
import testImg from '../assets/test/test_img.png';

const styles = {
  profile: {
    margin: '0 auto',
    marginTop: 3,
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
};

function Profile(props) {
  const {
    name,
    picture,
    collabs
  } = props

  const topCollabData = [
    {   img: testImg,
      title: 'this is a jam'},
    {   img: testImg,
      title: 'this is a jam'},
    {   img: testImg,
      title: 'this is a jam'},
    {   img: testImg,
      title: 'this is a jam'},
  ]

  var offset = {
    transform: 'translate(0,110%)',
  }

  const topCollabs = <CardList
    data={topCollabData}
    displayCols={2.5}
    link={'./collab/view'}
    customStyle={[1,1]}
  ></CardList>

    return (
      <div>
        <Grid container sx={styles.profile}>
          <Grid item xs={8}>
            <Typography variant="h1" sx={styles.name}>{name}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Avatar sx={styles.avatar} alt={ name } src={ picture }/>
          </Grid>
        </Grid>

        <div>
          <CollabHeading text="Your Previous Collab"/>
        </div>
        {topCollabs}

        <Navbar />
      </div>
    );
}

export default Profile;
