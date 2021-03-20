import { makeStyles } from '@material-ui/core/styles'

const useCancleAppointmentStyle = makeStyles(() => ({
  dialogTitle: {
    padding: '20px 24px 10px',
  },
  cancellation: {
    height: 950,
  },
  confirmation: {
    fontSize: 20,
    color: '#524646',
  },
  closed: {
    marginLeft: 285,
    marginRight: -10,
    cursor: 'pointer',
  },
  askConfirmation: {
    width: 400,
  },
  askConfirmationText: {
    color: '#a8a8a8',
    fontSize: 14.5,
  },
  confirmationStar: {
    width: 7,
    color: 'red',
    marginTop: -7,
  },
  checkBox: {
    '& svg': {
      width: 18,
      marginLeft: -5,
      marginRight: -5,
    },
  },
  checkBoxText: {
    paddingTop: 10,
    fontSize: 14.7,
    color: '#7d7b7b',
  },
  confirmationNote: {
    fontSize: 12.5,
    paddingLeft: 1,
    color: '#776d6d',
  },
  notes: {
    paddingTop: 12,
    paddingLeft: 5,
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 190,
    paddingTop: 18,
    paddingBottom: 25,
  },
  cancleButton: {
    padding: '10px 40px',
    borderRadius: 17,
    backgroundColor: '#f4f2f2',
    textAlign: 'center',
    cursor: 'pointer',
    marginRight: 16,
  },
  cancleText: {
    color: '#a8a8a8',
    fontSize: 12,
  },
  confirmButton: {
    padding: '10px 40px',
    borderRadius: 17,
    backgroundColor: '#0bb5ff',
    textAlign: 'center',
    cursor: 'pointer',
  },
  confirmText: {
    color: 'white',
    fontSize: 12,
  },
}))

export default useCancleAppointmentStyle
