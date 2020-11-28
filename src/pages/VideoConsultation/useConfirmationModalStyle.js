import { makeStyles } from '@material-ui/core/styles'

const useConfirmationModalStyle = makeStyles(() => ({
  dialog: {
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 1000,
    },
  },
  content: {
    width: 980,
    height: 520,
  },
  icon: {
    textAlign: 'end',
  },
  closeIcon: {
    cursor: 'pointer',
    color: '#e81a40',
  },
  videoBox: {
    width: 450,
    height: 400,
    border: '1px solid #a8a8a8',
  },
  button: {
    textAlign: 'center',
    paddingTop: 10,
  },
  joinButton: {
    paddingLeft: 150,
    paddingRight: 150,
    borderRadius: 5,
    color: '#ffffff',
  },
  errorMsg: {
    color: '#ea2121',
    paddingTop: 5,
  },
  message: {
    color: '#ea2121',
    fontSize: 17,
    paddingTop: 12,
  },
  header: {
    textAlign: 'center',
    backgroundColor: '#d8d6d6',
    height: 30,
  },
  text: {
    paddingTop: 5,
  },
  right: {
    width: 425,
    paddingLeft: 75,
  },
  waiting: {
    width: 380,
    height: 280,
  },
  join: {
    width: 380,
    height: 280,
  },
  nickName: {
    paddingTop: 20,
  },
  personbutton: {
    marginTop: 16,
    padding: 7,
    backgroundColor: '#e3dede',
    marginRight: 20,
  },
  name: {
    width: 400,
  },
  microPhone: {
    width: 400,
    '& div': {
      width: 380,
      '& div': {
        paddingTop: 14,
      },
    },
  },
  microPhoneButton: {
    padding: 7,
    marginRight: 20,
    backgroundColor: '#e3dede',
  },
  videoButton: {
    padding: 7,
    marginRight: 20,
    backgroundColor: '#e3dede',
  },
  shareButton: {
    color: '#dd1515',
    padding: 7,
    marginRight: 20,
    backgroundColor: '#e3dede',
  },
  video: {
    width: 400,
    '& div': {
      width: 380,
      '& div': {
        paddingTop: 14,
      },
    },
  },
  screen: {
    width: 400,
  },
  selecedTab: {
    backgroundColor: '#000000',
  },
  error: {
    color: '#ffffff',
    fontSize: 20,
  },
  errorBox: {
    paddingTop: 160,
    textAlign: 'center',
  },
  cameraOff: {
    width: 35,
  },
  fieldName: {
    fontSize: 15,
    paddingRight: 5,
    color: '#16d9be',
  },
  value: {
    fontSize: 14,
    paddingTop: 2,
  },
  box: {
    justifyContent: 'center',
  },
  videoIcon: {
    width: 27,
    height: 27,
  },
  icons: {
    justifyContent: 'center',
  },
  iconButton: {
    marginLeft: 30,
    background: '#ffffff',
    width: 60,
    height: 60,
    '&:hover': {
      background: '#ffffff',
    },
  },
  videoOff: {
    background: '#000000',
  },
  details: {
    paddingLeft: 10,
  }
}))

export default useConfirmationModalStyle
