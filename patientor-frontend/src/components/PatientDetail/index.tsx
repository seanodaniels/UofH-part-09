import { useState, useEffect } from 'react'
import { useMatch } from 'react-router-dom';
import patientService from "../../services/patients";
import { Patient, Entry } from "../../types";

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

  interface EntriesProps {
    theEntries: Entry[];
  }

  const DisplayEntries = ({ theEntries }: EntriesProps) => {
    return (
      <div>
        <h3>Entries</h3>
        {theEntries.map(p => {
            return (
              <div>
                <p>{p.date} {p.description}</p>
                <ul>
                  {p.diagnosisCodes && p.diagnosisCodes.length > 0
                    ? p.diagnosisCodes.map(c => <li>{c}</li>)
                    : null
                  }
                </ul>
              </div>
            );
          }
        )}
      </div>
    );
  };

  if (!patientInfo && !errorMessage) {
    return <div>Loading...</div>;
  }

  const theEntries = patientInfo?.entries;

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
          { 
            theEntries && theEntries.length > 0 
            ? <DisplayEntries theEntries={theEntries} /> 
            : null 
          }
        </div>
       : null}
    </div>
  );
};

export default PatientDetail;