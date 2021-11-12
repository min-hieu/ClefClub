import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../Constant';
import TruncateMarkup from "react-truncate-markup";

const styles = {
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


const CollapsibleDescription = ({classes, text}) => {
    const [showMore, setShowMore] = React.useState(true);
    const sessionTitle = 
      <Grid item>
        <Typography className={classes.sessionTitle}>John - 69K views - 6 days ago</Typography>
      </Grid>

    const descriptionText = <Typography className={classes.sessionSubtitle}>{text}</Typography>

    const sessionSubtitle = 
        <Grid item>
        {showMore
          ? <TruncateMarkup lines = {1}>{descriptionText}</TruncateMarkup>
          : descriptionText}    
        </Grid>

    const showMoreLink =
      <Grid item className={classes.readMoreBox}>
        <a className={classes.readMore} onClick={() => setShowMore(!showMore)}>
          Show {showMore ? "more" : "less"}
        </a>
      </Grid>

    return ( <Grid container xs={10} alignItems="center" justifyContent="flex-start">
      {sessionTitle}
      {sessionSubtitle}
      {showMoreLink}
    </Grid>
    )

}

export default withStyles(styles)(CollapsibleDescription);