import React, { useState } from "react"
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
    // padding: spacing(2),

    '& .MuiTextField-root': {
      // margin: spacing(1),
      width: '300px',
    },
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  signup: {
    color: PRIMARY_COLOR
  },
  link: {
    color: PRIMARY_COLOR,
    '&:hover': {
      color: SECONDARY_COLOR
    }
  },
  submitBtn: {
    textTransform: 'none !important',
    borderRadius: '16px',
    color: `${PRIMARY_COLOR} !important`,
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


function Login({classes}) {
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await login(email, password)
      history.push("/")
    } 
    catch {
      setError("Email and password does not match")
    }
    setLoading(false)
  }

  const title = <Typography className={classes.title}>Log in</Typography>
  const emailField =
      <FancyTextField
        label="Email"
        variant="outlined"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
  const pwField = 
    <FancyTextField
      label="Password"
      variant="outlined"
      type="password"
      required
      value={password}
      onChange={e => setPassword(e.target.value)}
    />
  const submitBtn = 
    <Link to='/profile' style={{ textDecoration: 'none' }}>         
      <Button variant="contained" className={classes.submitBtn} onClick = {handleSubmit} disabled={loading}>
        <Typography className={classes.btnText}> Login </Typography>
      </Button>
    </Link>
  const signup = 
    <Typography className={classes.signup} >
      Need an account? <Link to="/signup" className={classes.link}>Sign Up</Link>
    </Typography>
  const forget = 
    <Typography className={classes.signup} >
      <Link to="/forgot-password" className={classes.link}>Forgot Password?</Link>
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
        {pwField}
        {submitBtn}
        {error && <Alert severity="error">{error}</Alert>}
        {signup}
        {forget}
      </Box>
    </div>
  )
}

export default withStyles(styles)(Login)
