import { makeStyles } from '@material-ui/core/styles'
const useMedicinesubscriptionstyle = makeStyles(() => ({
                      title:{
                          color:'#2abade !important',
                          textAlign:'center',
                          fontSize:'30px !important',
                          '& h2': {
                            fontSize: 20,
                            color: '#2abade'
                          },
                      },
    holesize:{
        maxWidth: 500,
        height:500,
    },
    submit:{
      textTransform:'lowercase',
        color:'white',
        position:'relative',
        top:0,
        left:200,
        height:30,
        borderRadius: 8,
        backgroundColor:'#2abade',
        border: '1px solid #2abade',
        '&:hover': {
          backgroundColor: '#2abade',
        }
      },
      date:{
        display:'flex',
        color:'#9da3ab',
      },
      header:{
          m  :4,
          display:'flex',
          fontSize:13,
            position:'absolute',
            top:0,
            left:"43%",
      },
      closed: {
        cursor: 'pointer',
        position: 'absolute',
        right: 15,
      },
      added:{
        textTransform:'capitalize',
        position:'relative',
        top:0,
        left:40,
      },
      container: {
        height:700,
        position:'absolute',
        left:0,
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
}
))
export default useMedicinesubscriptionstyle