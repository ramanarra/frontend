import { makeStyles } from '@material-ui/core/styles'
import { borders } from '@material-ui/system';
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
    
    outerbox:{
      height:'60vh',
      width:'60vw',
      
      border: 3,
      margin:10,
  style: { width: '5rem', height: '5rem' },
    },

    logo: {
      height: 100,
    },
  
    heading: {
      textAlign: 'center',
      position: 'relative',
      fontSize: 18,
    },
  
    line: {
      display: 'block',
      position: 'absolute',
      height: 3,
      width: '11%',
      right: 0,
      top: 35,
      left: 185,
      bottom: 2,
      background: '#0bb5ff',
    },
  
    textField: {
      width: 415,
      '& fieldset': {
        borderColor: '#dedede !important'
      }
    },

    icon: {
      width: 20,
      cursor: 'default',
    },

    emptyField: {
      border: '1px solid #ff9007',
      '& fieldset': {
        top: -3.8,
        right: -0.3,
        borderColor: '#ffffff',
      }
    },

    emptyPasswordField: {
      border: '1px solid #ff9007',
      '& fieldset': {
        right: -0.3,
        top: -3.8
      },
    },
  
    content: {
      paddingBottom: 55,
      paddingTop: 40,
    },
  
    emailContent: {
      paddingBottom: 30,
    },
  
    forgotPassword: {
      textAlign: 'end',
      paddingTop: 3,
      color: '#a0a0a0',
      fontSize: 10.5,
    },
  
    loginButton: {
      width: 415,
    },
  
    text: {
      marginBottom: 10,
      color: '#645a5a',
      fontSize: 13,
    },
  
    emptytext: {
      color: '#f44336',
      paddingTop: 2,
      fontSize: 14.5,
    },
  
    singupContent: {
      marginTop: 10,
      cursor: 'pointer',
    },
  
    singupLabel: {
      marginRight: 5,
      color: '#a0a0a0',
    },
    
    backdrop: {
      zIndex: 0,
      color: '#fff',
    },

    spinner: {
      position: 'fixed',
      top: '50%',
      left: '50%',
    }
  }))

export default useStyles  
  