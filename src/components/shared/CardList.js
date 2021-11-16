import React from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import ClapIcon from '../../assets/clap.svg';


const styles = {
  container: {
    overflow: 'auto',
    height: 375,
  },
  overlayTop: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  overlayBottom: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  actionicon: {
    color: 'white',
  }
};

const CardList = ({ data, conSx }) => {

  const history = useHistory();
  const goToLink = (link) =>
    history.push(link);

  const drawTile = (item) => (
    <ImageListItem key={item.img}>
        <img
          src={`${item.img}?w=248&fit=crop&auto=format`}
          alt={item.title}
          onClick={(e) => goToLink(item.link)}
        />
        <ImageListItemBar
          sx={styles.overlayBottom}
          title={item.clap}
          position="bottom"
          actionIcon={
              <IconButton
                sx={styles.actionicon}
                aria-label={`star ${item.title}`}
              >
                <img src={ ClapIcon } style={{ width:'20px', height:'20px' }}/>
              </IconButton>
            }
            actionPosition="left"
        />
        <ImageListItemBar
          sx={styles.overlayTop}
          title={item.title}
          position="top"
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
