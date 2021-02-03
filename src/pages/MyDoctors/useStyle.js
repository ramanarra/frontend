import { makeStyles } from '@material-ui/core/styles'

const useNavigationStyles = makeStyles(() => ({
  container: {
    width: '97.7%',
    background: '#f9f9f9',
    display: 'flex',
    backgroundColor: 'white',
    height: 65,
    padding: '0px 14px',
    boxShadow: '5px 0px 15px 0px #f3eeee'
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
  contentlast:{ 
    backgroundColor: 'rgb(11, 181, 255)',
    color:'white',
    borderRadius:"18px",
    position:'absolute',
    right:"60px",
    top:"110px",
    border: "1.5px solid #94dfff",
    padding:"0.2% 1.1%",
     textTransform:"capitalize",
     fontSize:"65"
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

  boxInlineSize: {
    display:'flex',
    marginLeft:50,
},

}))

export default useNavigationStyles

export const useInfocardStyles = makeStyles((theme) => ({

    container: {
      marginTop: 20,
      marginRight: 29,
      backgroundColor: 'white',
      padding: '15px 14px 10px 20px',
      borderBottom: '2px solid #0bb5ff',
      boxShadow: '5px 0px 15px 0px #f3eeee'
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
      width: 100,
      display: 'flex',
      flexWrap: 'wrap',
    },
  
    appointments: {
      paddingLeft: 5,
      paddingRight: 5,
      background: '#efefef',
      fontSize: 11,
      color: '#c1b6b6',
      borderRadius: 50,
      marginTop: 3,
      marginRight: 2,
    },
  
    button: {
      textTransform: 'capitalize',
      fontSize: 13,
      padding: '1px 9px',
      border: '1.5px solid #94dfff',
      color: '#0bb5ff',
      borderRadius: 3,
    },
  }))
