import React, { Fragment } from 'react'

import Addoverbookings from './Addoverbookings'
// import WorkscheduleTable from './WorkscheduleTable'
import useCustomFecth from '../../hooks/useCustomFetch'

function WorkSchedules() {
  const doctorKey = localStorage.getItem('docKey');
    const [responseData, refetch, loading, error] = useCustomFecth('GET', 'calendar/workScheduleView?doctorKey='+doctorKey);
    return(
        
          <div>
            <Addoverbookings responseData = {responseData} refetch = {refetch}/>
            {/* <WorkscheduleTable responseData = {responseData}/> */}
            </div>
        
    )
}

export default WorkSchedules