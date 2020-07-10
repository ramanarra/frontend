import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    container: {
     marginLeft: '55px',
    marginTop: '20px'
    },
    container2:{
        marginLeft: '55px',
    marginTop: '28px'
    },
    title: {
        fontSize: '17px',
        color: '#484848'
        
    },
    spaceBetweenTitle: {
        marginBottom: '31px'
    },
    subtitle:{
        fontSize: '13px',
    fontWeight: '300',
    color: '#414141'
    
    },
    spaceBetweenSubTitle: {
        marginBottom: '18px'
    },
    button: {
        marginRight: '16px',
        width: '88px',
        height: '33px',
        border: '1px solid #E7E7E7',
        fontSize: '10px',
        color: '#8C8C8C',
        marginBottom: '33px',
        textTransform: 'lowercase'
    },
    input: {
        marginTop: '6px',
        fontSize: '11px',
        color: '#D9D9D9',
        width: '71px'
    },
    notchedOutline: {
        borderBottom: '1px solid white'
      },
      bookingallowed: {
        fontSize: '10px',
        color: '#8C8C8C',
        display: 'flex'
      },
      button2: {
        marginRight: '16px',
        width: '88px',
        height: '33px',
        border: '1px solid #E7E7E7',
        fontSize: '10px',
        color: '#8C8C8C',
        textTransform: 'lowercase'
    },
    Switchbutton: {
        marginBottom: '18px'
    },
    iconbutton: {
        color: 'rgb(36, 189, 255)',
        fontSize: '15px'
    },
    input2: {
        padding: '0px',
    width: '25px',
    height: '17px',
    textAlign: 'center'
    },
    active: {
        borderColor: "#0BB5FF",
        color: "#0BB5FF"
    }, 
    fontweight: {
        fontWeight: '600',
    },
    tableColumnButton: {
        width: '95px',
    height: '24px',
    fontSize: '9px',
    padding: '5px 5px'
    },
    table: {
        border: '1px solid #F9F9FA',
        height: '290px'
    },
    overbookingCount:{
        fontSize: '11px', 
        marginLeft: '3px'
    },
    textfieldCount: {
        marginLeft: '3px'
    },
    editicon:{
        display: 'block', marginLeft: '7px'
    },
    cancelation: {
        marginRight: '11px',
        color: 'rgb(36, 189, 255)',
        fontSize: '15px'
    }
}))

export default useStyles;