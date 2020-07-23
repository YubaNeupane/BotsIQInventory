import React,{useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ProductsTable from '../shared/ProductsTable';
import firebase from 'firebase'

const Recent = props => {
  const [isAdmin, setAdmin] = useState(false);


  var docRef = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid);

  docRef.get().then(function(doc) {
    if (doc.exists) {
      if(doc.data().isAdmin !== undefined){
        setAdmin(doc.data().isAdmin)
      }
    } else {
        console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });


  return (
    <Grid item xs={12}>
      {isAdmin? <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Recent Entries
      </Typography> : null}
      <ProductsTable products={props.products} />
    </Grid>
  );
};

Recent.propTypes = {
  products: PropTypes.array,
};


const mapStateToProps = state => {
  const {
    firestore: {
      ordered: { products },
    },
  } = state;
  return {
    products,
  };
};

export default connect(mapStateToProps)(Recent);
