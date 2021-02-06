import React from 'react'
import './NoCam.scss'

const NoCam = ({ name }) => {
  const nameSplit = name?.split(' ')
  const firstLetter = name[0] || 'A'
  const lastLetter =
    nameSplit?.length > 1 ? nameSplit[nameSplit?.length - 1][0] : null
  return (
    <div className="no-cam-background">
      <div className="logo-wrap">
        <div className="circle-border">
          <div className="letter-wrap">
            <div className="fst-lttr lttr">{firstLetter}</div>
            {lastLetter && <div className="lst-lttr lttr">{lastLetter}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoCam
