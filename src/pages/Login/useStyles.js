import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    root: {
      height: '100vh',
      width: '100vw',
    },
  
    paper: {
      border: '1.4px solid #f4f4f4',
      padding: '60px 73px 40px 73px',
      marginLeft: 25,
      marginBottom: 83,
      marginTop: 20,
    },
  
    logo: {
      height: 100,
    },
  
    heading: {
      letterSpacing: 1.2,
      textAlign: 'center',
      position: 'relative',
    },
  
    line: {
      display: 'block',
      position: 'absolute',
      height: 3,
      width: '12%',
      right: 0,
      top: 35,
      left: 190,
      bottom: 2,
      background: '#0bb5ff',
    },
  
    textField: {
      width: 415,
    },
  
    content: {
      paddingBottom: 86,
      paddingTop: 40,
    },
  
    emailContent: {
      paddingBottom: 30,
    },
  
    forgotPassword: {
      textAlign: 'end',
      paddingTop: 2,
    },
  
    loginButton: {
      width: 415,
    },
  
    text: {
      marginBottom: 10,
      fontWeight: 500,
      color: '#151313',
    },
  
    emptytext: {
      color: '#f44336',
      paddingTop: 2,
    },
  
    singupContent: {
      marginTop: 10,
    },
  
    singupLabel: {
      marginRight: 5,
    },
  }))

export default useStyles  
  