import { makeStyles } from '@material-ui/core/styles'

const usePatientAppointmentSlotStyle = makeStyles(() => ({
  container: {
    width: 675,
    background: '#f9f9f9',
    backgroundColor: 'white',
    padding: '11px 8px 30px 30px',
    boxShadow: '5px 0px 15px 0px #f3eeee',
    marginBottom: 20,
    marginRight: 12,
    cursor: 'pointer',
  },
  timing: {
    justifyContent: 'flex-end',
    paddingRight: 10,
    color: '#a8a8a8',
  },
  scheduleIcon: {
    width: 18,
    marginRight: 5,
    marginTop: -1,
  },
  time: {
    fontSize: 15,
  },
  date: {
    fontSize: 53,
    letterSpacing: 2,
  },
  month: {
    fontSize: 20,
    paddingLeft: 8,
    letterSpacing: 0.5,
    variant: 'h5',
  },
  doctorDetails: {
    paddingLeft: 42,
    paddingTop: 9,
  },
  name: {
    variant: 'h5',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  hospitalName: {
    paddingTop: 6,
    fontSize: 15,
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
