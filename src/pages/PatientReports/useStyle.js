import { makeStyles } from '@material-ui/core/styles'

const ReportStyle = makeStyles(() => ({
  holesize: {
    //width:'100%',
  },
  header: {
    paddingTop: '20px',
    paddingRight: '10px',
    paddingBottom: '20px',
    // maxWidth: 500,
  },
  title: {
    fontSize: 21,
    color: '#524646',
    textAlign: 'center',
    paddingLeft: 130,
    // maxWidth: 500,
  },
  closeIcon: {

    float: 'right',
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
  line: {
    display: "flex",
    paddingBottom: 5,
  },
  filename: {
    marginLeft: 40,
    borderBottom: 20,
    // color: #645a5a,
    fontSize: 12,
    maxWidth: 500,
  },
  logoImg: {
    width: 30,
    height: 30,
    marginLeft: 40,
    borderBottom: 20,
    paddingBottom: 5,
    marginBottom: 5,
  },
  bordersize: {
    width: '100%',
    height: 15,
  },
  inputField: {
    visibility: "hidden"
  },

  image: {
    height: "45px",
    width: "45px",
    "border-radius": "10px"
  },

  font: {
    margin: "0px",
    "font-family": "sans-serif",
    "font-size": "x-small",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "45px",
    textDecoration: "none",
    whiteSpace: "nowrap"

  },

  mainBox: {
    position: "relative",
    "overflow-y": "auto",
    padding: "20px",
    // width: "750px"
  },

  heading: {
    fontSize: " 20px ",
    color: "#2abade",
    // paddingLeft: "200px"
  },

  saveButton: {
    borderRadius: "10px",
    background: "#2abade",
    float: "right",
    color: "white",
    height: "30px",
    fontSize: "16px",
    textTransform: "lowercase",
    outline: 'none'
  },



  reportText: {
    width: "100%",
    color: "currentColor",
    fontFamily: "'product-sans-regular',sans-serif",
    fontSize: "13.5px"
  },

  files: {
    display: "flex",
    lineHeight: "20px"
  },

  selectFile: {
    fontSize: " 16px ",
    color: "#2abade",
    cursor: "pointer"
  },

  firstReportFile: {
    display: "grid",
    paddingLeft: "0px",
    marginRight: "20px"
  },

  reportFiles: {
    display: "grid",
    marginRight: "20px"
  },

  reportLeft: {
    float: "left !important"
  },

  addbtn: {
    textTransform: "none",
    fontWeight: 500,
    color: 'rgb(11 181 255)',
    borderRadius: '25px',
    alignItem: 'right',
    marginTop: '10px',


  },

  prevbtnShow: {
    padding: "2px",
    color: "#ffffff",
    textTransform: 'capitalize',
  },

  nextbtn: {
    padding: "2px",
    color: "#ffffff",
    textTransform: 'capitalize'
  },

  next: {
    position: "absolute",
    right: "0%",
    borderRadius: "20px",
    color: "#ffffff",
    backgroundColor: "rgb(11, 181, 255)"
  },

  prev: {
    padding: "1px",
    borderRadius: "20px",
    color: "#ffffff",
    backgroundColor: "rgb(11, 181, 255)",
    marginRight: "20px"
  },
  pagination: {
    display: 'flex',
    paddingTop: "20px"
  },
  searchReport: {
    display: "flex",
    float: "right"
  },
  addButton: {
    display: "flex"
  },
})
)
export default ReportStyle