import React, { useState } from 'react'
import { Box, makeStyles } from '@material-ui/core'
import { Edit, Check, Clear } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton'
import { EditTip } from '../../components/Tooltip'
import messages from '../../lib/iconMsg'

const useStyle = makeStyles(() => ({
  icon: {
    padding: 8,
  },
  edit: {
    width: 17,
  },
}))

function EditButton({value, name, onChange, disable, save}) {
  const classes = useStyle()

  const [isDisable, setIsDisable] = useState(true)

  function handleOnDisable() {
    setIsDisable(false)
    onChange(name)
  }

  function handleOnCancel() {
    setIsDisable(true)
    disable()
  }

  function handleOnSave() {
    setIsDisable(true)
    disable()
    save()
  }

  return (
    <Box style={{marginTop: value}}>
      {isDisable ? (
        <IconButton onClick={handleOnDisable} className={classes.icon}>
          <EditTip title={messages.edit} placement='right' color="primary" />
        </IconButton>
      ) : (
        <Box display="flex">
          <IconButton onClick={handleOnCancel} className={classes.icon}>
            <Clear className={classes.edit} color="primary" />
          </IconButton>
          <IconButton onClick={handleOnSave} className={classes.icon}>
            <Check className={classes.edit} color="primary" />
          </IconButton>
        </Box>
      )}
    </Box>
  )
}

export default EditButton
