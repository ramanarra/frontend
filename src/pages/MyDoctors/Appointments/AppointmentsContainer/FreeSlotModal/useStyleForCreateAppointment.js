import {makeStyles} from '@material-ui/core/styles'

const useStyleForCreateAppointment = makeStyles(() => ({
    dialogBox: {
        // height: 900,
        width: 1620,
      },
      title: {
        fontSize: 23,
        color: 'black',
        textAlign: 'center',
        paddingLeft: 130,
      },
      closeIcon: {
        marginLeft: 110,
        marginTop: 5,
        cursor: 'pointer',
      },
      text: {
        textAlign: 'center',
      },
      msg: {
        fontSize: 11,
        color: '#a8a8a8',
      },
      txt: {
        width: 250,
        height: 25,
        backgroundColor: '#f7f7f7',
        marginLeft: 110,
        paddingTop: 5,
        fontSize: 11,
        marginTop: 10,
      },
      phoneText: {
        paddingLeft: 7,
        fontSize: 11.5,
      },
      phone: {
        width: 440,
        paddingLeft: 9,
        paddingTop: 5,
      },
      detailstext: {
          paddingLeft: 7,
          fontSize: 11.5
      },
      firstName: {
          width: 210,
          paddingLeft: 9,
          paddingTop: 8,
      },
      lastNameBox: {
          paddingLeft: 10,
      },
      lastName: {
          width: 220,
          paddingLeft: 9,
          paddingTop: 8,
      },
      email: { 
          width: 440,
          paddingLeft: 9,
          paddingTop: 8,
      },
      date: {
          width: 440,
          paddingLeft: 9,
          paddingTop: 8,
      },
      payment: {
          width: 200,
          marginLeft: 9,
          marginTop: 5,
          borderLeft: "1px solid gray",
          borderRight: '1px solid gray',
          borderTop: '1px solid gray',
          '& select': {
            paddingLeft: 10,
        },
        '& svg': {
            marginRight: -5,
        },
      },
      consultationModeBox: {
        paddingLeft: 10,
      },
      consultationMode: {
          width: 210,
          marginLeft: 9,
          marginTop: 5,
          borderLeft: "1px solid gray",
          borderRight: '1px solid gray',
          borderTop: '1px solid gray',
          '& select': {
            paddingLeft: 10,
        },
        '& svg': {
            marginRight: -5,
        },
      },
      preConsultation: {
          width: 200,
          marginLeft: 9,
          marginTop: 5,
          borderLeft: "1px solid gray",
          borderRight: '1px solid gray',
          borderTop: '1px solid gray',
          '& select': {
              paddingLeft: 10,
          },
          '& svg': {
            marginRight: -5,
        },
      },
      submitbtn: {
        width: 250,
        height: 35,
        backgroundColor: '#0bb5ff',
        borderRadius: 17,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 100,
        paddingTop: 10,
        cursor: 'pointer',
      },
      submitText: {
          fontSize: 10,
          color: "white"
      },
}))

export default useStyleForCreateAppointment