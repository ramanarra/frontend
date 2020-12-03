import { makeStyles } from '@material-ui/core/styles'

const useChatStyle = makeStyles(() => ({
  container: {
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
  icon: {
    marginTop: 7.5,
    marginLeft: 8,
    color: '#a8a8a8',
  },
  messageBox: {
    position: 'absolute',
    bottom: 20,
    borderBottom: '1px solid',
    boxShadow: '0px 0px 3px 0px',
  },
  text: {
    width: 285,
    height: 30,
    border: 'none',
    resize: 'none',
    outline: 'none',
    marginLeft: 10,
  },
  sentIcon: {
    width: 15,
    cursor: 'pointer',
    marginRight: 10,
    marginTop: 5,
  },
  messageContainer: {
    overflowY: 'auto',
    height: '100%',
  },
  senderHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  sender: {
    color: '#ffffff',
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '10px 0px',
    width: 'fit-content',
    boxShadow: '5px 0px 15px 0px #f3eeee',
    background: '#00b5ff',
    borderRadius: 5,
  },
  receiver: {
    color: '#ffffff',
    display: 'flex',
    margin: '20px 0px',
    width: 'fit-content',
    boxShadow: '5px 0px 15px 0px #f3eeee',
    background: '#000000',
    borderRadius: 5,
  },
  textMessage: {
    padding: 6,
  },
}))

export default useChatStyle
