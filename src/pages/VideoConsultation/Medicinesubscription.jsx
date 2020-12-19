import React, { useState, useEffect } from 'react'
import { Box, Button, makeStyles, TextField, Checkbox, Typography,DialogTitle,Dialog } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { connect } from 'react-redux'
import moment from 'moment'

import { setOpenSideBar } from '../../actions/doctor'
import usestyle from './useMedicinesubscriptionstyle'
import { event } from 'jquery'
import CloseIcon from '@material-ui/icons/Close'


function MedicinesubscriptionList({subIndex, data,test, handleOnCheckeboxChange, handleOnCheckmboxChange, handleOnChecknboxChange, handleOnMedicine}){
   const useStyle = makeStyles(() => ({
    holesize:{
        maxWidth: 350,
        height:350,
    },
    medicineField: {
      width: 200,
    },
    checkBox: {
      borderColor:' #bdc7c9',
      height: 40,
      width: 40,
    },
     holebox:{ 
         width:350,
        padding:10,
    },
   
  }))
    const style=useStyle()
  
    return(
        <Box >
 <Box className={style.holebox} >
    <Box >
      {
        subIndex===0 &&
        <Box style={{fontSize:14, display: 'flex', 
       }}>
        <Box style={{ position: 'relative',left: '214px'}}>Mor</Box>
        <Box style={{ position: 'relative',left: '224px'}}>Noon  </Box>
        <Box style={{ position: 'relative',left: '238px'}}>Eve</Box>
       </Box>
      }
      <TextField className={style.medicineField} value={data.medicineName} 
      onChange={(event) => {
          handleOnMedicine(event,subIndex)
        }} />

      <Checkbox
        className={style.checkBox}
        color="primary"
        checked={data.mrg}
        onChange={() => handleOnCheckmboxChange( data.mrg,subIndex)}
      />
      <Checkbox
        className={style.checkBox}
        color="primary"
       checked={data.noon}
        onChange={() => handleOnChecknboxChange(data.noon,subIndex)}
      />
      <Checkbox
        className={style.checkBox}
        color="primary"
        checked={data.eve}
        onChange={() => handleOnCheckeboxChange(data.eve,subIndex)}
      />

             </Box>
        </Box>

        </Box>
        
        
    )



}
function Medicinesubscription({open,handlesubscriptionclose, handleOnMedicine, handleAddMedicineList,seperate, existList}){
    const classes = usestyle()
    const currentDate = moment().format('DD/MM/YYYY')
    const [list, setList] = useState([])

    useEffect(() => {
      if(seperate) {
        let medicine = existList[0]
        let medicineList = [...list]
      medicineList.push(medicine)
      setList(medicineList)
      }
      else {
      let medicine = { medicineName: '', mrg: false, noon: false, eve: false }
      let medicineList = [...list]
      medicineList.push(medicine)
      setList(medicineList)
      }
    }, [])
    function handleOnCheckmboxChange(event,subIndex) {
      let medicineList = [...list]
      medicineList[subIndex].mrg = !medicineList[subIndex].mrg
      setList(medicineList)
    }
    function handleOnChecknboxChange(event,subIndex) {
      let medicineList = [...list]
      medicineList[subIndex].noon = !medicineList[subIndex].noon
      setList(medicineList)
    }
    function handleOnCheckeboxChange(event,subIndex) {
      let medicineList = [...list]
      medicineList[subIndex].eve = !medicineList[subIndex].eve
      setList(medicineList)
    }
  
    function handleOnMedicine( event, subIndex) {
      const {value} = event.target
      console.log(list);
      setList(prev => prev.map((i, index) => {
        if(index === subIndex) return {...i, medicineName: value}
        return i
      }))
    }
    function handleAddMedicine() {
      let medicine = { medicineName: '', mrg: false, noon: false, eve: false }
      let medicineList = [...list]
      medicineList.push(medicine)
      setList(medicineList)
    }

  
    return (
      <Box style={classes.dialogBox}>
        
        <Dialog open={open} >
        <Box >  
        
         <Box style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}> 
         <DialogTitle className={classes.title}>Medicine List</DialogTitle>
         <CloseIcon className={classes.closed} onClick={handlesubscriptionclose} />
         </Box>
          <Box>
          {
          list.map((data, index) => < MedicinesubscriptionList subIndex={index} data={data} handleOnCheckeboxChange={handleOnCheckeboxChange} handleOnCheckmboxChange={handleOnCheckmboxChange}
            handleOnChecknboxChange={handleOnChecknboxChange} handleOnMedicine={handleOnMedicine} 
            /> )}
            </Box>
          <Box className={classes.add}>
            { 
            !seperate &&
            <Button onClick={handleAddMedicine} className={classes.added}  color="primary" >+ Add Medicine</Button>
          }
          </Box>
          <Box style={{ textAlign: 'center', paddingBottom: '20px' }}>
            { list.length>0&&
        <Button className={classes.submit} onClick={() => handleAddMedicineList(list)} >save</Button>
            }
        </Box>
        </Box>
        </Dialog>
      </Box>
    )
}
export default Medicinesubscription