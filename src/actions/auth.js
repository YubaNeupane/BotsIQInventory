export const START_AUTH_ACTION = 'START_AUTH_ACTION';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const AUTH_ERROR = 'ERROR';

export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: START_AUTH_ACTION });
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: LOGIN_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: AUTH_ERROR, payload: err.message });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: START_AUTH_ACTION });
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: SIGNOUT_SUCCESS });
      });
  };
};

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: START_AUTH_ACTION });
    const firebase = getFirebase();
    const firestore = getFirestore();

    if(newUser.firstName ===''|| newUser.lastName === '' || newUser.school===''){
      dispatch({ type: AUTH_ERROR, payload: 'Please fill out all the required fields' });
    }else{
      firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        return firestore
          .collection('users')
          .doc(resp.user.uid)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            isAdmin:false,
            school:newUser.school,
            email:newUser.email,
            currentlyLending:[]
          });
      })
      .then(() => {
        dispatch({ type: SIGNUP_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: AUTH_ERROR, payload: err.message });
      });

    }

 
  };
};
