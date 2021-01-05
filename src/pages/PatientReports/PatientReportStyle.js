import { makeStyles } from '@material-ui/core/styles'

const PatientReportStyle = makeStyles(() => ({
    holesize:{
        //width:'100%',
    },
    header: {
        paddingTop: '20px',
        paddingRight: '10px',
        paddingBottom: '20px',
        maxWidth: 500,
      },
      title: {
        fontSize: 21,
        color: '#524646',
        textAlign: 'center',
        paddingLeft: 130,
       // maxWidth: 500,
      },
      closeIcon: {
        
        float:'right',
       // marginRight:10,
        cursor: 'pointer',
      },
      root: {
        width: '100%',
        height: 400,
        maxWidth: 500,
      //  marginBottom:-15,
        //backgroundColor:palette.background.paper,
      },
      line:{
        display:"flex",
        paddingBottom:5,
      },
      filename:{
            marginLeft:40,
            borderBottom:20,
           // color: #645a5a,
    fontSize: 12,
    maxWidth: 500,
      },
      logoImg:{
          width:30,
          height:30,
          marginLeft:40,
          borderBottom: 20,
          paddingBottom:5,
          marginBottom:5,
      },
      bordersize:{
        width: '100%',
        height: 15,
      }

})
)
export default PatientReportStyle