import React from "react";
import PropTypes from "prop-types";

const styles = {
  videoResponsive: {
    paddingBottom: '56.25%',
    position: 'relative',
    height: 0,
  },

  videoResponsiveIframe: {
    left: 0,
    top: 0,
    position: 'absolute',
  },
}

const YoutubeEmbed = ({ embedId, w, h, sx }) => {
  const videoWrapperStyle = sx ? sx : styles.videoResponsive
  return (
    <div style={videoWrapperStyle}>
      <iframe
        style={styles.videoResponsiveIframe}
        width={w}
        height={h}
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="Embedded youtube"
      />
    </div>
  )
}

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;
