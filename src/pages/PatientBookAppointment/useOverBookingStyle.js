import { makeStyles } from '@material-ui/core/styles'

const useOverBookingStyle = makeStyles(() => ({
  dialogTitle: {
    padding: '20px 24px 10px',
  },
  overBooking: {
    height: 950,
  },
  titleText: {
    fontSize: 20,
    color: '#524646',
    variant: 'h5',
  },
  closeIcon: {
    marginLeft: 285,
    marginRight: -10,
    cursor: 'pointer',
  },
  content: {
    width: 400,
  },
  confirmationText: {
    fontSize: 18,
    color: '#898989',
  },
  note: {
    fontSize: 17,
    paddingTop: 5,
    paddingLeft: 4,
    color: '#545252',
  },
  confirmationStar: {
    width: 7,
    color: 'red',
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 190,
    paddingTop: 18,
    paddingBottom: 20,
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

export default useOverBookingStyle
