import React, { useState, useEffect } from 'react'
import { Button, Comment, Form } from 'semantic-ui-react'
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core'
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../Constant';
import { writeCommentToDatabase, getCommentFromCollabs, writeSubCommentToDatabase} from '../../contexts/DBContext'
import monkey from '../../assets/test/monkey.jpeg'

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
  },
};


const CommentExampleComment = ({classes, author, collabId}) => {
    const [cmtData, setCmtData] = useState([])
    const [message, setMessage] = useState("")
    const [reply, setReply] = useState(new Map())
    const [replies, setReplies] = useState([]);

    useEffect(() => {
      // setCollabId(state.collabId)
      let cmt = getCommentFromCollabs(collabId)
      cmt.then(cmt => setCmtData(cmt))
      console.log(cmtData)
    }, [])
    
    const handleReplyClick = (id) => 
    {
      if (replies.includes(id)) {
        const newReplies = replies.filter(e => e != id)
        setReplies(newReplies)
      }
      else setReplies([...replies, id])
    }

    const makeCommentCard = (comment) => {
      return (
      <Comment>
      <Comment.Avatar src={comment.author.img} />
      <Comment.Content>
        <Comment.Author as='a' className={classes.author}>{comment.author.name}</Comment.Author>
        <Comment.Metadata  className={classes.smallText}><span>{'2 mins ago'}</span></Comment.Metadata>
        <Comment.Text className={classes.mainText}>{comment.text}</Comment.Text>
        <Comment.Actions onClick = {e => handleReplyClick(comment.id)}>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
        <Form reply style={{display: replies.includes(comment.id) ? 'block' : 'none' }} 
              onSubmit = {e => handleReplySubmit(e, comment)}>
              <Form.TextArea style={{ maxHeight: 80 }} 
                    onChange= {e => {
                        reply[comment.id] = e.target.value
                        setReply(reply)
                    }}
                    value = {reply[comment.id]}
              />
              <Button variant="contained" className={classes.submitBtn} size="small">
                  <Typography className={classes.btnText} variant="body2"> Submit </Typography>
              </Button>
          </Form>
      </Comment.Content>
      {
          comment.subComment && comment.subComment.length > 0 
          ?   <Comment.Group>
                  {comment.subComment.map(makeCommentCard)}
              </Comment.Group>
          : null
      }
      </Comment>
    );
    }
    
    const handlePost = () => {
      const id = writeCommentToDatabase({
        author: author,
        text: message,
        time: Date.now(),
      }, collabId)
      setCmtData([...cmtData, {
        author: {name: author, img: monkey},
        text: message,
        time: Date.now(),
        id: id,
      }])
      setMessage('')
    }
    const handleReply = (comment) => {
      const id = writeSubCommentToDatabase({
        author: author,
        text: reply[comment.id],
        time: Date.now(),
      }, comment.id)
      if (!comment.subComment) comment.subComment = []
      comment.subComment = [...comment.subComment, {
        author: {name: author, img: monkey},
        text: reply[comment.id],
        time: Date.now(),
        id: id,
      }]
      setCmtData([... cmtData])
    }
    
    const handleReplySubmit = (e, comment) => {
      let text = reply[comment.id]
      setReply(text)
      console.log(reply)  
      handleReply(comment)
      reply[comment.id] = ''
      setReply(reply)
      handleReplyClick(comment.id)
    }
    return (
    <Comment.Group threaded>
        <Typography className={classes.title}>Comment</Typography>
        {cmtData.map(makeCommentCard)}
        <Form reply>
          <Form.TextArea style={{ maxHeight: 80 }} value = {message} onChange={e => setMessage(e.target.value)}/>
          <Button variant="contained" className={classes.submitBtn} size="small" onClick={handlePost}>
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
