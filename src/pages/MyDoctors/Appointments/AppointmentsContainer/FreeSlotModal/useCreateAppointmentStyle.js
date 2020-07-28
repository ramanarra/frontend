import {makeStyles} from '@material-ui/core/styles'

const userCreateAppointmentStyle = makeStyles(() => ({
    dialogBox: {
        // height: 900,
        width: 1620,
      },
      title: {
        fontSize: 21,
        color: 'black',
        textAlign: 'center',
        paddingLeft: 130,
      },
      closeIcon: {
        marginLeft: 130,
        marginTop: 3,
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
        width: 240,
        height: 25,
        backgroundColor: '#f7f7f7',
        marginLeft: 105,
        paddingTop: 5,
        fontSize: 10.5,
        marginTop: 10,
      },
      phoneText: {
        paddingLeft: 7,
        fontSize: 11.5,
      },
      phone: {
        width: 450,
        paddingLeft: 9,
        paddingTop: 5,
        '& input': {
          backgroundColor: '#f7f7f7',
          color: '#777777',
          height: 6,
          paddingLeft: 5,
        },
        '& fieldset': {
          border: 'none'
        }
      },
      newPatientPhone: {
        width : 445,
        paddingLeft: 9,
        paddingTop: 8,
        '& label': {
          fontSize: 11,
        },
      },
      detailstext: {
          paddingLeft: 7,
          fontSize: 11.5
      },
      firstName: {
          width: 215,
          paddingLeft: 9,
          paddingTop: 8,
          border: 'none',
          '& input': {
            backgroundColor: '#f7f7f7',
            color: '#777777',
            height: 6,
            paddingLeft: 5
          },
          '& fieldset': {
            border: 'none'
          }
      },
      newPatientFirstName: {
        width: 220,
        paddingTop: 8,
        paddingLeft: 9,
        '& div': {
          height: 32,
        }
      },
      lastNameBox: {
          paddingLeft: 10,
      },
      newPatientLastNameBox: {
        paddingLeft: 2,
      },
      lastName: {
          width: 225,
          paddingLeft: 9,
          paddingTop: 8,
          '& input': {
            backgroundColor: '#f7f7f7',
            color: '#777777',
            height: 6,
            paddingLeft: 5,
          },
          '& fieldset': {
            border: 'none'
          }
      },
      newPatientLastName: {
        width: 225,
        paddingLeft: 9,
        paddingTop: 8,
        '& div': {
          height: 32,
        }
      },
      email: { 
          width: 450,
          paddingLeft: 9,
          paddingTop: 8,
          '& input': {
            backgroundColor: '#f7f7f7',
            color: '#777777',
            height: 6,
            paddingLeft: 5,
          },
          '& fieldset': {
            border: 'none'
          }
      },
      newPatientEmail: {
        width: 445,
        paddingLeft: 9,
        paddingTop: 8,
        '& div': {
          height: 32,
        }
      },
      date: {
          width: 450,
          paddingLeft: 9,
          paddingTop: 8,
          '& input': {
            backgroundColor: '#f7f7f7',
            color: '#777777',
            height: 6,
            paddingLeft: 5,
          },
          '& fieldset': {
            border: 'none'
          }
      },
      calendarIcon: {
        width: 16,
        position: "absolute",
        right: 36,
        top: 375,
        color: '#a8a8a8',
      },
      newPatientDate: {
        width: 435,
        marginLeft: 9,
        marginTop: 8,
        borderLeft: '1px solid #d4d4d4',
        borderRight: '1px solid #d4d4d4',
        borderTop: '1px solid #d4d4d4',
        '& div': {
          height: 32,
        },
        '& input': {
          paddingLeft: 10,
          fontSize: 12,
        },
        '& button': {
          padding: 0,
          marginRight: 10,
          ' & svg': {
            fontSize: 20,
          },
        },
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
        width: 215,
        paddingLeft: 9,
        paddingTop: 8,
        border: 'none',
        '& input': {
          backgroundColor: '#f7f7f7',
          color: '#777777',
          height: 6,
          paddingLeft: 5
        },
        '& fieldset': {
          border: 'none'
        }
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

export default userCreateAppointmentStyle