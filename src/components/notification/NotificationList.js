import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { PRIMARY_COLOR, TERTIARY_COLOR } from '../../Constant';

const styles = {
  sectionHeading: {
    fontSize: 20,
    color: PRIMARY_COLOR,
    paddingLeft: 16,
    padding: 10,
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
    marginLeft: 15,
  },
  tile: {
    minHeight: '30%',
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
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: `${TERTIARY_COLOR} !important`,
      color: PRIMARY_COLOR,
    },
    display: 'flex',
    // margin: '5px 0 5px 0',
    minHeight: '100px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
  },
  content: {
    flex: '1 0 auto',
    width: '90%',
  },
  cover: {
    width: '26%',
    height: 80,
    margin: 'auto',
    marginLeft: 15,
    borderRadius: 90,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));


const MediaControlCard = ({text, data}) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={data.img}
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content} alignItems='center'>
          <Typography component="h10" variant="h10">
            {text}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}

const NotificationList = ({classes, data, section}) => {
    const drawTile = (data) => {
      const text = data.receive 
        ? `You have an awaiting contribution for the collabs ${data.title}` 
        : data.accept 
          ? `Your contribution to ${data.title} has been approved. Now you are an owner of the collab.`
          : `Your contribution to ${data.title} has been declined.`
      const link = data.receive 
        ? '/collab/preview'
        : '/collab/view'
      return (
        <Link to={link} style={{ textDecoration: 'none' }}>         
          <Grid item xs={12}>
            <MediaControlCard text={text} data={data}></MediaControlCard>
          </Grid>
        </Link>
      )
  }
    
    return (
      <>
      <Typography variant='body1' className={classes.sectionHeading}>{section}</Typography>
      <div className={classes.gridListWrapper}>
        <Grid className={classes.gridList} xs={12} spacing={2} direction='column'>
          {data.map(drawTile)}
        </Grid>
      </div>
      </>
    )

}

export default withStyles(styles)(NotificationList);