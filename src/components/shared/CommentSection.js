import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import { withStyles } from '@material-ui/core/styles';
import {Typography, Grid, Hidden} from '@material-ui/core'
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../Constant';

const styles = {
    title: {
      fontSize: 30,
      fontWeight: 'bold',
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
    author: {
        color: `${PRIMARY_COLOR} !important`,
        '&:hover': {
            color: `black !important`,
          },  
    },
    smallText:{
        color: `${SECONDARY_COLOR} !important`,
    },
    mainText: {
        color: `${PRIMARY_COLOR} !important`,
    }

}  
const CommentExampleComment = ({classes, data}) => {
    const makeCommentCard = (comment) => (
        <Comment>
        <Comment.Avatar src={comment.author.img} />
        <Comment.Content>
          <Comment.Author as='a' className={classes.author}>{comment.author.name}</Comment.Author>
          <Comment.Metadata  className={classes.smallText}><span>{comment.time}</span></Comment.Metadata>
          <Comment.Text className={classes.mainText}>{comment.text}</Comment.Text>
          <Comment.Actions><Comment.Action>Reply</Comment.Action></Comment.Actions>
        </Comment.Content>
        {
            comment.subComment.length > 0 
            ?   <Comment.Group>
                    {comment.subComment.map(makeCommentCard)}
                </Comment.Group>
            : null
        }
      </Comment>
    );
    
    return (
    <Comment.Group threaded>
        <Typography className={classes.title}>Comment</Typography>
        {data.map(makeCommentCard)}
        <Form reply>
        <Form.TextArea style={{ maxHeight: 80 }}/>
        <Button variant="contained" className={classes.submitBtn} size="small">
            <Typography className={classes.btnText} variant="body2"> Submit </Typography>
        </Button>
        </Form>
        <br/>
        <br/>
        <br/>
    </Comment.Group>
    )
}

export default withStyles(styles)(CommentExampleComment)
