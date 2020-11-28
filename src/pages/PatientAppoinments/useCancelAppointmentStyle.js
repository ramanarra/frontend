import { makeStyles } from '@material-ui/core/styles'

const useCancelAppointmentStyle = makeStyles(() => ({
  content: {
    width: 440,
  },
  icon: {
    marginLeft: 380,
    color: '#a8a8a8',
  },
  heading: {
    fontSize: 20,
    color: '#686868',
  },
  text: {
    paddingTop: 15,
    color: '#a8a8a8',
  },
  button: {
    justifyContent: 'flex-end',
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

export default useCancelAppointmentStyle
