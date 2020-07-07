import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from 'firebase'



export default function ResetPasswordModal() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const checkEmail = () =>{
      return(<h1>Check Email</h1>)
  }
  const handleResetPassword = () =>{
    firebase.auth().sendPasswordResetEmail(email).then(function() {
        handleClose()
        setErrorMessage('')
        checkEmail()
      }).catch(function(error) {
        setEmail('')
        setErrorMessage(error.message)
      });
  }

  return (
          <div>
      <label onClick={handleClickOpen}>
        Reset Password
      </label>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
        <DialogContent>

          {errorMessage !== '' ? 
          <DialogContentText color='primary'>
            <strong>{errorMessage}</strong>
          </DialogContentText> : null}

          <DialogContentText>
            Enter your email to receive a link allowing you to reset your password
          </DialogContentText>
          <TextField
            autoFocus
            onChange={(e)=>setEmail(e.target.value)}
            value = {email}
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
            
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleResetPassword} color="primary">
          REQUEST RESET
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    
  );
}
