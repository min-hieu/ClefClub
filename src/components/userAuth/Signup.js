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
  link: {
    color: PRIMARY_COLOR,
    '&:hover': {
      color: SECONDARY_COLOR
    }
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

function Signup({classes}) {
  const { signup } = useAuth()
  const history = useHistory()

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [name, setName] = React.useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cfPassword, setcfPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault()
    if (! (password && cfPassword && name && email)) {
      return setError("Please enter all required fields")
    }

    if (password !== cfPassword) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(email, password)
      history.push("/")
      db.collection("users").doc(email).set({
        nickname: name,
        email: email,
        sessions: [],
      });
    } 
    catch {
      setError("Please use the correct email and make a safe password")
    }

    setLoading(false)
  }

  const title = <Typography className={classes.title}>Sign up</Typography>
  const nameField =
    <FancyTextField
      label="First Name"
      variant="outlined"
      required
      value={name}
      onChange={e => setName(e.target.value)}
    />;
  const emailField =
      <FancyTextField
        label="Email"
        variant="outlined"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
  const pwField1 = 
    <FancyTextField
      label="Password"
      variant="outlined"
      type="password"
      required
      value={password}
      onChange={e => setPassword(e.target.value)}
    />
  const pwField2 = 
    <FancyTextField
      label="Confirm Password"
      variant="outlined"
      type="password"
      required
      value={cfPassword}
      onChange={e => setcfPassword(e.target.value)}
    />
  const submitBtn = 
    // <Link to='/profile' style={{ textDecoration: 'none' }}>         
      <Button variant="contained" className={classes.submitBtn} onClick = {handleSubmit}>
        <Typography className={classes.btnText}> Sign up </Typography>
      </Button>
    // </Link>
  const login = 
    <Typography className={classes.login} >
      Already have an account? <Link to="/login" className={classes.link}>Log In</Link>
    </Typography>

    return (
    <div className={classes.main}>
      {title}
      <Box
        component="form"
        sx={{'& > :not(style)': { m: 1 }}}
        className={classes.root}
      >
        {nameField}
        {emailField}
        {pwField1}
        {pwField2}
        {submitBtn}
        {error && <Alert severity="error">{error}</Alert>}
        {login}
      </Box>
      <Navbar />     
    </div>
  )
}

export default withStyles(styles)(Signup)