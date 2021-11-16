import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

const styles = {
  videoResponsive: {
    overflow: 'hidden',
    paddingBottom: '56.25%',
    position: 'relative',
    height: 0,
  },
  
  videoResponsiveIframe: {
    left: 0,
    top: 0,
    maxHeight: '100%',
    maxWidth: '99.9%',
    position: 'absolute',
  },  
}
const YoutubeEmbed = ({classes, embedId, w, h }) => (
  <div className={classes.videoResponsive}>
    <iframe
      className={classes.videoResponsiveIframe}
      width={w}
      height={h}
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default withStyles(styles)(YoutubeEmbed);
