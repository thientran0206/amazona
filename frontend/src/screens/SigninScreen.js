import React ,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import {useSelector , useDispatch} from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinkStyle from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { signin } from '../actions/userActions';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <LinkStyle color="inherit" href="https://material-ui.com/">
          Amazona
        </LinkStyle>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function SigninScreen(props){
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const {loading ,userInfo,error} = userSignin;
    const dispatch = useDispatch();
    const redirect = props.location.search?props.location.search.split("=")[1]:'/';
    const classes = useStyles();
    useEffect(() =>{
       if(userInfo){
           props.history.push(redirect);
       }
        return () =>{
            //
        };
    },[userInfo])

const submitHandler =(e)=>{
    e.preventDefault();
    dispatch(signin(email,password));
}

return (
    <Container component="main" maxWidth="xs">
      
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h3">
          Sign in
        </Typography>
        <div>
               {loading && <div>Loading...</div>}
               {error && <div>Email or Password is not correct,please try again</div>}
        </div>
        <form className={classes.form} noValidate onSubmit={submitHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            size ="medium"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <LinkStyle href="#" variant="body2">
                Forgot password?
              </LinkStyle>
            </Grid>
            <Grid item>
              <LinkStyle href="#" variant="body2">
                <Link to={redirect === "/"? "register" : "register?redirect="+redirect}>{"Don't have an account? Sign Up"}</Link>
              </LinkStyle>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
export default SigninScreen;