import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';

import { PatientEntriesValues, EntriesType, Gender } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: PatientEntriesValues) => void;
}

// interface EntriesTypeOptions {
//   value: EntriesType;
//   label: string;
// }

// const entriesTypeOptions: EntriesTypeOptions[] = Object.values(EntriesType).map(v => ({
//   value: v, label: v.toString()
// }));

interface GenderOption{
  value: Gender;
  label: string;
}

const genderOptions: GenderOption[] = Object.values(Gender).map(v => ({
  value: v, label: v.toString()
}));



const AddEntriesForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState([]);
  const [entriesType, setEntriesType] = useState('OccupationalHealthcare');
  const [gender, setGender] = useState('');

  const onGenderChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const gender = Object.values(Gender).find(g => g.toString() === value);
      if (gender) {
        setGender(gender);
      }
    }
  };

  const onEntriesTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      console.log(`test: ${event.target.value} typeof ${ typeof event.target.value}`);
      setEntriesType(event.target.value);
    }
  };

  const addEntries = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(`test2: ${entriesType} typeof ${ typeof entriesType}`);

    const type = entriesType as string;
    // const type = "OccupationalHealthcare";
    onSubmit({
      type,
      employerName: 'test employer',
      description,
      date,
      specialist,
      // diagnosisCodes
    });
  };

  return (
    <div>
      <form onSubmit={addEntries}>
        <InputLabel>Type</InputLabel>
        <Select
          label="Type"
          fullWidth 
          value="entriesType" 
          onChange={onEntriesTypeChange}
        >
          <MenuItem key="OccupationalHealthcare" value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
          <MenuItem key="OccupationalHealthcare" value="OccupationalHealthcare">Hospital</MenuItem>
          <MenuItem key="OccupationalHealthcare" value="OccupationalHealthcare">HealthCheck</MenuItem>
          {/* {entriesTypeOptions.map(option => 
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          )} */}
        </Select>


        <InputLabel style={{ marginTop: 20 }}>Gender</InputLabel>
        <Select
          label="Gender"
          fullWidth
          value={gender}
          onChange={onGenderChange}
        >
        {/* {genderOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )} */}
          <MenuItem key="Male" value="male">Male</MenuItem>
          <MenuItem key="Female" value="female">Female</MenuItem>
          <MenuItem key="Other" value="other">Other</MenuItem>

        </Select>


        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        {/* <TextField
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes([target.value])}
        /> */}


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