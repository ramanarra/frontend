import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles(() => ({
  container: {
    width: '100%',
    padding: '17px 20px 20px 20px',
    height: '100%',
    background: '#f9f9f9',
  },
  header: {
    width: '97.7%',
    background: '#f9f9f9',
    backgroundColor: 'white',
    height: 95,
    padding: '0px 14px',
    boxShadow: '5px 0px 15px 0px #f3eeee',
  },
  doctorList: {
    width: '100%',
    height: 'calc(100% - 95px)',
    overflowY: 'auto',
  },
  heading: {
    fontSize: 17.5,
    color: '#797777',
    paddingTop: 10,
    paddingLeft: 15,
  },

  searchField: {
    width: 340,
    paddingTop: 20,
    '& div': {
      height: 32,
      paddingRight: 8,
      borderRadius: 5,
      border: '1px  solid #c0bfbf',
    },
    '& svg': {
      width: 15,
      marginRight: 2,
      marginTop: 3,
    },
    '& fieldset': {
      marginLeft: -0.5,
      marginTop: 1,
    },
  },
  leftArrow: {
    width: 20,
    cursor: 'pointer',
    height: '3.7%',
    marginTop: 10.5,
  },
}))

export default useStyle
