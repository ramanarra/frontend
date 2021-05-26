import { Grid, IconButton } from '@material-ui/core'
import React from 'react'
import { FaFileDownload as DownloadIcon } from 'react-icons/fa'

const Entry = ({ data }) => {
  const { medicine, dose, comment } = data

  return (
    <>
      <Grid item xs={6}>
        <div className="cell">{medicine}</div>
      </Grid>
      <Grid item xs={6}>
        <div className="cell">{dose}</div>
      </Grid>
      <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
        <div className="head" style={{ fontWeight: 'bold' }}>
          Comments{' '}
        </div>
        : <div className="cell">{comment}</div>
      </Grid>
    </>
  )
}

const Attachment = ({ url, index, hasMultiple }) => {
  const name = hasMultiple ? `Prescription-${index + 1}.pdf` : `Prescription.pdf`
  return (
    <a href={url} target="_blank" className="attachment-entry">
      <IconButton className="dwld-btn">
        <DownloadIcon className="dwld-icon" />
      </IconButton>
      <p className="name" target="_blank">
        {name}
      </p>
    </a>
  )
}

const PrescriptionMsg = ({ text }) => {
  const { data } = text
  const { prescription, remarks } = data

  return (
    <div className="presription-msg">
      <div className="table-wrap">
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <div className="head" style={{ fontWeight: 'bold' }}>
              Description
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="head" style={{ fontWeight: 'bold' }}>
              Quantity
            </div>
          </Grid>
          {prescription?.map((i, index) => (
            <Entry key={index} data={i} />
          ))}
        </Grid>

        <Grid container spacing={24}>
          <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
            <div className="head" style={{ fontWeight: 'bold' }}>
              Remarks:
            </div>
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
            <div className="cell">{remarks}</div>
          </Grid>
        </Grid>
        <p className="note-msg" style={{ fontSize: '14px', color: 'darkred' }}>
          NOTE: You can find the PDF of prescription in a appointment details page
        </p>
      </div>
    </div>
  )
}

export default PrescriptionMsg
