import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@mui/material/Grid';

const styles = {
  gridList: {
    overflow: 'scroll',
  },
};

const CardList = (props) => {
  const {
    classes,
    data,
    displayCols,
    link,
    offsetMid,
  } = props;

  const drawTile = (data) => (
    <Grid item xs={3} className={classes.gridItem}>
      <Link to={link} style={{ textDecoration: 'none' }}>
        <img src={data.img} alt={data.title}/>
      </Link>
    </Grid>
  );

  return (
    <Grid container direction="row" className={classes.gridList} cols={displayCols}>
      {data.map(drawTile)}
    </Grid>
  )
}

export default withStyles(styles)(CardList);
