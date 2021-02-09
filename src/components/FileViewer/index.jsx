import React from 'react'
import { Dialog } from '@material-ui/core'
import clsx from 'clsx'
import './style.scss'

const FileViewer = ({ className, onClose, url, type }) => {
  return (
    <Dialog
      className={clsx('file-viewer-dlg-comp', className)}
      open={true}
      onClick={onClose}
    >
      <iframe className="attachment" src={url} type={type} />
    </Dialog>
  )
}

export default FileViewer
