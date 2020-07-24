import {makeStyles} from '@material-ui/core'

const useStyle = makeStyles(() => ({
    dialogBox: {
        height: 915,
        width: 1580,
      },
      title: {
        fontSize: 23,
        color: 'black',
        textAlign: 'center',
        paddingLeft: 130,
      },
      closeIcon: {
        marginLeft: 110,
        marginTop: 5,
        cursor: 'pointer',
      },
      text: {
        textAlign: 'center',
      },
      msg: {
        fontSize: 11,
        color: '#a8a8a8',
      },
      txt: {
        width: 250,
        height: 25,
        backgroundColor: '#f7f7f7',
        marginLeft: 110,
        paddingTop: 5,
        fontSize: 11,
        marginTop: 10,
      },
      phoneText: {
        paddingLeft: 7,
        fontSize: 11.5,
      },
      phone: {
        width: 440,
        paddingLeft: 9,
        paddingTop: 5,
      },
      noteOne: {
        paddingTop: 5,
        paddingLeft: 9,
      },
      noteTwo: {
        paddingLeft: 9,
      },
      star: {
        width: 5,
        color: 'red',
        marginTop: -7,
      },
      noteText: {
        fontSize: 8,
        color: '#a8a8a8',
      },
      nextBtn: {
        width: 130,
        height: 35,
        backgroundColor: '#0bb5ff',
        borderRadius: 17,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 23,
        marginLeft: 165,
        paddingTop: 10,
        cursor: 'pointer',
      },
      nextText: {
        fontSize: 10,
        color: 'white',
      },
}))

export default useStyle