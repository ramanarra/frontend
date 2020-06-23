import React, { useState } from "react";
import "./reschedule.scss";
import useCustomFetch from "../../../../../hooks/useCustomFetch";
import PatientCancellation from "./patientCancellation";
import PatientReschedule from "./PatientReschedule";
const key = { doctorKey: "Doc_5" };
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
    responseData = {};
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
