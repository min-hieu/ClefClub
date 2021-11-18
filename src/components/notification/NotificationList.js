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
import { PRIMARY_COLOR,SECONDARY_COLOR, TERTIARY_COLOR } from '../../Constant';

const styles = {
  sectionHeading: {
    fontSize: 20,
    color: PRIMARY_COLOR,
    paddingLeft: 16,
    padding: 10,
  },
 
  sectionDesc: {
    fontSize: 14,
    paddingLeft: 16,
    padding: 4,
    color: 'grey'
  },
  sectionUser: {
    fontSize: 14,
    paddingLeft: 16,
    padding: 4,
    color: PRIMARY_COLOR
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
    // width: '26%',
    // padding: 10,
    height: 60,
    width: 60,
    margin: 'auto',
    marginLeft: 15,
    marginTop: 15,
    borderRadius: 90,
    backgroundColor: PRIMARY_COLOR,
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
  subtitle: {
    fontSize: 14,
    color: SECONDARY_COLOR,
    paddingLeft: 16,
    paddingTop: 10,
    textAlign: 'center',
  },
  sectionDesc: {
    fontSize: 14,
    paddingLeft: 16,
    padding: 4,
    color: 'grey'
  },
  sectionUser: {
    fontSize: 16,
    paddingLeft: 16,
    padding: 4,
    color: PRIMARY_COLOR
  },
  sectionTime: {
    fontSize: 14,
    paddingLeft: 16,
    padding: 4,
    color: '#abb8c3'
  },
}));


const MediaControlCard = ({text, data}) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <div>
      <CardMedia
        component='video'
        className={classes.cover}
        image={data.video}
        title="Live from space album cover"
      />
      <Typography className={classes.subtitle}> {data.title} </Typography>
      </div>
      <div className={classes.details}>
       <CardContent className={classes.content} alignItems='center'> 
        <Typography className={classes.sectionUser}> From {data.requesterName}:</Typography>
        <Typography className={classes.sectionDesc}> "{data.message}" </Typography>
        <Typography className={classes.sectionTime}> {Math.floor(Math.random() * 60) + 1}m </Typography>
        
        </CardContent>
      </div>
    </Card>
  );
}

const NotificationList = ({classes, data, section, notifPage}) => {
    const drawTile = (data) => {
      const link =  {pathname: '/collab/preview', state: data}
      return (
        <Link to={link} style={{ textDecoration: 'none' }}>     
          <Grid item xs={12}>
            <MediaControlCard data={data}></MediaControlCard>
          </Grid>
        </Link>
      )
  }
        const descr = section == "In progress" 
        ? notifPage == 'inReq'
          ?`You have awaiting contributions for these jams`
          :`You have awaiting requests for approval for these jams`
        : notifPage == 'outReq'
          ? `These are the results of your requests for following jams`
          :`These jams are about to be concluded when others approve`
    return (
      <>
      <Typography variant='body1' className={classes.sectionHeading}>{section}</Typography>
      <Typography className={classes.sectionDesc}> {descr} </Typography>  
      <div className={classes.gridListWrapper}>
        <Grid className={classes.gridList} xs={12} spacing={2} direction='column'>
          {data.map(drawTile)}
        </Grid>
      </div>
      </>
    )

}

export default withStyles(styles)(NotificationList);