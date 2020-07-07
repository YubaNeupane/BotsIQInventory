import React,{useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

import Navigation from './Navigation';
import ProductRouter from '../Routes/ProductRouter';
import StudentProductRoutery from '../Routes/StudentProductRoutery';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));


let user = null;
const Dashboard = props => {
  const [isAdmin, setAdmin] = useState(false);

  var docRef = props.firestore.collection("users").doc(props.uid);

  docRef.get().then(function(doc) {
    if (doc.exists) {
      if(doc.data().isAdmin != undefined){
        setAdmin(doc.data().isAdmin)
      }
    } else {
        console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });

  
  const classes = useStyles();
  const { products, isLoading } = props;
  // console.log(props)
  

  // console.log(user)
  return (
    <div className={classes.root}>
      <Navigation admin = {isAdmin}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {(!products || isLoading) && <LinearProgress color="secondary" />}
        <Container maxWidth="lg" className={classes.container}>
          {isAdmin ? <ProductRouter {...props} isAdmin={isAdmin} /> : <StudentProductRoutery {...props} isAdmin={isAdmin}/>}
          
        </Container>
      </main>
    </div>
  );
};

const mapStateToProps = state => {
  user = state.firebase.auth.uid
  return {
    uid: state.firebase.auth.uid,
    products: state.firestore.ordered.products,
    isLoading: state.products.isLoading,
  };
};

Dashboard.propTypes = {
  products: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    if (!props.uid) return [];
    return [
      {
        collection: 'products',
       // where: [['userId', '==', props.uid]], // to be able to display to all comment this
      },
    ];
  }),
)(Dashboard);
