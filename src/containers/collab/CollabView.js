import React from 'react';
import { PRIMARY_COLOR } from '../../Constant';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import testImg from '../../assets/test/test_img.png';
import YoutubeEmbed from '../../components/shared/YoutubeEmbed';

const styles = {
  hud: {
    height: '16%',
    width: '100%',
    background: `linear-gradient(#00000000,${PRIMARY_COLOR} 40%)`,
    bottom: 0,
    position: 'absolute',
  },
};

function CollabView({ videoId }) {
  return (
    <>
      <YoutubeEmbed embedId="6mYw53V9RGM?autoplay=1" w="853" h="480" />
      <div className={styles.hud}>
      </div>
    </>
  );
}

export default CollabView;
