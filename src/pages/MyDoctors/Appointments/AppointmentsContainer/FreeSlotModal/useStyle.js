import {makeStyles} from '@material-ui/core'

const useStyle = makeStyles(() => ({
    dialogBox: {
        height: 915,
        width: 1580,
      },
      title: {
        fontSize: 21,
        color: 'black',
        textAlign: 'center',
        paddingLeft: 133,
      },
      closeIcon: {
        marginLeft: 130,
        marginTop: 4,
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
        width: 245,
        height: 25,
        backgroundColor: '#f7f7f7',
        marginLeft: 110,
        paddingTop: 5,
        fontSize: 10,
        marginTop: 10,
      },
      phoneText: {
        paddingLeft: 7,
        fontSize: 11.5,
      },
      phone: {
        width: 443,
        paddingLeft: 9,
        paddingTop: 6,
        '& div': {
          marginTop: 0,
          marginBottom: 0,
          '& .MuiInputBase-root': {
            height: 40,
            '& input': {
              marginTop: -5,
            }
          },
        },
        
      },
      dropDown: {
        width: 450,
        minHeight: 0,
        maxHeight: 100,
        overflow: 'auto',
        paddingLeft: 7,
      },
      option: {
        width: 437,
        height: 45,
        cursor: 'pointer'
      },
      phoneNumber: {
        fontSize: 12,
        paddingLeft: 16,
        paddingTop: 5,
      },
      detail: {
        fontSize: 9,
        paddingLeft: 16,
        color: '#a8a8a8',
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