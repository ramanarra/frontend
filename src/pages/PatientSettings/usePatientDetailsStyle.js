import { makeStyles } from '@material-ui/core/styles'

const usePatientDetailsStyle = makeStyles((theme) => ({
  container: {
    width: '100%',
  },
  photoContainer: {
    width: 210,
    position: 'relative',

    '& .MuiBackdrop-root' : {
      zIndex: '0',
      position: 'absolute',
      width: '144px',
      height: '144px',
      marginTop: '65px',
      borderRadius: '100px',
      backgroundColor: 'transparent',
  }
  },
  photo: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    border: '7px solid #9DE1FF',
    marginTop: 65,
    marginRight: 10,
  },
  detailsContainer: {
    padding: '8px 20px 20px 15px',
    width: 'calc(100% - 210px)',
  },
  box: {
    paddingTop: 16,
  },
  textField: {
    width: 315,
    '& .MuiInputBase-root': {
      backgroundColor: '#f1f1f1 !important',
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
    fontSize: 13.5,
    color: '#424141',
    paddingBottom: 6,
  },
  right: {
    width: 385,
  },
  edit: {
    marginTop: -20,
  },
  backdrop: {
    zIndex: 1,
    color: 'block',
  },
  spinner: {
    position: 'fixed',
    top: '50%',
    left: '50%',
  },
}))

export default usePatientDetailsStyle
