import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles(() => ({
  dialogBox: {
    height: 900,
  },

  dialogTitle: {
    padding: '20px 24px 10px',
  },
  title: {
    fontSize: 23,
    color: '#524646',
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
    color: '#6a6a6a',
  },
  details: {
    marginTop: 20,
  },
  phoneNumber: {
    paddingTop: 5,
    paddingLeft: 60,
    paddingBottom: 14,
  },
  firstName: {
    paddingTop: 4,
    paddingRight: 26,
    paddingLeft: 60,
  },
  lastName: {
    paddingTop: 4,
    paddingRight: 20,
    paddingBottom: 14,
  },
  email: {
    paddingTop: 4,
    paddingRight: 36,
  },
  notchedOutline: {
    width: 140,
    fontSize: 13,
    color: '#777777',
    paddingBottom: 14,
    paddingLeft: 20,
    paddingTop: 5,
  },
  starIcon: {
    width: 11,
    marginTop: -5,
  },
  note: {
    fontSize: 10,
    paddingLeft: 4,
    color: '#0BB5FF',
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 38,
  },
  cancle: {
    padding: '11px 30px',
    backgroundColor: '#f4f2f2',
    borderRadius: 17,
    textAlign: 'center',
    cursor: 'pointer',
  },
  reschedule: {
    padding: '10px 18px',
    backgroundColor: '#0bb5ff',
    borderRadius: 17,
    textAlign: 'center',
    cursor: 'pointer',
    marginLeft:22,
  },
  cancleBtn: {
    fontSize: 13,
    color: '#a8a8a8',
  },
  rescheduleBtn: {
    fontSize: 13,
    color: 'white',
  },
}))

export default useStyle
