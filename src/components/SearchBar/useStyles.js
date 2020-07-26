import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  textField: {
    width: 210,
    color: '#c7c7c7',
    '& label': {
      fontSize: 13,
      color: '#c7c7c7',
    },

    '& div': {
      color: '#c7c7c7',
      marginTop: 8,
    },

    '& svg': {
      width: 16,
      marginRight: 2,
      marginTop: 10,
    },
  },
}))

export default useStyles
