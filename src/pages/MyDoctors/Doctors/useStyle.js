import { makeStyles } from '@material-ui/core/styles'

const useNavigationStyles = makeStyles(() => ({
  container: {
    width: '98.3%',
    background: '#f9f9f9',
    display: 'flex',
    backgroundColor: 'white',
    height: 65,
    padding: '0px 14px',
    boxShadow: '5px 0px 15px 0px #f3eeee',
  },

  right: {
    alignItems: 'flex-end',
  },

  content: {
    marginLeft: 8,
    fontSize: 13.6,
    color: '#c7c7c7',
    fontWeight: 'normal',
  },

  imgSize: {
    width: 17,
  },

  apponitments: {
    fontSize: 14,
    paddingTop: 3,
  },

  button: {
    cursor: 'pointer',
    padding: '0px 20px 8px',
    display: 'flex',
  },

  selecedTab: {
    borderBottom: '2px solid #0bb5ff',
    '& p': {
      color: '#0bb5ff',
    },
  },

  textField: {
    width: 210,
    color: '#c7c7c7',
    '& label': {
      fontSize: 13,
      color: '#c7c7c7',
    },

    '& div': {
        color: '#c7c7c7',
        marginTop: 8,
    },

    '& svg': {
        width: 16,
       marginRight: 2,
       marginTop: 10,
    }
  },
}))

export default useNavigationStyles

export const useInfocardStyles = makeStyles((theme) => ({

    container: {
      marginTop: 20,
      marginRight: 25,
      backgroundColor: 'white',
      padding: '15px 13px 10px 20px',
      borderBottom: '2px solid #0bb5ff',
      boxShadow: '5px 0px 15px 0px #f3eeee',
      height: 208,
    },
  
    large: {
      width: theme.spacing(7.5),
      height: theme.spacing(7.5),
    },
  
    name: {
      fontSize: 18.5,
      color: '#645f5f',
    },
  
    desgination: {
      fontSize: 12,
      color: '#c1b6b6',
    },
  
    text: {
      fontSize: 11.5,
      color: '#c8c8c8',
    },
  
    value: {
      fontSize: 11.5,
      color: '#947f7f',
      fontWeight: 600
    },
  
    appointmentsContent: {
      width: 118,
      display: 'flex',
      flexWrap: 'wrap',
    },
  
    appointments: {
      textAlign: 'center',
      background: '#efefef',
      fontSize: 11,
      color: '#c1b6b6',
      borderRadius: 50,
      marginTop: 3,
      marginRight: 1,
      width: 58,
    },
  
    button: {
      textTransform: 'capitalize',
      fontSize: 13,
      padding: '1px 9px',
      border: '1.5px solid #94dfff',
      color: '#0bb5ff',
      borderRadius: 3,
      marginRight: 10,
    },
    appointmentButton: {
      textTransform: 'capitalize',
      fontSize: 13,
      padding: '1px 9px',
      border: '1.5px solid #94dfff',
      color: '#ffffff',
      backgroundColor: '#0bb5ff',
      borderRadius: 3,
    }
  }))
