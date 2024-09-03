import { useState, useEffect } from 'react'
import { useMatch } from 'react-router-dom';
import patientService from "../../services/patients";
import { Patient } from "../../types";

const PatientDetail = () => {
  const match = useMatch('/patient/:key');

  const [ patientInfo, setPatientInfo ] = useState<Patient>();
  const [ errorMessage, setErrorMessage ] = useState<string>('');

  useEffect(() => {
    const patientId = match?.params.key;

    if (patientId) {
      const fetchPatient = async (patientId: string | undefined) => {
        try {
          const patient = await patientService.getPatient(patientId!);
          setPatientInfo(patient);
        } catch (error) {
          setErrorMessage(`Error: ${error}`);
        }
      };
      void fetchPatient(patientId);  
    }

  }, [match?.params.key]);

  if (!patientInfo && !errorMessage) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {errorMessage ? <div className="error-message"><h2>Error: ${errorMessage}</h2></div> : null }
      {patientInfo ? 
        <div>
          <h2>{patientInfo.name}</h2>
          <p>
            ssn: {patientInfo.ssn}<br />
            gender identity: {patientInfo.gender}<br />
            occupation: {patientInfo.occupation}<br />
          </p>
        </div>
       : null}
    </div>
  );
};

export default PatientDetail;