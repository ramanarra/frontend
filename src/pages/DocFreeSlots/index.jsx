import React from 'react'
import './style.css'

const DocFreeSlots = () => {

  return <div className='docFreeSlots'>
    <div className='monthHeader'>
      <div className='monthName'>2021 February</div>
    </div>

    <div className='displayArea'>

      <div className='dateColumn'>

        <div className='dateAndDay'>
          <div className='date'>12</div>
          <div className='day'>Friday</div>
        </div>

        <div className='emptySlots'>
          <div className='freeSlot'>10:00 AM - 12:00 PM</div>
        </div>

      </div>

      <div className='dateColumn'>
        <div className='dateAndDay'>
          <div className='date'>13</div>
          <div className='day'>Friday</div>
        </div>

        <div className='emptySlots'>
          <div className='freeSlot'>10:00 AM - 12:00 PM</div>
        </div>

      </div>

    </div>


  </div>
}

export default DocFreeSlots
