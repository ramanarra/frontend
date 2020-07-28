import { makeStyles } from '@material-ui/core/styles'

const useRescheduleStyle = makeStyles(() => ({
  rescheduled: {
    height: 900,
  },

  dialogTitle: {
    padding: '20px 24px 10px',
  },
  title: {
    fontSize: 23,
    color: 'black',
    textAlign: 'center',
    paddingLeft: 220,
  },
  closeIcon: {
    marginLeft: 190,
    cursor: 'pointer',
  },
  slot: {
    width: 240,
    height: 25,
    backgroundColor: '#f4f2f2',
    marginLeft: 160,
  },
  text: {
    paddingTop: 7,
    fontSize: 10,
    textAlign: 'center',
  },
  details: {
    marginTop: 20,
  },
  phoneNumber: {
    fontSize: 13,
    paddingTop: 4,
    paddingLeft: 60,
    paddingBottom: 14,
  },
  firstName: {
    fontSize: 13,
    paddingTop: 4,
    paddingRight: 26,
    paddingLeft: 60,
  },
  lastName: {
    fontSize: 13,
    paddingTop: 4,
    paddingRight: 20,
    paddingBottom: 14,
  },
  email: {
    fontSize: 13,
    paddingTop: 4,
    paddingRight: 36,
  },
  notchedOutline: {
    '& input': {
      color: '#777777',
      height: 10,
      marginTop: -4,
    },
    '& fieldset': {
      paddingLeft: 10,
      height: 25,
      color: '#777777',
      border: 'none',
    },
    width: 140,
    fontSize: 13,
    paddingTop: 5,
    color: '#777777',
    paddingBottom: 14,
    paddingLeft: 20,
  },
  noteText: {
    paddingTop: 10,
  },
  starIcon: {
    width: 10,
    marginTop: -5,
    marginLeft: 58,
  },
  note: {
    fontSize: 10,
    paddingLeft: 5,
    color: '#0BB5FF',
  },
  patientNote: {
    marginLeft: 55,
    color: '#a8a8a8',
  },
  date: {
    paddingLeft: 60,
    paddingTop: 10,
  },
  available: {
    width: 500,
    paddingLeft: 60,
    paddingTop: 12,
  },
  availableText: {
    fontSize: 15.5,
  },
  time: {
    width: 100,
    height: 40,
    backgroundColor: '#d5f7e3',
    textAlign: 'center',
    paddingTop: 8,
    marginTop: 10,
    marginRight: 17,
  },
  timeText: {
    fontSize: 13,
    color: '#7ae5a6',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 40,
  },
  submitbtn: {
    padding: '8px 42px',
    backgroundColor: '#0bb5ff',
    borderRadius: 17,
    textAlign: 'center',
    cursor: 'pointer',
  },
  submitText: {
    fontSize: 14,
    color: 'white',
  },
  selectedTab: {
    backgroundColor: '#0bb5ff',
  },
  selectedText: {
    color: 'white',
  },
}))

export default useRescheduleStyle
