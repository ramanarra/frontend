import { makeStyles } from '@material-ui/core/styles'

const useNewPatientConfirmationStyle = makeStyles(() => ({
  icon: {
    textAlign: 'end',
    paddingTop: 20,
  },
  closeIcon: {
    cursor: 'pointer',
    marginRight: -12,
    color: '#a8a8a8',
  },
  text: {
    fontSize: 19,
    paddingTop: 15,
    color: '#4f4f4f',
  },
  buttons: {
    paddingTop: 40,
    paddingBottom: 20,
    justifyContent: 'center',
  },
  cancelButton: {
    padding: '8.5px 26px',
    borderRadius: 20,
    backgroundColor: '#e1e0e0',
    marginRight: 15,
    cursor: 'pointer',
  },
  cancelText: {
    fontSize: 12,
    color: '#a8a8a8',
  },
  pauseButton: {
    padding: '8.5px 26px',
    borderRadius: 20,
    border: '1px solid #0bb5ff',
    marginRight: 15,
    cursor: 'pointer',
  },
  pauseText: {
    fontSize: 12,
    color: '#0bb5ff',
  },
  confirmButton: {
    padding: '8.5px 38px',
    borderRadius: 20,
    backgroundColor: '#0eabff',
    cursor: 'pointer',
  },
  confirmText: {
    fontSize: 12,
    color: '#f7f7f7',
  },
}))

export default useNewPatientConfirmationStyle
