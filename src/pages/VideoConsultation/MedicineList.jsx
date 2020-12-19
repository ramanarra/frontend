import React, { useState } from 'react'
import { Box, Button, makeStyles, TextField, Checkbox, Typography } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { connect } from 'react-redux'
import moment from 'moment'
import Medicinesubscription from './Medicinesubscription'
import { setOpenSideBar } from '../../actions/doctor'
import usestyle from './useMedicineListStyle'
import { event } from 'jquery'
import EditIcon from '@material-ui/icons/Edit';
const useStyle = makeStyles(() => ({
  medicineField: {
    width: 170,
  },
  checkBox: {
    borderColor:' #bdc7c9',
    height: 40,
    width: 40,
  }
}))

function MedicineListEntry({subIndex, data,test, handleOnCheckeboxChange, handleOnCheckmboxChange, handleOnChecknboxChange, handleOnMedicine,handleAddMedicine,MedicineList, handleOnEdit}) {
  const style = useStyle()

 
  return (
    <Box >
      {
        subIndex === 0 &&
        <Box style={{fontSize:14, display: 'flex', 
       }}>
        <Box style={{ position: 'relative',left: '180px'}}>Mor</Box>
        <Box style={{ position: 'relative',left: '190px'}}>Noon  </Box>
        <Box style={{ position: 'relative',left: '205px'}}>Eve</Box>
       </Box>
      }
      <TextField className={style.medicineField} value={data.medicineName} 
      onChange={(event) => {
          handleOnMedicine(event,subIndex)
        }} 
        disabled={true}
        />

      <Checkbox
        className={style.checkBox}
        color="primary"
        checked={data.mrg}
        onChange={() => handleOnCheckmboxChange( data.mrg,subIndex)}
        disabled={true}
      />
      <Checkbox
        className={style.checkBox}
        color="primary"
        checked={data.noon}
        onChange={() => handleOnChecknboxChange(data.noon,subIndex)}
        disabled={true}
      />
      <Checkbox
        className={style.checkBox}
        color="primary"
        checked={data.eve}
        onChange={() => handleOnCheckeboxChange(data.eve,subIndex)}
        disabled={true}
      />
      
      <EditIcon onClick={() => handleOnEdit(data, subIndex)} color="primary" />
    </Box>
  )
}

function MedicineList({ onClose, setOpenTopBar, setOpenSideBar }) {
  const classes = usestyle()
  const currentDate = moment().format('DD/MM/YYYY')
  const [list, setList] = useState([])
  const[open,setOpen]=useState(false)
  const[seperate,setCeperate]=useState(false)
  const [existList, setExistList] = useState([])
  const [subIndex, setIndex] = useState(null)
  function handleOnClose() {
    onClose()
    setOpenTopBar(false)
    setOpenSideBar(false)
  }
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
  function handleonedit(){
    setCeperate(true);
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
  function handlesubscription(){
    setOpen(true)
  }
  function handlesubscriptionclose(){
    setOpen(false)
    setCeperate(false)
  }

  function handleAddMedicineList (medicineList) {
    if(seperate) {
      console.log('medicine list ', medicineList[0])
      let newList = [...list]
      newList.map((data, index) => {
        if(index === subIndex) {
          newList[index] = medicineList[0]
        }
      })
      setList(newList)
      setOpen(false)
      setExistList([])
      setIndex(null)
    }
    else {
    let newList = [...list]
    medicineList.map(list => {
      newList.push(list)
    })
    setList(newList)
    setOpen(false)
  }
  }

  function handleOnEdit(data, index) {
    setCeperate(true)
    setOpen(true)
    setIndex(index)
    let list = [...existList]
    list.push(data)
    setExistList(list)
  }
  console.log(list, 'main list')

  return (
    <Box>
      <Box className={classes.backButton}>
        <ArrowForwardIosIcon onClick={handleOnClose} className={classes.icon} />
      </Box>
      
      <Box className={classes.container}> 
      <Box className={classes.date}>
        <Typography>Date: </Typography>
  <Typography style={{color:'#363838'}}>{ currentDate}</Typography>
      </Box>
        <Box>
        {list.length > 0 &&
        list.map((data, index) => <MedicineListEntry subIndex={index} data={data} handleOnCheckeboxChange={handleOnCheckeboxChange} handleOnCheckmboxChange={handleOnCheckmboxChange}
          handleOnChecknboxChange={handleOnChecknboxChange} handleOnMedicine={handleOnMedicine} handleOnEdit={handleOnEdit}
          /> )}
          </Box>
        <Box className={classes.add}>
          <Button  className={classes.added} onClick={handlesubscription} color="primary" >+ Add Prescription</Button>
        </Box>
        <Box>
          {
            open &&
             <Medicinesubscription
              open={open}
              handlesubscriptionclose={handlesubscriptionclose}
               handleOnMedicine={handleOnMedicine}
          handleAddMedicineList={handleAddMedicineList} 
          seperate={seperate}
          existList= {existList}
            />}
          
          </Box>
          <Box>
            { list.length>0&&
        <Button className={classes.submit} >submit</Button>
            }
        </Box>
      </Box>
     
    </Box>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setOpenSideBar: (data) => dispatch(setOpenSideBar(data)),
  }
}

export default connect(null, mapDispatchToProps)(MedicineList)

