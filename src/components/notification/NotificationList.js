import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../Constant';
import TruncateMarkup from "react-truncate-markup";

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
  },
  content: {
    margin: 'auto',
    // flex: '1 0 auto',
    width: '95%',
    marginRight: 15,
  },
  cover: {
    // width: '26%',
    // padding: 10,
    height: 60,
    width: 60,
    margin: 'auto',
    borderRadius: 90,
    backgroundColor: TERTIARY_COLOR,
    border: '1px solid rgba(0, 0, 0, 0.1)',
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
    fontSize: 10,
    margin: 'auto',
    color: '#abb8c3'
  },
  timeStamp:{
    margin: 'auto',
  }
}));


const MediaControlCard = ({text, data}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Card className={classes.root}>
      <Grid className={classes.details} xs={3}>
        <CardMedia
          component='video'
          className={classes.cover}
          image={data.video}
          title="Live from space album cover"
        />
      </Grid>
      <Grid className={classes.content} xs={8}>
        <TruncateMarkup lines = {3}>
          <Typography component="h10" variant="h10">
            {text}
          </Typography>
        </TruncateMarkup>
      </Grid>
      <Grid xs={1} className={classes.timeStamp}>
        <Typography className={classes.sectionTime}> {Math.floor(Math.random() * 60) + 1}m </Typography>
      </Grid>
    </Card>
  );
}

const NotificationList = ({classes, data, section, notifPage}) => {
  const drawTile = (data) => {
    const link =  {pathname: '/collab/preview', state: data}
    const text =
      section === "In progress"
        ? notifPage === 'inReq'
          ? <div> The jam <span style={{fontWeight: 'bold', fontStyle: 'italic'}}>{data.title}</span> has a pending requests from <span style={{fontWeight: 'bold'}}>{data.requesterName}</span>: "{data.message}") </div>
          : <div> The request you sent to the jam <span style={{fontWeight: 'bold', fontStyle: 'italic'}}>{data.title}</span> is under review </div>
        : notifPage === 'inReq'
          ? <div> The request for jam <span style={{fontWeight: 'bold', fontStyle: 'italic'}}>{data.title}</span> from <span style={{fontWeight: 'bold'}}>{data.requesterName}</span> has been {data.status} </div>
          : <div> Your request for jam <span style={{fontWeight: 'bold', fontStyle: 'italic'}}>{data.title}</span> has been {data.status} </div>

    return (
      <Link to={link} style={{ textDecoration: 'none' }}>
        <Grid item xs={12}>
          <MediaControlCard text = {text} data={data}></MediaControlCard>
        </Grid>
      </Link>
    )
  }
 // const descr = section === "In progress"
 // ? notifPage === 'inReq'
 //   ? `You have awaiting contributions for these jams`
 //   : `You have awaiting requests for approval for these jams`
 // : notifPage === 'outReq'
 //   ? `These are the results of your requests for following jams`
 //   : `These jams are about to be concluded when others approve`

  return (
    <>
      <Typography variant='body1' className={classes.sectionHeading}>{section}</Typography>
      {/* <Typography className={classes.sectionDesc}> {descr} </Typography>   */}
      <div className={classes.gridListWrapper}>
        <Grid className={classes.gridList} xs={12} spacing={2} direction='column'>
          {data.map(drawTile)}
        </Grid>
      </div>
    </>
  )
}

export default withStyles(styles)(NotificationList);
