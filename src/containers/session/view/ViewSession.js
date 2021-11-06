import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../../Constant';
import Navbar from '../../../components/shared/Navbar';
import testImg from '../../../assets/test/test_img.png'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import TruncateMarkup from "react-truncate-markup";

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

function ViewSession({ classes }) {
  const [showMore, setShowMore] = React.useState(true);
  const mainCover = 
		{
			img: testImg,
			title: 'this is session'
		};


  const tileData = [
		{
			img: testImg,
			title: 'this is a jam'
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
			title: 'another jam'
		},
	];

  const title = 
    <Grid container alignItems="center" justifyContent="center">
      <Grid item>
        <Typography className={classes.title}>CARPE DIEM</Typography>
      </Grid>
    </Grid>

  const cover =             
    <GridListTile key={mainCover.img} classes={{ root: classes.coverRoot, tile: classes.cover }}>
      <img src={mainCover.img} alt={mainCover.cover}/>
      <GridListTileBar className={classes.coverTitle}/>
    </GridListTile>

  const dropZone =
    <div className={classes.dropzone}>
      <AddCircleOutlineOutlinedIcon className={classes.addIcon} />
      <Typography className={classes.addText}>Upload video</Typography>
    </div>

  const sessionTitle = 
    <Grid item>
      <Typography className={classes.sessionTitle}>John - 69K views - 6 days ago</Typography>
    </Grid>

  const description = <Typography className={classes.sessionSubtitle}>Yo, make sure to check out my soundcloud on the Spotify haha</Typography>

  const sessionSubtitle = 
    <Grid item>
      {showMore
        ? <TruncateMarkup lines = {1}>{description}</TruncateMarkup>
        : description}    
    </Grid>

  const showMoreLink =
      <Grid item className={classes.readMoreBox}>
        <a className={classes.readMore} onClick={() => setShowMore(!showMore)}>
          Show {showMore ? "more" : "less"}
        </a>
      </Grid>
  
  const header = 
    <Grid container alignItems="center" justifyContent="center">
      <Grid item>
        <Typography className={classes.sessionHeading}>Collabs for this session</Typography>
      </Grid>
    </Grid>

  const drawTile = (tile) => (
    <GridListTile key={tile.img} classes={{ root: classes.tileRoot, tile: classes.tile }}>
      <img src={tile.img} alt={tile.title} />
      <GridListTileBar className={classes.tileTitle} title={tile.title}/>
    </GridListTile>
  )

  const row = 
    <div className={classes.gridListWrapper}>
      <GridList className={classes.gridList} cols={2.5}>
        {tileData.map(drawTile)}
      </GridList>
    </div>

  const rows = [row, row, row, row];

  return (
    <>
      {title}
      <div className={classes.gridListWrapper}>
        <GridList className={classes.gridList} cols={2}>
            {cover}
            {dropZone}
        </GridList>
        <Grid container xs={10} alignItems="center" justifyContent="flex-start">
          {sessionTitle}
          {sessionSubtitle}
          {showMoreLink}
        </Grid>
      </div>
      
      {header}
      {rows}

      <Navbar />
    </>
  );
}

export default withStyles(styles)(ViewSession);
