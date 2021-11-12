import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';


const styles = {
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
	offsetStart: {
		transform: 'translate(0,0)'
	},
	offsetMid: {
		transform: 'translate(50%,0)'
	},
};

const CardList = ({classes, data, displayCols, link, offsetFlag}) => {
		let offset = styles.offsetStart;
		if (offsetFlag) {
			offset = styles.offsetMid;
		}

    const drawTile = (data) => (
      <GridListTile sx={{offset}} key={data.img} classes={{ root: classes.tileRoot, tile: classes.tile }}>
        <Link to={link} style={{ textDecoration: 'none' }}>         
          <img src={data.img} alt={data.title}/>
          <GridListTileBar className={classes.tileTitle} title={data.title}/>
        </Link>     
      </GridListTile>
    );
    
    return (
      <div className={classes.gridListWrapper}>
        <GridList className={classes.gridList} cols={displayCols}>
          {data.map(drawTile)}
        </GridList>
      </div>
    )

}

export default withStyles(styles)(CardList);
