import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import * as routes from '../Routes/routes';
import { removeCategory } from '../../actions/product';
import Box from '@material-ui/core/Box';
import Title from '../Title';
import ProductCard from './ProductCard';
import Empty from '../Empty';
import ConfirmDialog from '../shared/ConfirmDialog';
import firebase from 'firebase/app';


const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: 'initial',
  },
}));

const ProductList = ({ categoryProducts, match, history, removeCategory }) => {
  const classes = useStyles();
  const {
    params: { category },
  } = match;

  const [isAdmin,setIsAdmin] = useState(false)
  const getData = async() => {
    const userRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      if(doc.data().isAdmin !== undefined){
        setIsAdmin(doc.data().isAdmin)
      }
    }
  }
  useEffect(() => {
      getData()
  },[]);

  const deleteCategory = category => {
    
    removeCategory(category).then(res => {
      if (res) {
        history.push(routes.CATEGORYLIST);
      }
    });
  };

  return (
    <div>
      <Title title={`All ${category} Products`} />
      {isAdmin ? <Grid container alignItems="center">
        <Link
          to={{
            pathname: routes.ADDPRODUCT,
            state: {
              category,
            },
          }}
          className={classes.link}
        >
          <Button
            size="small"
            variant="outlined"
            color="primary"
            className={classes.button}
          >
            Add New {category}
          </Button>
        </Link>

        <ConfirmDialog confirmAction={() => deleteCategory(category)} />
      </Grid>:null}
      

      <Box display="flex" flexwrap="wrap">
        {categoryProducts.length > 0 ? (
          categoryProducts.map(product => (
            <ProductCard key={product.id} product={product} history={history} />
          ))
        ) : (
          <Empty />
        )}
      </Box>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {
    firestore: {
      ordered: { products },
    },
  } = state;
  const category = ownProps.match.params.category;
  const categoryProducts = products
    ? products.filter(item => item.category === category)
    : [];
  return {
    categoryProducts,
  };
};

export default connect(
  mapStateToProps,
  { removeCategory },
)(ProductList);
