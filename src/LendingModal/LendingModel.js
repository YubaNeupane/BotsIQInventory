import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import { MenuItem, Select, InputLabel } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import firebase from 'firebase'
import emailjs from 'emailjs-com'
import ReserveModal from '../components/ReserveModal/ReserveModal'

import InfiniteCalendar from 'react-infinite-calendar'
import 'react-infinite-calendar/styles.css' // Make sure to import the default stylesheet

const userId = 'user_f9Weuah3b6knK7v7GIzLf'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function FullScreenDialog({ data }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const product = data.product
  const [quantityAmount, setQuantityAmount] = React.useState(1)
  const [additionNotes, setAdditionNotes] = React.useState('')

  var d = new Date()
  d.setDate(d.getDate() + ((1 + 7 - d.getDay()) % 7))

  const [todayDate, setTodayDate] = React.useState(d)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const sendMail = (data) => {
    const template_params = {
      person: data.firstName + ' ' + data.lastName,
      school: data.school,
      quanity: data.quality,
      item: data.productName,
      time: data.lendTime,
      note: data.note,
      personEmail: data.email,
    }

    emailjs.send('default_service', 'template_oEP0naaV', template_params).then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text)
      },
      function (error) {
        console.log('FAILED...', error)
      },
    )
  }

  const handleLending = async () => {
    emailjs.init(userId)
    const v = product.serials.slice(0, quantityAmount)

    let data = [
      {
        productName: product.name,
        quality: quantityAmount,
        note: additionNotes,
        lendTime: todayDate.toJSON(),
        model: product.model,
        id: product.id,
        serial: v,
      },
    ]
    const copyData = {
      productName: product.name,
      quality: quantityAmount,
      note: additionNotes,
      lendTime: todayDate.toDateString(),
      school: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
    }
    const userRef = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
    const doc = await userRef.get()
    if (!doc.exists) {
      console.log('No such document!')
    } else {
      copyData.school = doc.data().school
      copyData.firstName = doc.data().firstName
      copyData.lastName = doc.data().lastName
      copyData.email = doc.data().email

      const oldData = doc.data().currentlyLending
      if (oldData !== undefined) {
        oldData.map((x) => data.push(x))
      }

      firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set(
          {
            currentlyLending: [...data],
          },
          { merge: true },
        )
        .then(function () {
          console.log('Document successfully written!')
          sendMail(copyData)
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })

      firebase
        .firestore()
        .collection('products')
        .doc(product.id)
        .set(
          {
            serials: product.serials.slice(quantityAmount),
          },
          { merge: true },
        )
        .then(function () {
          console.log('Document successfully written!')
          sendMail(copyData)
          handleClose()
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    }
  }

  const handleQuantityChange = (e) => {
    setQuantityAmount(e.target.value)
  }

  function getMonday(d) {
    d = new Date(d)
    var day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is sunday
    return new Date(d.setDate(diff))
  }

  var today = new Date()
  var lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7,
  )

  return (
    <div>
      {product.serials.length !== 0 ? (
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          BORROW IT
        </Button>
      ) : (
        <div>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
            disabled={true}
          >
            OUT OF STOCK
          </Button>
          <ReserveModal
            productName={product.name}
            product={product}
          ></ReserveModal>
        </div>
      )}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {product.name}
            </Typography>
            <Button
              size="large"
              autoFocus
              color="inherit"
              onClick={handleLending}
            >
              SEND REQUEST TO LEND
            </Button>
          </Toolbar>
        </AppBar>
        <br></br>
        <Container component="main" maxWidth="xs">
          <Grid item xs={12} justify="center" style={{ marginTop: '15%' }}>
            <InputLabel id="demo-simple-select-helper-label" required>
              Quantity:
            </InputLabel>
            <Select
              required
              value={quantityAmount}
              onChange={handleQuantityChange}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              style={{ marginTop: 10, width: '100%', height: 35 }}
            >
              {product.serials.map((serialNumber, index) => (
                <MenuItem key={serialNumber + index} value={index + 1}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} justify="center" style={{ width: '50' }}>
            <TextField
              value={additionNotes}
              style={{ marginTop: 15, width: '100%', height: 35 }}
              id="outlined-multiline-static"
              label="Addition Notes"
              multiline
              rows={4}
              onChange={(e) => setAdditionNotes(e.target.value)}
              placeholder="Any Addition Notes"
              variant="outlined"
            />
          </Grid>

          <Grid
            item
            xs={12}
            justify="center"
            style={{ width: '50', marginTop: '20%', marginLeft: '' }}
          >
            <Typography variant="h7">
              Equipment can only be borrowed on a Monday for the entire week.
              After receiving your request, BotsIQ will follow up to schedule
              delivery and pick-up.
            </Typography>

            <InfiniteCalendar
              Header="HEllo"
              min={lastWeek}
              minDate={new Date()}
              width={380}
              height={320}
              onSelect={(f) => setTodayDate(f)}
              disabledDays={[0, 2, 3, 4, 5, 6]}
              disabledDates={[getMonday(new Date())]}
            />
          </Grid>
        </Container>
      </Dialog>
    </div>
  )
}
