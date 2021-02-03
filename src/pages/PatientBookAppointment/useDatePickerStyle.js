import { makeStyles } from '@material-ui/core/styles'

const useDatePickerStyle = makeStyles(() => ({
  container: {
    width: 'calc(100% - 320px)',
    height: '100%',
  },
  datePicker: {
    paddingTop: 60,
    '& .MuiPickersStaticWrapper-staticWrapperRoot': {
      justifyContent: 'center',
      alignItems: 'center',
    },
    '& .MuiPickersBasePicker-pickerView': {
      minWidth: 450,
      minHeight: 400,
    },
    '& .MuiPickersCalendarHeader-switchHeader': {
      marginBottom: 10,
    },
    '& .MuiSvgIcon-root': {
      fontSize: 28,
    },
    '& .MuiPickersCalendarHeader-transitionContainer': {
      height: 26,
    },
    '& .MuiPickersCalendarHeader-dayLabel': {
      margin: '0px 13px',
      fontSize: 16,
    },
    '& .MuiPickersDay-day': {
      margin: '2.2px 13.5px',
    },
    '& .MuiTypography-alignCenter': {
      fontSize: 18,
      color: '#656363',
      variant: 'bold',
    },
    '& .MuiTypography-body2': {
      color: '#414141',
      fontSize: 16,
    },
    '& .MuiPickersDay-dayDisabled': {
      '& p': {
        color: '#a8a8a8',
        fontSize: 16,
      },
    },
  },
  button: {
    display:"flex",
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButton: {
    padding: '8.5px 67px',
    backgroundColor: '#0bb5ff',
    borderRadius: 25,
    textAlign: 'center',
    cursor: 'pointer',
  },
  confirmText: {
    fontSize: 16,
    color: '#f7f7f7',
    paddingTop: 2,
  },
  errorMessage: {
    fontSize: 17,
    textAlign: 'end',
    color: '#de1d1d',
    paddingRight: 85,
  },
}))

export default useDatePickerStyle
