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

const schools = ["Admiral Peary AVTS" ,"Avonworth High School" ,"Baldwin High School" ,"Beaver County CTC" ,"Bedford High School" ,"Belle Vernon Area High School" ,"Bishop Canevin High School" ,"Brentwood High School" ,"Brownsville Area High School" ,"Butler Area Senior High School" ,"California Area High School" ,"Canon-McMillan High School" ,"Carmichaels Area Senior High School" ,"Central Valley High School" ,"Chambersburg Area Career Magnet School" ,"Charleroi Area High School" ,"Chartiers-Houston Jr./Sr. High School" ,"Clairton High School" ,"Connellsville Area High School" ,"Deer Lakes High School" ,"Derry Area High School" ,"East Allegheny Jr/Sr High School" ,"Eastern Westmoreland CTC" ,"Elizabeth Forward High School" ,"Fox Chapel Area High School" ,"Frazier High School" ,"Freedom Area High School" ,"Freeport Area High School" ,"Greene County CTC" ,"Greene County Homeschoolers" ,"Greensburg Salem High School" ,"Hempfield Area High School" ,"Highlands High School" ,"Knoch High School" ,"Lincoln Jr./Sr. High School" ,"Mon Valley CTC" ,"Moniteau Jr./Sr. High School" ,"Mount Pleasant Area High School" ,"Penn-Trafford High School" ,"Pine-Richland High School" ,"Pittsburgh Brashear High School" ,"Pittsburgh Science and Technology Academy" ,"Plum Senior High School" ,"Punxsutawney Area High School" ,"Ringgold High School" ,"Riverview Jr/Sr High School" ,"Seneca Valley Sr. High School" ,"Serra Catholic High School" ,"Somerset County Technology Center" ,"South Park High School" ,"Southmoreland High School" ,"Trinity High School" ,"Union High School" ,"United Jr/Sr High School" ,"West Greene High School" ,"West Mifflin Area High School" ,"Western Area Career and Technology Center" ,"Western PA School for the Deaf" ,"Woodland Hills Senior High School" ,"Yough Senior High School"]

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
                <MenuItem value="" required><em>Pick Your School</em></MenuItem>
                {schools.map(school => <MenuItem key= {school} value={school}>{school}</MenuItem>)}
                <MenuItem value="BotsIQ" required><em>BotsIQ</em></MenuItem>
                <MenuItem value="Other" required><em>Other</em></MenuItem>

                
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
