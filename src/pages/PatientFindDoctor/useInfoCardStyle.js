import { makeStyles } from '@material-ui/core/styles'

const useInforCardStyle = makeStyles((theme) => ({
  container: {
    width: 325,
    marginTop: 20,
    marginRight: 27.2,
    backgroundColor: 'white',
    padding: '15px 14px 10px 20px',
    borderBottom: '2px solid #0bb5ff',
    boxShadow: '5px 0px 15px 0px #f3eeee',
  },

  mainDetails: {
    height: 64,
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

  hospitalName: {
    fontSize: 10,
    color: '#c1b6b6',
  },

  fees: {
    paddingLeft: 5,
    width: 60,
  },

  contactNumber: {
    paddingLeft: 15,
  },

  hospital: {
    marginLeft: 55,
  },

  location: {
    paddingLeft: 26,
  },

  text: {
    fontSize: 11.5,
    color: '#c8c8c8',
  },

  value: {
    fontSize: 11.5,
    color: '#947f7f',
    fontWeight: 600,
  },

  button: {
    textTransform: 'capitalize',
    fontSize: 10,
    padding: '1px 9px',
    border: '1.5px solid #94dfff',
    color: '#0bb5ff',
    borderRadius: 3,
  },

  hospitalButton: {
    textTransform: 'capitalize',
    fontSize: 13,
    padding: '1px 15px',
    border: '1.5px solid #94dfff',
    backgroundColor: '#0bb5ff',
    color: '#f7f7f7',
    borderRadius: 3,
  },
}))

export default useInforCardStyle
