import React from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import flower0 from '../../assets/flower0.svg';
import flower1 from '../../assets/flower1.svg';
import flower2 from '../../assets/flower2.svg';
import flower3 from '../../assets/flower3.svg';
import flower4 from '../../assets/flower4.svg';
import flower5 from '../../assets/flower5.svg';

const styles = {
  container: {
    overflow: 'auto',
  },
  overlayTop: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 40%, rgba(0,0,0,0) 100%)',
  },
  overlayBottom: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 40%, rgba(0,0,0,0) 100%)',
    pointerEvents: 'none',
  },
  actionicon: {
    color: 'white',
  },
  icon: {
    width: 20,
    height: 20,
  }
};

const CardList = ({ data, conSx }) => {

  const history = useHistory();
  const goToLink = (link, cId) =>
    // history.push(link);
    history.push({pathname: link, state: {collabId: cId}})

  const drawTile = (item) => (
    <ImageListItem
      key={item.video}
      onClick={
        (e) => goToLink(item.link, item.collabId)}
    >
        <video
          // src={`${item.img}?w=248&fit=crop&auto=format`}
          // src={item.video}
          src={`${item.video}?w=248&fit=crop&auto=format`}
          srcSet={`${item.video}?w=248&fit=crop&auto=format&dpr=2 2x`}
          autoPlay
          tiny
          loop
          muted
          width="180px"
          // fluid
          alt={item.title}
          loading="lazy"
        />

        <ImageListItemBar
          sx={styles.overlayTop}
          title={item.title}
          position="top"
        />

        <ImageListItemBar
          sx={styles.overlayBottom}
          title=""
          position="bottom"
          actionIcon={
              <IconButton
                sx={styles.actionicon}
                aria-label={`star ${item.title}`}
              >

              {
                (item.clap == 0) ?
                  <img src={flower0} style={styles.icon}/>
                : (item.clap <= 2) ?
                  <img src={flower1} style={styles.icon}/>
                : (item.clap <= 4) ?
                  <img src={flower2} style={styles.icon}/>
                : (item.clap <= 9) ?
                  <img src={flower3} style={styles.icon}/>
                : (item.clap <= 19) ?
                  <img src={flower4} style={styles.icon}/>
                : <img src={flower5} style={styles.icon}/>
              }

              </IconButton>
            }
            actionPosition="left"
        />
    </ImageListItem>
  );

  const conStyle = conSx ? conSx : styles.container;

  return (
    <Box sx={ conStyle }>
      <ImageList variant="masonry" cols={2} gap={4} sx={{ margin: 0 }}>
        {data.map(drawTile)}
      </ImageList>
    </Box>
  );
}

export default CardList;
