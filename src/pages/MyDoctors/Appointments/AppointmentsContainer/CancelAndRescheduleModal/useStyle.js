import {makeStyles} from '@material-ui/core/styles'

const useStyle = makeStyles(() => ({
    dialogBox: {
      height: 900,
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
      backgroundColor: '#f7f7f7',
      marginLeft: 160,
    },
    text: {
      paddingTop: 5,
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
    },
    email: {
      fontSize: 13,
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
      width: 10,
      marginTop: -5,
      marginLeft: 58,
    },
    note: {
      fontSize: 10,
      paddingLeft: 5,
      color: '#0BB5FF',
    },
    cancle: {
      width: 215,
      height: 35,
      backgroundColor: '#f7f7f7',
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
      fontSize: 12,
      color: '#a8a8a8',
    },
    rescheduleBtn: {
      fontSize: 12,
      color: 'white',
    },
  }))

export default useStyle