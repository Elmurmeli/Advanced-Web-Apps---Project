import React, { useEffect } from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';




const SubmitComment = ({jwt, user}) => {
  const [post, setPost] = useState({})
  const [data, setData] = useState([])
  const [commentData, setCommentData] = useState([]) 
  const [comment, setComment] = useState({})
  const [open, setOpen] = React.useState(false);
  const [id, setID] = useState({})
  

  //Open function for the modal
  const handleOpen = (id) => {setOpen(true)
    setID(id)};
    //Closing function for the modal
  const handleClose = () => setOpen(false);

  // Submit function for submitting posts
  const submit= (e) => {
    e.preventDefault();

   const newPost = {
        user: user.username,
        post: e.target.post.value,

    };
    fetch(`/api/submitpost/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost),
        mode: "cors"
    })
    
  }

  //Handle changes when post input changes
  const handlePost = (e) => {
  setPost({...post, [e.target.postInput]: e.target.value})

  }


  //Using useEffect to fetch posts from the database

  useEffect(() => {
    fetch(`/api/posts/`)
      .then(response => response.json())
      .then(json => setData(json)) 
      .catch(err => console.log(err))
  }, [])

  //UseEffect for fetching comments from the database
  useEffect(() => {
    fetch(`/api/comments/`)
      .then(response => response.json())
      .then(json => setCommentData(json)) 
      .catch(err => console.log(err))
  }, [])
  

  // Comments
  //styles for the modal
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 4,
  };


  // Submit function for submitting the comments
  const submitComment= (e) => {
    e.preventDefault();

   const newComment= {
        user: user.username,
        postid: id,
        comment: e.target.comment.value,
    };
    console.log(newComment)
    fetch(`/api/submitcomment/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newComment),
        mode: "cors"
    })
  }
  // Just tells if the button has been clicked
  const click= () =>{
    console.log("Button clicked")
  }

  const handleComment = (e) => {
    setComment({...comment, [e.target.comment]: e.target.value})
    //setPostID({postid: e.target.id})
    }


  return (
    
    <div>
      
        {!jwt ? <h3>You should Log in to post and comment </h3>: ""}
        <h3>Here is a list of posts:</h3>
        <Container maxWidth="mx" >
        <Paper elevation={24}>

          {data.map((item) => (
            <Box key={item._id} component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)', minWidth: 275 }}>

            <Card key={item._id}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Post
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {item.user} posted:
              </Typography>

              <br></br>
              {item.post}

              <CardActions>
                <Button key={item._id} onClick={() =>handleOpen(item._id)} size="big" id={item._id}>Comments</Button>
              </CardActions>

            </Card> 
            
            </Box>
            
          ))}

        
        
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <form  onSubmit={submitComment} onChange={handleComment}>
              <>

                <Box sx={style}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Comments:
                </Typography>
                {commentData.map((comment) =>(
                  comment.postid === id ? (
                    <Typography color="text.primary" key={comment.comment}>
                      {comment.user} commented:
                      {comment.comment}
                    </Typography> 
                    ):""
                ))}
                {jwt ?<>
                <TextField  type="comment" name='comment' label="Write your Comment" variant="outlined"/>

                <br></br>

                
                <Button onClick={click} variant="contained" endIcon={<SendIcon />} style={{padding:5}} color='success' type="submit" value="submit" id='submitComment'>
                  POST
                </Button>
                </> : ""}
                <br></br>
                <Button color='error' onClick={handleClose}>Close Comments</Button>
                </Box>
              </>
              </form>
            </Modal>



        
          </Paper>
        </Container>
        {jwt ? <>
        <form onSubmit={submit} onChange={handlePost} >
        <Container maxWidth="xs" >
            <Paper elevation={24}>
                <h1>Post here</h1>
                <br></br>
          <TextField type="text" name='post' id="postInput" label="Write your code snippet" variant="outlined"/>
          <br/>
          <Button variant="contained" endIcon={<SendIcon />} style={{padding:5}} color='success' type="submit" value="submit" id='submit'>
            POST
          </Button>
          <br/>
          <br/>
          
          </Paper>
        </Container>
        
        </form></>  : ""}

    </div>
  )
}

export default SubmitComment
