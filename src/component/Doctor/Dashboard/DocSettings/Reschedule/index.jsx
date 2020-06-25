import React, { useState } from "react";

import useCustomFetch from "../../../../../hooks/useCustomFetch";
import PatientCancellation from "./PatientCancellation";
import PatientReschedule from "./PatientReschedule";
import "./reschedule.scss";

const key = { doctorKey: 'Doc_5' };
const Reschedule = (props) => {
  const [patientCancellationAllowed, setpatientCancellationAllowed] = useState(
    null
  );
  let [responseData, reFetch, loading, error] = useCustomFetch(
    "POST",
    "calendar/doctorSettingsPersonalView",
    key
  );

  if (!responseData) {
    return null
  }

  const { configDetails } = responseData;

  return (
    <div className="doctor-preference">
      <h4 className="pref-head">Cancellation/Reschedule Options</h4>
      <div className="options">
        {configDetails && (
          <PatientCancellation
            patientCancelationData={configDetails}
            doctorKey={key}
            reFetch={reFetch}
          />
        )}
        {configDetails && (
          <PatientReschedule
            patientRescheduleData={configDetails}
            doctorKey={key}
            reFetch={reFetch}
          />
        )}
      </div>
    </div>
  );
};

export default Reschedule;
