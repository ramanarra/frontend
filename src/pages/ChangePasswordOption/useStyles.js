import { makeStyles } from '@material-ui/core/styles'
  const useStyles = makeStyles(()=>({
    root: {
      color: 'white',
    },
    changePasswordText: {
      color: '#5c5a5a',
      cursor: 'pointer',
      fontSize: '14px',
      marginLeft: '8px',
      fontFamily: 'product-sans-regular',
    },
    textFieldDiv: {
      marginLeft: '20px',
    },
    txtFieldWrap: {
      starIcon:{
        paddingBottom: '10px',
    },
    },
    dialogContent: {
      width: '530px',
      height: '400px',
      overflowY: 'hidden',
      overflowX: 'hidden',
      fontFamily: 'product-sans-regular, sans-serif',
        },
    err: {
      color: 'red',
    },
    titleStyle: {
      textAlign: 'center',
      color: 'red',
    },
    divBlock: {
      display: 'block',
      marginBottom: '11px',
    },
    divinline: {
      display: 'inline-block',
    },
    cssTextAlign: {
      textAlign: 'right',
         },
    save: {
      marginTop: '-20px',
      backgroundColor: '#0bb5ff',
      color: 'white',
      width: '100px',
      marginRight: '35px',
      padding: '10px',
      filter: 'blur(0px)',
      fontSize: '14px',
      '&:hover': {
        backgroundColor: '#0bb5ff',
      },
      borderRadius: '20px',
    },
    saveDiv: {
      padding: '0px 0px 20px 0px',
    },
    header: {
      fontSize: '18px',
      color: 'black',
      marginLeft: '15px',
    },
    width5: {
      width: '5%',
      marginLeft:'50px',
    },

    txtFieldWrap: {
      '& error': {
        fontSize: '11px !important',
      },
    },

    txtFieldWrap: {
      '& txtFieldError': {
        fontSize: '11px !important',
      },
    },
    textFieldlabel: {
      width: '95%',
      fontSize: '14px',
      color: 'black',
      padding: '5px 0px 0px 0px',

    },

    textFieldsize: {
      width: '95%',
      fontSize: '14px',
      color: 'black',
      '& input': {
        height: '40px !important',
      },
      padding: '10px 0px 10px 0px',
      },
  }))
  export default useStyles