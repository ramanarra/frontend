import { makeStyles } from '@material-ui/core/styles'

const useRescheduleAppointmentStyle = makeStyles(() => ({
  dialogBox: {
    height: 900,
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 1000,
    },
    marginTop:'-90px'
  },
  header: {
    paddingTop: 15,
  },
  title: {
    paddingLeft: 335,
    fontSize: 20,
    color: '#504f4f',
  },
  icon: {
    marginLeft: 325,
    marginTop: -13,
    cursor: 'pointer',
    color: '#a8a8a8',
  },
  slotTimeBox: {
    paddingTop: 16,
    paddingBottom: 20,
  },
  slotTime: {
    padding: '4px 36px',
    marginLeft: 260,
    backgroundColor: '#f7f7f7',
    width: 'fit-content',
    fontSize: 11,
    color: '#272424',
  },
  name: {
    fontSize: 13.5,
    color: '#9b9999',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  left: {
    width: 275,
  },
  right: {
    width: 275,
  },
  detail: {
    width: 600,
    marginLeft: 175,
  },
  detailField: {
    paddingTop: 10,
    paddingBottom: 7,
  },
  date: {
    paddingLeft: 175,
    '& div': {
      '& div': {
        '& input': {
          color: '#000000',
          fontWeight: 'bold',
        },
        '& svg': {
          fontSize: 20,
        },
      },
    },
  },
  available: {
    paddingLeft: 175,
    paddingTop: 15,
  },
  availableText: {
    fontSize: 15,
    color: '#a8a8a8',
  },
  availableSlots: {
    width: 510,
    maxHeight: 152,
    overflowY: 'auto',
    paddingTop: 5,
  },
  time: {
    width: 105,
    height: 35,
    backgroundColor: '#d5f7e3',
    textAlign: 'center',
    paddingTop: 8,
    marginTop: 10,
    marginRight: 19,
    '&:hover': {
      backgroundColor: '#54cbff',
    },
  },
  timeText: {
    fontSize: 13,
    color: '#16e46b',
    '&:hover': {
      color: '#ffffff',
    },
  },
  selectedTab: {
    backgroundColor: '#0bb5ff',
  },
  selectedText: {
    color: '#f7f7f7',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
  },
  submitbtn: {
    padding: '8px 35px',
    backgroundColor: '#0bb5ff',
    borderRadius: 17,
    textAlign: 'center',
    cursor: 'pointer',
  },
  submitText: {
    fontSize: 14,
    color: '#f7f7f7',
  },
  error: {
    textAlign: 'center',
    paddingBottom: 15,
    color: '#d51717',
  },
}))

export default useRescheduleAppointmentStyle
