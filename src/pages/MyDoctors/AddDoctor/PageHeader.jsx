import React from 'react'
import { Box, Typography } from '@material-ui/core'
import iconMsg from '../../../lib/iconMsg'
import { CloseTipEnd } from '../../../components/Tooltip'
import '../style.scss'

function PageHeader({ handleClose }) {

  return (
    <Box>
      <Box display="flex" style={{ justifyContent: 'center' }}>
        <Typography variant="h5" className="title-contenthead" style={{ color: 'black' }}>Doctor Registeration</Typography>
        <CloseTipEnd onClick={handleClose} title={iconMsg.cancel} placement="right" />
      </Box>
    </Box>
  )
}

export default PageHeader