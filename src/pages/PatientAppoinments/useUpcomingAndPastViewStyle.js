import { makeStyles } from '@material-ui/core/styles'

const useUpcomingAndPastViewStyle = makeStyles(() => ({
  dialogBox: {
    height: 900,
    '& .MuiDialog-paper': {
      maxWidth: 950,
    },
  },
  title: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6a6a6a',
  },
  heading: {
    paddingLeft: 310,
    fontSize: 20,
  },
  closeIcon: {
    marginLeft: 340,
    marginBottom: 7,
    cursor: 'pointer',
  },
  details: {
    paddingLeft: 75,
  },
  rightSide: {
    paddingLeft: 68,
  },
  name: {
    fontSize: 16,
    color: '#a8a8a8',
  },
  value: {
    fontSize: 16,
    paddingTop: 2,
    paddingLeft: 5,
  },
  nameAndValuePair: {
    paddingBottom: 30,
  },
  time: {
    paddingBottom: 30,
  },
  download: {
    color: '#37befa',
    cursor: 'pointer',
  },
  downloadIcon: {
    width: 18,
  },
  prescription: {
    paddingBottom: 35,
  },
  preConsultaion: {
    paddingLeft: 68,
  },
  infoIcon: {
    width: 18,
    color: '#37befa',
  },
  preConsultaionTime: {
    color: '#37befa',
    paddingLeft: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 180px',
    paddingTop: 30,
    paddingBottom: 10,
  },
  startConsultationButton: {
    padding: '6px 20px',
    backgroundColor: '#0bb5ff',
    borderRadius: 17,
    textAlign: 'center',
    cursor: 'pointer',
    marginRight: 15,
  },
  startConsultationText: {
    fontSize: 10,
    color: '#f7f7f7',
    paddingTop: 2,
  },
  hoursToJoinText: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    paddingLeft: 13,
  },
  starIcon: {
    width: 10,
    color: '#f33b3b',
    marginTop: -5,
  },
  text: {
    fontSize: 16.5,
    color: '#a8a8a8',
  },
  rescheduleButton: {
    marginRight: 15,
    padding: '5px 40px',
    borderRadius: 17,
    border: '1.5px solid #0bb5ff',
    cursor: 'pointer',
  },
  disableReschduleButton: {
    marginRight: 15,
    padding: '5px 40px',
    borderRadius: 17,
    border: '1.5px solid #e4e3e3',
    backgroundColor: '#efefef',
  },
  rescheduleText: {
    fontSize: 10.5,
    color: '#0bb5ff',
  },
  disableRescheduleText: {
    fontSize: 10.5,
    color: '#8a8a8a',
  },
  cancelButton: {
    padding: '6px 47px',
    borderRadius: 17,
    backgroundColor: '#e4e3e3',
    cursor: 'pointer',
  },
  disableCancelButton: {
    padding: '6px 47px',
    borderRadius: 17,
    border: '1.5px solid #e4e3e3',
    backgroundColor: '#efefef',
  },
  cancelText: {
    fontSize: 10.5,
    color: '#7a7979',
  },
}))

export default useUpcomingAndPastViewStyle
