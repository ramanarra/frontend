import { makeStyles } from '@material-ui/core/styles'

const useInforCardStyle = makeStyles((theme) => ({
  container: {
    width: '23.05%',
    marginTop: '1.5%',
    marginRight: '1.9%',
    backgroundColor: 'white',
    padding: '1.5% 0.9% 1% 1.4%',
    borderBottom: '2px solid #0bb5ff',
    boxShadow: '5px 0px 15px 0px #f3eeee',
  },

  mainDetails: {
    height: '40%',
  },

  large: {
    width: theme.spacing(7.5),
    height: theme.spacing(7.5),
  },

  name: {
    fontSize: '93%',
    color: '#645f5f',
  },

  desgination: {
    fontSize: '60%',
    color: '#c1b6b6',
  },

  hospitalName: {
    fontSize: '51%',
    color: '#c1b6b6',
  },

  fees: {
    paddingLeft: '2%',
    width: '20%',
  },

  contactNumber: {
    paddingLeft: '5%',
  },

  hospital: {
    marginLeft: '19%',
  },

  location: {
    paddingLeft: '9%',
  },
  experience:{
    paddingLeft:'9%',
  },
  text: {
    fontSize: '57%',
    color: '#c8c8c8',
  },

  value: {
    fontSize: '57%',
    color: '#947f7f',
    fontWeight: 600,
  },

  button: {
    textTransform: 'capitalize',
    fontSize: '50%',
    padding: '0.5% 3%',
    border: '1.5px solid #94dfff',
    color: '#0bb5ff',
    borderRadius: 3,
  },

  hospitalButton: {
    textTransform: 'capitalize',
    fontSize: '65%',
    padding: '0.5% 5%',
    border: '1.5px solid #94dfff',
    backgroundColor: '#0bb5ff',
    color: '#f7f7f7',
    borderRadius: 3,
  },
}))

export default useInforCardStyle
