import { makeStyles } from '@material-ui/core/styles'
import { light } from '@material-ui/core/styles/createPalette'
import { FullscreenExit } from '@material-ui/icons'

const useMedicineListStyle = makeStyles(() => ({
  submit: {
    textTransform: 'capitalize',
    color: 'white',
    // position: 'relative',
    // top: 0,
    // left: 250,
    height: 30,
    borderRadius: 8,

    backgroundColor: '#2abade',
    border: '1px solid #2abade',
    '&:hover': {
      backgroundColor: '#2abade',
    },
  },

  addMedicine:{
    display:"flex", justifyContent:"space-between", alignItems:"center"
  },
  finish:{
    display: 'flex', 
    float: 'right' 
  },
  date: {
    display: 'flex',
    color: '#9da3ab',
  },
  edit: {
    position: 'relative',
    left: 160,
    top: -8,
  },
  head: {
    color: '#363636',
    height: '5%',
  },
  txtbody: {
    fontSize: 15,
    color: '#6b6b6b',
    textAlign: 'center',

    td: {
      textAlign: 'center',
    },
  },
  feild: {
    width: '7%',
    height: '10px',
    paddingBottom: '5px',
  },
  comment: {
    padding: '10px',
    textAlign: 'center',
  },
  header: {
    m: 4,
    display: 'flex',
    fontSize: 13,
    position: 'absolute',
    top: 0,
    left: '43%',
  },
  added: {
    textTransform: 'capitalize',
    // position: 'absolute',
    // left: '5%',
    paddingRight: 0,
    paddingLeft: 0,
  },
  container: {
    // position: 'absolute',
    // right: 0,
    // margin: 0,
    // top: 56,
    backgroundColor: '#ffffff',
    // width: '23%',
    padding: '25px 15px 10px 23px',
    // height: 'calc(100% - 63px)',
    overflowY: 'auto',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    position: 'absolute',
    top: 58,
    right: '22.5%',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  },
  contentrow: {},
  icon: {
    marginTop: 7.5,
    marginLeft: 8,
    color: '#a8a8a8',
  },
}))

export default useMedicineListStyle
