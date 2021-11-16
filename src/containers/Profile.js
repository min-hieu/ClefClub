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

const styles = {
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10,
  },
	media: {
    height: 200,
		borderRadius: '10px',
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
	coverTitle: {
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
	coverRoot: {
		marginLeft: 10,
	},
	cover: {
		borderRadius: '10px 0 0 10px',
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
		marginLeft: 10,
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
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  dropzone: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: '0px 10px 10px 0px',
    borderColor: PRIMARY_COLOR,
    borderStyle: 'dashed',
    backgroundColor: TERTIARY_COLOR,
    color: SECONDARY_COLOR,
    outline: 'none',
    transition: 'border .24s ease-in-out',
    maxHeight: 171,
    justifyContent: 'center',
    marginLeft: -2,
  },
  addIcon: {
    color: PRIMARY_COLOR,
    fontSize: 54,
  },
  addText: {
    fontSize: 15,
  },
  sessionTitle: {
    color: PRIMARY_COLOR,
    margin: '5px 0 0 0',
  },
  sessionSubtitle: {
    color: 'grey',
    margin: '2px 0 0 0',
    fontSize: 12,
  },
  readMoreBox: {
    marginTop: -5,
  },
  readMore: {
    color: "black", 
    cursor: "pointer",
    fontSize: 12,
  }
};

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

function Profile({ classes }) {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [userCollabs, setUserCollabs] = useState()
  
  
  useEffect(() => {
    let collabs = getUserCollabs (currentUser.email);
    const settingCollabs = collabs.then(collabs => {
      setUserCollabs(collabs)
    })
    
    return settingCollabs
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


  const title = 
<Grid container alignItems="center" justifyContent="center">
  <Grid item>
    <Typography className={classes.title}>{currentUser.email}</Typography>
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



  return (
    <>
      <br/>
      <br/>
      <br/>
      <br/>
    <Card>
      <Card.Body>
      {title}
      
      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                Update Profile
          </Link>
        </Grid>
      </Grid>

      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          <Link to="/login" onClick={handleLogout} className="btn btn-primary w-100 mt-3">
                Log Out
          </Link>
        </Grid>
      </Grid>

      <div> 
        <h1 center>Your jams</h1>
      {elements}
      </div>

      </Card.Body>
		</Card>
      <Navbar />

    </>
  );
}

export default withStyles(styles)(Profile);
