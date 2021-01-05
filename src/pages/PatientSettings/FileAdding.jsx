import React,{useState} from 'react'
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import { Button,Typography,Box} from '@material-ui/core'
import pdfIcon  from  '../../assets/img/pdfIcon.svg'
import PatientReport from './PatientReport'
import useUpload from '../../hooks/useUpload'

const FileAdding=()=>{

    const [ open, setOpen] = useState(false)
    const [file, setFile] = useState([])
    const [handleUpload] = useUpload()
    const formdata = new FormData()

    function handlePopupMsg(){
        setOpen(true)
      }
   
      function handleClose() {
       setOpen(false)
     }

     const mystyle = {
        visibility:"hidden"
       };
     
       const imgStyle = {
         height:"45px",
         width:"45px",
         "border-radius":"10px"
        };
     
        const fontStyle= {
          margin: "0px",
          "font-family": "sans-serif",
          "font-size": "x-small"
        }
     
        function handlechange(e) {
        const item=e.target.files
        setFile([...file, ...item])
        const fileName = e.target.files[0];
        const patientId = localStorage.getItem('patientId');
        const patientName= localStorage.getItem('patientName') 


        formdata.append("files",e.target.files[0]);
        formdata.append("patientName", patientName);
        formdata.append("patientId", patientId); 

        handleUpload(formdata)
        }

        var allfiles = file.map((eachfile) => {
          return <img src={eachfile} style={imgStyle} />
        })
      
    return(
      <div>
          <div >    
             <div style={{display:"flex",lineHeight:"20px"}}>
             
              {file.map((value,index) => {
                  const fileName =file[index].name;
                  const filePath = value.url;
                  
                  const fileExtension = fileName.split('.').pop(); 
                    if(fileExtension==="pdf" && index < 3)
                    {
                    return (
                      <div style={{display:"grid",padding:"10px",paddingLeft: "0px"}}>
                      <img src={pdfIcon} alt='img1' style={imgStyle}  />
                      <span style={fontStyle}>{fileName}</span>
                      </div>
                      )
                    }
                    else if((fileExtension === "jpg"||fileExtension === "svg" || fileExtension === "png")&& index < 3)
                    {
                      return (
                      <div style={{display:"grid" ,padding:"10px"}}>
                      <img src={filePath} alt='img' style={imgStyle}  />
                      <span style={fontStyle}> { fileName } </span>
                      </div>
                      )
                    }
                    
                  })
                }
              

                  <label for="files" name="files" style={{display:"flex","align-items":"center"}} >
                  <AddCircleOutlineTwoToneIcon style={{marginBottom: "20px"}}color="disabled" size="large" />
                  </label>   
                  <input 
                  type="file"
                  multiple="multiple"  
                  name="files"  
                  onChange={handlechange}
                  id="files"
                  accept=".jpg,.svg,.png, .pdf"
                  style={mystyle} 
                    />                      
              </div> 
             
           </div> 
            <div>
            {
             (file.length > 3)?
                 <Button style={{border:"none",color:" #0bb5ff",fontSize: "12px",textTransform:"lowercase",paddingLeft: "0px"}}
                   onClick={handlePopupMsg} >View more
                 </Button>
                 :
                 <div></div>
            }  
               
             {
                open &&
                <PatientReport
                open={open}
                handleClose={handleClose}
                />
              } 
             
          </div>
      </div>
             
    )

}

export default FileAdding;