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
  },
  confirmationStar: {
    width: 7,
    color: 'red',
    marginTop: -5,
  },
  confirmationNote: {
    fontSize: 13,
    paddingLeft: 1,
    color: '#5f5757',
  },
  notes: {
    paddingTop: 10,
  },
  cancleButton: {
    width: 100,
    height: 35,
    borderRadius: 17,
    backgroundColor: '#f4f2f2',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 220,
    paddingTop: 8,
    cursor: 'pointer',
  },
  cancleText: {
    color: '#a8a8a8',
    fontSize: 12,
  },
  confirmButton: {
    width: 100,
    height: 35,
    borderRadius: 17,
    backgroundColor: '#0bb5ff',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 15,
    paddingTop: 8,
    cursor: 'pointer',
  },
  confirmText: {
    color: 'white',
    fontSize: 12,
  },
}))

export default useCancleAppointmentStyle
