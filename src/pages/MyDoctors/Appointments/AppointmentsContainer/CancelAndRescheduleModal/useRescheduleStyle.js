import {makeStyles} from '@material-ui/core/styles'

const useRescheduleStyle = makeStyles(() => ({
    rescheduled: {
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
      dateText: {
        fontSize: 12,
      },
      datePicker: {
        marginTop: 10,
        border: '1px solid #d4d4d4',
        '& div': {
            width: 235,
            height: 25,
            '& input': {
                fontSize: 11,
                paddingLeft: 10,
                paddingBottom: 5,
                color: '#a8a8a8',
            }
        },
        '& svg': {
            fontSize: 20,
            paddingBottom: 1,
        },
        '& button': {
            marginLeft: 90,
        },
      },
      available: {
        width: 500,
        paddingLeft: 60,
        paddingTop: 10,
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
      submitbtn: {
        width: 130,
        height: 35,
        backgroundColor: '#0bb5ff',
        borderRadius: 17,
        textAlign: 'center',
        marginBottom: 40,
        marginTop: 12,
        marginLeft: 250,
        paddingTop: 8,
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
      }
}))

export default useRescheduleStyle