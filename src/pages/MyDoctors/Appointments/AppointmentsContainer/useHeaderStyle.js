import { makeStyles } from '@material-ui/core/styles'

const useHeaderStyle = makeStyles(() => ({
  container: {
    width: '100%',
    background: '#f9f9f9',
    backgroundColor: 'white',
    paddingTop: 20,
    height: 70,
  },
  search: {
    width: 22,
    color: '#a8a8a8',
  },
  select: {
    color: '#a8a8a8',
    height: 27,
    width: 70,
    borderLeft: '1px solid #a8a8a8',
    borderTop: '1px solid #a8a8a8',
    borderRight: '1px solid #a8a8a8',
    '& select': {
      paddingLeft: 5,
      fontSize: 13,
      paddingBottom: 10,
      width: 50,
    },
    '& svg': {
      paddingLeft: 9,
      marginRight: -5,
    },
  },
  imgSize: {
    width: 15,
  },
  menu: {
    width: 22,
    color: '#c8c8c8',
    paddingBottom: 1,
  },
  left: {
    paddingLeft: 10,
  },
  date: {
    marginLeft: 10,
    marginTop: 2,
    height: 23,
    border: '1px solid #f4f4f4',
    borderRadius: 3,
    '& p': {
      fontSize: 9,
      paddingTop: 3,
      paddingLeft: 5,
      color: '#dadada',
    },
  },
  eventIcon: {
    fontSize: 16,
    marginTop: 2,
    marginLeft: 17,
    color: '#dadada',
  },
  arrowBackward: {
    width: 12,
    marginTop: 2,
    marginLeft: 10,
    color: '#b3a3a3',
    cursor: 'pointer',
  },
  arrowForward: {
    width: 12,
    marginTop: 2,
    color: '#b3a3a3',
    cursor: 'pointer',
  },
  text: {
    paddingTop: 2,
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: 2,
  },
  txt: {
    paddingRight: 10,
    fontSize: 9,
    color: '#a8a8a8',
    paddingTop: 7,
  },
  freeSlot: {
    width: 8,
    color: '#4edb88',
    marginTop: 2,
    marginRight: 8,
  },
  booked: {
    width: 8,
    color: '#aab5c2',
    marginTop: 2,
    marginRight: 8,
  },

  blocked: {
    width: 8,
    color: '#0bb5ff',
    marginTop: 2,
    marginRight: 8,
  },
  selectBox: {
    paddingRight: 2,
    paddingLeft: 3,
    marginTop: -2,
    marginRight: 20,
    '& div': {
      width: 70,
    }
  },
}))

export default useHeaderStyle
