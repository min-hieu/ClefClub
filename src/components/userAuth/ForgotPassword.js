import React, { useRef, useState } from "react"
import { withStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@material-ui/core/Typography';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from "../../Constant";
import Alert from '@mui/material/Alert';
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { db } from "../../firebase"
import Navbar from "../shared/Navbar"

const styles = {
  main: {
    margin: '50px 35px 20px 35px',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '& .MuiTextField-root': {
      width: '300px',
    },
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  login: {
    color: PRIMARY_COLOR
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

const FancyTextField = styled(TextField)({
  '& label.MuiInputLabel-root': {
    color: PRIMARY_COLOR,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: PRIMARY_COLOR,
  },
  
  '& .MuiOutlinedInput-root': {
    backgroundColor: TERTIARY_COLOR,
    '& fieldset': {
      borderColor: TERTIARY_COLOR,
      borderBottomColor: SECONDARY_COLOR,
    },
    '&:hover fieldset': {
      borderColor: SECONDARY_COLOR,
    },
    '&.Mui-focused fieldset': {
      borderColor: PRIMARY_COLOR,
    },
  },
});

function ForgotPassword({classes}) {
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState('');

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(email)
      setMessage("Please check your email's inbox")
    } catch {
      setError("Please type your email correctly")
    }

    setLoading(false)
  }
  const title = <Typography className={classes.title}>Reset password</Typography>
  const emailField =
      <FancyTextField
        label="Email"
        variant="outlined"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
  const submitBtn = 
    <Link to='/profile' style={{ textDecoration: 'none' }}>         
      <Button variant="contained" className={classes.submitBtn} onClick = {handleSubmit}>
        <Typography className={classes.btnText}> Reset password </Typography>
      </Button>
    </Link>

  const signup = 
    <Typography className={classes.signup} >
      Need an account? <Link to="/signup">Sign Up</Link>
    </Typography>

  const login = 
    <Typography className={classes.signup} >
      <Link to="/login">Log in </Link>
    </Typography>

    return (
    <div className={classes.main}>
      {title}
      <Box
        component="form"
        sx={{'& > :not(style)': { m: 1 }}}
        className={classes.root}
      >
        {emailField}
        {submitBtn}
        {error && <Alert severity="error">{error}</Alert>}
        {message && <Alert severity="success">{message}</Alert>}
        {login}
        {signup}
      </Box>
      <Navbar />     
    </div>
  )
}

export default withStyles(styles)(ForgotPassword)

  // return (
    // <>
      {/* <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </> */}
//   )
// }
