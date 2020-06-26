import React from 'react';
import Grid from '@material-ui/core/Grid';
import Recent from '../Recent';
import QRCode from "react-qr-code";

const Home = () => {
  return (
    
    <Grid container spacing={3}>
      {/* <QRCode value="hey" /> */}
      <Recent />
    </Grid>
  );
};

export default Home;
