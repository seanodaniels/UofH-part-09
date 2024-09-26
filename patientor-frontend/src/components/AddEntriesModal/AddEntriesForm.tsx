import { useState, SyntheticEvent, useEffect } from "react";
import { TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, Alert } from '@mui/material';
import { 
  EntriesFormValues, 
  EntriesType,
  HealthCheckRating 
} from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntriesFormValues) => void;
}

interface EntriesTypeOptions {
  value: EntriesType;
  label: string;
}

const entriesTypeOptions: EntriesTypeOptions[] = Object.values(EntriesType).map(v => ({
  value: v, label: v.toString()
}));

const AddEntriesForm = ({ onCancel, onSubmit }: Props) => {
  const [ error, setError ] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [entriesType, setEntriesType] = useState<EntriesType>(EntriesType.HealthCheck);
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);

  const [showHospital, setShowHospital] = useState(false);
  const [showOccupationalHealthcare, setShowOccupationalHealthcare] = useState(false);
  const [showHealthCheck, setShowHealthCheck] = useState(false);

  useEffect(() => {
    switch (entriesType) {
      case EntriesType.Hospital:
          setShowHospital(true);
          setShowOccupationalHealthcare(false);
          setShowHealthCheck(false);        
        break;
      case EntriesType.OccupationalHealthcare:
        setShowHospital(false);
        setShowOccupationalHealthcare(true);
        setShowHealthCheck(false);        
      break;
      case EntriesType.HealthCheck:
        setShowHospital(false);
        setShowOccupationalHealthcare(false);
        setShowHealthCheck(true);        
      break;
      default:
        setShowHospital(false);
        setShowOccupationalHealthcare(false);
        setShowHealthCheck(false);        
      break;
    }
              
  }, [entriesType]);

  const onEntriesTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const entriesType = Object.values(EntriesType).find(g => g.toString() === value);
      if (entriesType) {
        setEntriesType(entriesType);
      }
      switch (entriesType) {
        case "Hospital":
          setEntriesType(EntriesType.Hospital);
          break;
        case "OccupationalHealthcare":
          setEntriesType(EntriesType.OccupationalHealthcare);
          break;
        case "HealthCheck":
          setEntriesType(EntriesType.HealthCheck);
          break;
        default:
          setEntriesType(EntriesType.Hospital);
          break;
      }

    }
  };

  const addEntriesHospital = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: EntriesType.Hospital,
      description,
      date,
      specialist,
      diagnosisCodes,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria
      }
    });
  };

  const addEntriesOccupationalHealthcare = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: EntriesType.OccupationalHealthcare,
      employerName,
      description,
      date,
      specialist,
      sickLeave: {
        startDate: sickLeaveStartDate,
        endDate: sickLeaveEndDate
      },
      diagnosisCodes
    });
  };

  const addEntriesHealthCheck = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: EntriesType.HealthCheck,
      description,
      date,
      specialist,
      diagnosisCodes,
      healthCheckRating
    });
  };

  const processDiagnosisCodes = (codeString: string): Array<string> => {
    const constructArray = codeString.split(',');
    return constructArray;
  };

  const processHealthCheckRating = (ratingString: string): HealthCheckRating => {
    if (!ratingString || Number(ratingString) > 3 || Number(ratingString) < 0) {
      setError(`Rating ${ratingString} is out of bounds. Must be equal to 0, 1, 2, or 3.`);
    }
    const constructRating = Number(ratingString);
    return constructRating;
  };

  return (
    <div id="entries-form">
      {error && <Alert severity="error">{error}</Alert>}
      <InputLabel>Type</InputLabel>
        <Select
          label="Type"
          fullWidth 
          value={entriesType} 
          onChange={onEntriesTypeChange}
          className="entries-input" 
        >
          {entriesTypeOptions.map(option => 
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          )}
        </Select>

        <form onSubmit={addEntriesHospital} className={showHospital ? 'showForm' : 'hideForm'}>
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          className="entries-input" 
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          className="entries-input" 
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          className="entries-input" 
        />
        <TextField
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(processDiagnosisCodes(target.value))}
          className="entries-input" 
        />
        <TextField
          label="Discharge Date"
          fullWidth
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
          className="entries-input" 
        />
        <TextField
          label="Discharge Criteria"
          fullWidth
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
          className="entries-input" 
        />
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>

      <form onSubmit={addEntriesOccupationalHealthcare} className={showOccupationalHealthcare ? 'showForm' : 'hideForm'}>
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          className="entries-input" 
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          className="entries-input" 
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          className="entries-input" 
        />
        <TextField
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(processDiagnosisCodes(target.value))}
          className="entries-input" 
        />
        <TextField
          label="Employer Name"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
          className="entries-input" 
        />
        <TextField
          label="Sickleave Start"
          fullWidth
          value={sickLeaveStartDate}
          onChange={({ target }) => setSickLeaveStartDate(target.value)}
          className="entries-input" 
        />
        <TextField
          label="Sickleave End"
          fullWidth
          value={sickLeaveEndDate}
          onChange={({ target }) => setSickLeaveEndDate(target.value)}
          className="entries-input" 
        />
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>

      <form onSubmit={addEntriesHealthCheck} className={showHealthCheck ? 'showForm' : 'hideForm'}>
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          className="entries-input" 
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          className="entries-input" 
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          className="entries-input" 
        />
        <TextField
          label="Health Check Rating"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(processHealthCheckRating(target.value))}
          className="entries-input" 
        />
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntriesForm;