import { makeStyles } from '@material-ui/core/styles'

const useHospitalDetailsStyle = makeStyles(() => ({
  container: {
    padding: '40px 20px 20px 70px',
    width: 'calc(100% - 160px)',
  },
  box: {
    paddingTop: 30,
  },
  textField: {
    width: 315,
    '& .MuiInputBase-root': {
      backgroundColor: '#f7f7f7',
      height: 35,
      '& input': {
        color: '#777777',
      },
      '& fieldset': {
        border: 'none',
      },
    },
  },
  left: {
    width: 385,
  },
  text: {
    fontSize: 13,
    color: '#424141',
    paddingTop: 5,
    paddingRight: 5,
    paddingLeft: 5,
  },
  right: {
    width: 385,
  },
  discountField: {
    paddingTop: 30,
  },
  discountBox: {
    width: 30,
    '& div': {
      height: 30,
    },
    '& input': {
      padding: 8,
      color: '#010101',
    },
    '& fieldset': {
      border: 'none',
    },
  },
}))

export default useHospitalDetailsStyle
