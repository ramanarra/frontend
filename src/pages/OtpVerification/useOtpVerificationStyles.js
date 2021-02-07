
import { makeStyles } from '@material-ui/core/styles'

const useOtpVerificationStyles = makeStyles(() => ({
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

      loginButton: {
        width: 415,
      },

      content: {
        paddingBottom: 55,
        paddingTop: 40,
      },

      inputStyle: {
        width: '2rem !important',
        height: '3rem',
        margin: '0 1rem',
        fontSize: '1rem',
        borderBottom: '1px solid rgba(0,0,0,0.3)',
        borderTop: 'none',
        borderRight: 'none',
        borderLeft: 'none',
      },

      error: {
        borderBottom: '1px solid red !iimportant',
      },
      focusStyle: {
        borderTop: 'none',
        borderRight: 'none',
        borderLeft: 'none',
      }
}))

export default useOtpVerificationStyles 