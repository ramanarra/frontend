import { makeStyles } from '@material-ui/core/styles'

const useListStyle = makeStyles(() => ({
  container: {
    marginLeft: 18,
    marginBottom: 10,
    marginRight: 10,
    background: '#f9f9f9',
    backgroundColor: 'white',
  },
  box: {
    width: 145,
    height: 42,
    cursor: 'pointer',
  },
  day: {
    textAlign: 'center',
    fontSize: 11,
    color: '#c7c7c7',
    paddingTop: 4,
    paddingBottom: 10,
    letterSpacing: 1,
  },
  date: {
    textAlign: 'center',
    fontSize: 14.5,
    letterSpacing: 2,
    fontWeight: 600,
  },
}))

export default useListStyle
