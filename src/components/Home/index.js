import React from 'react';
import Grid from '@material-ui/core/Grid';
import Recent from '../Recent';

const Home = () => {
  return (
    
    <Grid container spacing={3}>
      {/* <QRCode value="hey" /> */}
      <Recent />
    </Grid>
  );
};

export default Home;
