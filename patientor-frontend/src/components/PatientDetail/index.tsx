import { useState, useEffect } from 'react'
import { useMatch } from 'react-router-dom';
import patientService from "../../services/patients";
import { Patient, Entry } from "../../types";
import { Favorite } from '@mui/icons-material';

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

  const DisplayHeart = ({ heartType }: DisplayHeartProps) => {
    switch(heartType) {
      case 0:
        return <Favorite style={{ color: 'green' }}  />
        break;
      case 1:
        return <Favorite style={{ color: 'yellow' }}  />
        break;
      case 2: 
        return <Favorite style={{ color: 'red' }}  />
        break;
      default:
        break;
    }
  };

  interface DisplayHeartProps {
    heartType: number;
  }

  interface EntriesProps {
    theEntries: Entry[];
  }

  interface EntryProps {
    entry: Entry;
  }

  const theEntries = patientInfo?.entries;

  const DisplayEntryBasics = ({ entry }: EntryProps) => {
    return (
      <div>        
        <p><strong>{entry.date}</strong> (Diagnosed by {entry.specialist})<br />
        <em>{entry.description}</em></p>
          {entry.diagnosisCodes && entry.diagnosisCodes.length > 0
            ? <div>
                 Diagnosis Codes:<br />
                { entry.diagnosisCodes.map(c => <div>- {c}<br /></div>) }
              </div>
            : null
          }
      </div>
    );
  };

  const DisplayEntries = ({ theEntries }: EntriesProps) => {
    return (
      <div>
        <h3>Entries</h3>
        {
          theEntries.map(p => {
            switch (p.type) {
              case "HealthCheck":
                return (
                  <div className="entryContainer">
                    <DisplayEntryBasics entry={p} />
                    <p><DisplayHeart heartType={p.healthCheckRating} /></p>
                  </div>
                );
                break;
              case "OccupationalHealthcare":
                return  (
                  <div className="entryContainer">
                    <DisplayEntryBasics entry={p} />
                    <p>Employer Name: {p.employerName}<br />
                    { p.sickLeave 
                      ? <span>Sick Leave: {p.sickLeave.startDate} to {p.sickLeave.endDate}</span>
                      : null
                    }
                    </p>
                  </div>
                );
                break;
              case "Hospital": 
                return (
                  <div className="entryContainer">
                    <DisplayEntryBasics entry={p} />
                    <p>Discharge date: {p.discharge.date}<br />
                    { p.discharge.criteria
                      ? p.discharge.criteria
                      : null
                    }
                    </p>
                  </div>
                );
                break;
              default: 
                break;
            }
          }
        )}
      </div>
    );
  };

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