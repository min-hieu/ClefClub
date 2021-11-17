import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../../Constant';
import Navbar from '../../../components/shared/Navbar';
import testImg from '../../../assets/test/test_img.png'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import CardList from '../../../components/shared/CardList';
import CollapsibleDescription from '../../../components/shared/CollapsibleDescription';
import CommentExampleComment from '../../../components/shared/CommentSection';
import { Container, Header, List } from "semantic-ui-react";

const styles = {
  main: {
    margin: '50px 35px 20px 35px',
    height: 400,
    width: 310,
    overflow: 'auto',
    position: 'absolute',
    transform: 'translate(-50%, 0)',
    left: '50%',
    bottom: 20,
  },
    submitBtn: {
    textTransform: 'none !important',
    color: `black !important`,
    backgroundColor: `${SECONDARY_COLOR} !important`,
    '&:hover': {
      backgroundColor: `${TERTIARY_COLOR} !important`,
      color: `${PRIMARY_COLOR} !important`,
    },
  },
}

const Matt = {
  name: 'Matt',
  img: 'https://react.semantic-ui.com/images/avatar/small/matt.jpg'
}
const Elliot = {
  name: 'Elliot',
  img: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg'
}
const Jenny = {
  name: 'Jenny',
  img: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg'
}
const Joe = {
  name: 'Joe',
  img: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg'
};
const commentData = [
  {
    author: Matt,
    time: 'Today at 5:42PM',
    text: 'How artistic!',
    subComment: []
  },
  {
    author: Elliot,
    time: 'Today at 5:42PM',
    text: 'This has been very useful for my research. Thanks as well!',
    subComment: [
      {
        author: Jenny,
        time: 'Just now',
        text: 'Elliot you are always so right :)',
        subComment: []
      },
    ]
  },
  {
    author: Elliot,
    time: 'Today at 5:42PM',
    text: 'Dude, this is awesome!',
    subComment: [
      {
        author: Matt,
        time: 'Just now',
        text: 'Thank a bunch :)',
        subComment: []
      },
    ]
  },

]

function ViewSession({ sx }) {

  const mainStyle = sx ? sx : styles.main

  return (
    <div className={mainStyle}>
      <Container style={ styles.main }>
        <CommentExampleComment data = {commentData}></CommentExampleComment>
      </Container>
    </div>
  );
}

export default ViewSession;
