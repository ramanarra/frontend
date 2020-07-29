import {makeStyles} from '@material-ui/core/styles'

const userCreateAppointmentStyle = makeStyles(() => ({
    dialogBox: {
        width: 1620,
      },
      header: {
        paddingTop: '35px',
        paddingRight: '10px',
        paddingBottom: '3px',
      },
      title: {
        fontSize: 21,
        color: '#524646',
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
        marginTop: -5,
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
        color: '#7e7e7e',
      },
      fieldBox: {
        paddingTop: 15,
      },
      newFieldBox: {
        paddingTop: 12,
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
      phoneNumberText: {
        paddingLeft: 7,
        fontSize: 13.7,
      },
      newPatientPhone: {
        width : 445,
        paddingLeft: 9,
        paddingTop: 8,
        '& div': {
          height: 33,
        },
        '& fieldset': {
          border: '1px solid #ebebeb',
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
        right: 46,
        top: 363,
        color: '#747373',
      },
      newPatientDate: {
        paddingTop: 12,
        paddingLeft: 9,
      },
      payment: {
        width: 220,
      },
      optionHeader: {
        fontSize: 13.7,
      },
      paymentOptionBox: {
        marginLeft: 9,
        marginTop: 5,
        fontSize: 12,
        '& div': {
          width: 210,
        }
      },
      newPatientpayment: {
        paddingLeft: 9,
      },
      newPatientconsultationModeBox: {
        paddingLeft: 11,
      },
      consultationModeBox: {
        paddingLeft: 10,
      },
      newPatientPaymentOptionBox: {
        marginTop: 5,
        marginLeft: 1,
        '& div': {
          width: 210,
          '& div': {
            paddingBottom: 9,
            paddingTop: 9,
            '& span': {
              fontSize: 13,
            },
          },
        },
      },
      newPatientConsultationMode: {
        marginTop: 7,
        marginLeft: 2,
        '& div': {
          width:210,
          '& div': {
            paddingBottom: 9,
            paddingTop: 9,
            '& span': {
              fontSize: 13,
            },
          },
        },
      },
      consultationMode: {
        marginLeft: 10,
        marginTop: 5,
        '& div': {
          width: 210,
          '& div': {
            fontSize: 12,
          }
        }
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
      newPatientPreConsultation: {
        paddingLeft: 9,
        paddingTop: 12,
      },
      newPatientPreConsultationBox: {
        width: 215,
        paddingTop: 8,
        paddingLeft: 2,
        '& input': {
          color: '#777777',
          height: 6,
          paddingLeft: 13,
        },
        '& fieldset': {
          border: '1px solid #ebebeb',
        },
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 106px',
        paddingTop: 36,
        paddingBottom: 16,
      },
      submitbtn: {
        padding: 9,
        backgroundColor: '#0bb5ff',
        borderRadius: 17,
        textAlign: 'center',
        cursor: 'pointer',
      },
      submitText: {
          fontSize: 10,
          color: "#f7f7f7",
      },
      createButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 106px',
        paddingTop: 25,
        paddingBottom: 16,
      }
}))

export default userCreateAppointmentStyle