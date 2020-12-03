import { makeStyles } from '@material-ui/core/styles'

const useDoctorDetailsStyle = makeStyles((theme) => ({
  doctorDetail: {
    width: 320,
    height: '100%',
    background: '#f9f9f9',
    backgroundColor: 'white',
    paddingLeft: 10,
  },
  title: {
    fontSize: 17.5,
    color: '#5e5e5e',
    paddingTop: 3,
  },
  mainDetail: {
    paddingTop: 17,
    paddingLeft: 17,
  },
  large: {
    width: theme.spacing(19),
    height: theme.spacing(19),
    border: '5px solid #9DE1FF',
  },
  doctorName: {
    paddingTop: 13,
    paddingLeft: 22,
    fontSize: 20,
    color: '#797979',
  },
  speciality: {
    paddingLeft: 21,
    fontSize: 13,
    color: '#a8a8a8',
  },
  subDetail: {
    paddingLeft: 40,
    paddingTop: 30,
    paddingBottom: 40,
  },
  detail: {
    paddingTop: 30,
  },
  name: {
    color: '#a8a8a8',
    fontSize: 14,
  },
  value: {
    fontSize: 17,
    color: '#716e6e',
  },
  location: {
    paddingTop: 35,
  },
}))

export default useDoctorDetailsStyle
