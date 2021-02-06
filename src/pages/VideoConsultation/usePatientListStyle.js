import { makeStyles } from '@material-ui/core/styles'

const usePatientListStyle = makeStyles((theme) => ({
  dialog: {
    position: 'absolute',
    right: 0,
    margin: 0,
    top: 56,
    backgroundColor: '#ffffff',
    width: '23%',
    padding: '25px 15px 10px 23px',
    height: 'calc(100% - 63px)',
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
  patientDetails: {
    paddingBottom: 8,
    paddingTop: 8,
    cursor: 'pointer',
    height: 75,
  },
  icon: {
    marginTop: 7.5,
    marginLeft: 8,
    color: '#a8a8a8',
  },
  photo: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  detail: {
    paddingTop: 4.5,
    paddingLeft: 15,
  },
  firstName: {
    fontSize: 13,
    color: '#312f2f',
  },
  lastName: {
    paddingLeft: 2,
    fontSize: 13,
    color: '#312f2f',
  },
  next: {
    fontSize: 9,
    color: '#16c5ed',
    paddingLeft: 5,
    paddingTop: 2.5,
  },
  meetingTime: {
    paddingTop: 5,
    fontSize: 10,
    color: '#a8a8a8',
  },
  selecedTab: {
    backgroundColor: '#e6f7ff',
    borderLeft: '3px solid #20cfe1',
    paddingLeft: 10,
  },
  onlineStatus: {
    width: 13,
    color: '#20ff05',
    position: 'relative',
    left: 35,
    bottom: 19,
  },
  offlineStatus: {
    width: 13,
    color: '#a5a5a5',
    position: 'relative',
    left: 35,
    bottom: 19,
  },
  videoSessionReady: {
    width: 13,
    color: '#f0ff05',
    position: 'relative',
    left: 35,
    bottom: 19,
  },
  inSession: {
    width: 13,
    color: '#ff0000',
    position: 'relative',
    left: 35,
    bottom: 19,
  },
  pausedIcon: {
    width: 13,
    color: '#ef00ff',
    position: 'relative',
    left: 35,
    bottom: 19,
  },
  spinner: {
    marginLeft: '45%',
    marginTop: 20
  },
}))

export default usePatientListStyle
