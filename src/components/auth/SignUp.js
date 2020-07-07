import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {MenuItem,Select,InputLabel} from '@material-ui/core'

import { signUp } from '../../actions/auth';
import * as routes from '../Routes/routes';
import { useStyles } from './authStyles';
import Header from '../Header';
import FormButton from '../shared/FormButton';
import Link from '../shared/Link';

const SignUp = props => {
  const { authError, signUp, isLoading } = props;
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [school, setSchool] = useState('')

  const handleSubmit = e => {
    e.preventDefault();
    signUp({ firstName, lastName, email, password,school });
  };

  const handleSchoolChange = (e) =>{
    setSchool(e.target.value);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Header />
      <div className={classes.paper}>
        <Typography component="h1" variant="h6">
          Sign up
        </Typography>
        <div>{authError ? <p>{authError}</p> : null}</div>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="First Name"
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Last Name"
                type="text"
                value={lastName}
                onChange={e => setLastname(e.target.value)}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}justify="center">
              <InputLabel id="demo-simple-select-helper-label" required>School:</InputLabel>
              <Select 
                required
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                style={{marginTop:10,width:'100%',height:35}}
                
                value={school}
                onChange={handleSchoolChange}
              >
                <MenuItem value="" required><em>None</em></MenuItem>
                <MenuItem value={'Badlwin High School'}>Baldwin High School</MenuItem>
                <MenuItem value={'BotsIQ'}>BotsIQ</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </Grid>
          </Grid>
          
          <FormButton isLoading={isLoading} text="Create Account" />
          <Grid container justify="center">
            <Link to={routes.SIGNIN} text="Already have an account? Sign in" />
          </Grid>
        </form>
      </div>
    </Container>
  );
};

SignUp.propTypes = {
  authError: PropTypes.string,
  signUp: PropTypes.func,
  isLoading: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading,
    authError: state.auth.error,
  };
};

export default connect(
  mapStateToProps,
  { signUp },
)(SignUp);
