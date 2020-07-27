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
    paddingTop: 4,
    paddingLeft: 60,
  },
  firstName: {
    paddingTop: 4,
    paddingRight: 26,
    paddingLeft: 60,
  },
  lastName: {
    paddingTop: 4,
    paddingRight: 20,
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
  cancle: {
    width: 215,
    height: 35,
    backgroundColor: '#f4f2f2',
    borderRadius: 17,
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 12,
    marginLeft: 90,
    paddingTop: 8,
    cursor: 'pointer',
  },
  reschedule: {
    width: 215,
    height: 35,
    backgroundColor: '#0bb5ff',
    borderRadius: 17,
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 12,
    marginLeft: 20,
    paddingTop: 8,
    cursor: 'pointer',
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
