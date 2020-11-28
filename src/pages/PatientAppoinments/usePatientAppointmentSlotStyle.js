import { makeStyles } from '@material-ui/core/styles'

const usePatientAppointmentSlotStyle = makeStyles(() => ({
  topContainer: {
    width: '50%'
  },
  container: {
    width: '98%',
    background: '#f9f9f9',
    backgroundColor: 'white',
    padding: '1.5% 1% 4.3% 4.5%',
    boxShadow: '5px 0px 15px 0px #f3eeee',
    marginBottom: '3%',
    // marginRight: 12,
    cursor: 'pointer',
  },
  timing: {
    justifyContent: 'flex-end',
    paddingRight: '2%',
    color: '#a8a8a8',
  },
  scheduleIcon: {
    width: '2.8%',
    marginRight: '1%',
    marginTop: -1,
  },
  time: {
    fontSize: '75%',
  },
  date: {
    fontSize: '262%',
    letterSpacing: 2,
  },
  month: {
    fontSize: '100%',
    paddingLeft: '12%',
    letterSpacing: 0.5,
    variant: 'h5',
  },
  doctorDetails: {
    paddingLeft: '6.5%',
    paddingTop: '1.5%',
  },
  name: {
    variant: 'h5',
    fontSize: '80%',
    letterSpacing: 0.5,
  },
  hospitalName: {
    paddingTop: '5%',
    fontSize: '75%',
    color: '#8c8a8a',
    letterSpacing: 0.5,
  },
  infoIcon: {
    width: 17,
    color: '#37befa',
    marginTop: 6,
    marginLeft: -3,
  },
  preConsultaion: {
    paddingTop: 7,
    paddingLeft: 3,
    fontSize: 15,
    color: '#37befa',
    letterSpacing: 0.5,
  },
}))

export default usePatientAppointmentSlotStyle
