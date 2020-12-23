import React, { useState, useEffect } from 'react'
import { Box, Button, makeStyles, TextField, DialogTitle, Dialog } from '@material-ui/core'
import moment from 'moment'

import usestyle from './useMedicinesubscriptionstyle'
import CloseIcon from '@material-ui/icons/Close'


function MedicinesubscriptionList({ subIndex, data, handleOnMedicine, handleOnMedicinedoseOfMedicine, handleOncountOfDays }) {
  const useStyle = makeStyles(() => ({
    holesize: {
      maxWidth: 800,
      height: 350,
    },
    medicineField: {
      width: 150,
    },
    quantityField: {
      marginLeft: 25,
      width: 75,
    },
    commentField: {
      marginLeft: 55,
      width: 170,
    },
    checkBox: {
      borderColor: ' #bdc7c9',
      height: 40,
      width: 40,
    },
    holebox: {
      width: '600px',
      paddingTop: '5px',
      paddingBottom: '5px',
      paddingLeft: '50px',
    }
  }))
  const style = useStyle()

  return (
    <Box>
      <Box className={style.holebox}>
        {subIndex === 0 &&
          <Box >

            <Box style={{ fontSize: 14, display: 'flex', paddingBottom: '5px' }}>
              <Box style={{ position: 'relative' }}>Medicine Name</Box>
              <Box style={{ position: 'relative', left: '80px' }}>Quantity/Dosage</Box>
              <Box style={{ position: 'relative', left: '104px' }}>Comments</Box>
            </Box>
          </Box>
        }

        <Box style={{ display: 'flex' }} className={style.textfield}>
          <TextField className={style.medicineField} value={data.nameOfMedicine} placeholder="Paracetamal"
            onChange={(event) => { handleOnMedicine(event, subIndex) }} />

          <TextField className={style.quantityField} value={data.doseOfMedicine} placeholder="10ml/mg"
            onChange={(event) => { handleOnMedicinedoseOfMedicine(event, subIndex) }} />

          <TextField className={style.commentField} value={data.countOfDays} placeholder="comment on medicine"
            onChange={(event) => { handleOncountOfDays(event, subIndex) }} />
        </Box>

      </Box>
    </Box>

  )



}
function Medicinesubscription({ open, handlesubscriptionclose, handleOnMedicine, handleAddMedicineList, seperate, existList }) {
  const classes = usestyle()
  const [list, setList] = useState([])

  useEffect(() => {
    if (seperate) {
      let medicine = existList
      let medicineList = [...list]
      medicineList.push(medicine)
      setList(existList)
    }
    else {
      let medicine = { nameOfMedicine: '', doseOfMedicine: '', countOfDays: '' }
      let medicineList = [...list]
      medicineList.push(medicine)
      setList(medicineList)
    }
  }, [])

  function handleOnMedicine(event, subIndex) {
    const { value } = event.target
    console.log(list);
    setList(prev => prev.map((i, index) => {
      if (index === subIndex) return { ...i, nameOfMedicine: value }
      return i
    }))
  }

  function handleOnMedicinedoseOfMedicine(event, subIndex) {
    const { value } = event.target
    console.log(list);
    setList(prev => prev.map((i, index) => {
      if (index === subIndex) return { ...i, doseOfMedicine: value }
      return i
    }))
  }

  function handleOncountOfDays(event, subIndex) {
    const { value } = event.target
    console.log(list);
    setList(prev => prev.map((i, index) => {
      if (index === subIndex) return { ...i, countOfDays: value }
      return i
    }))
  }

  function handleAddMedicine() {
    let medicine = { nameOfMedicine: '', doseOfMedicine: '', countOfDays: '' }
    let medicineList = [...list]
    medicineList.push(medicine)
    setList(medicineList)
  }

  console.log(list);

  return (
    <Box style={classes.dialogBox}>

      <Dialog open={open} >
        <Box >

          <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DialogTitle className={classes.title}>Medicine List</DialogTitle>
            <CloseIcon className={classes.closed} onClick={handlesubscriptionclose} />
          </Box>
          <Box>
            {
              list.map((data, index) => < MedicinesubscriptionList subIndex={index} data={data}
                handleOnMedicine={handleOnMedicine} handleOnMedicinedoseOfMedicine={handleOnMedicinedoseOfMedicine} handleOncountOfDays={handleOncountOfDays}
              />)}
          </Box>
          <Box className={classes.add}>
            {
              !seperate &&

              <Button onClick={handleAddMedicine} className={classes.added} color="primary" >+ Add Medicine</Button>
            }
          </Box>
          <Box style={{ textAlign: 'center', paddingBottom: '20px' }}>
            {list.length > 0 &&
              <Button className={classes.submit} onClick={() => handleAddMedicineList(list)} >save</Button>
            }
          </Box>
        </Box>
      </Dialog>
    </Box>
  )
}
export default Medicinesubscription