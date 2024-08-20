import { NewPatient } from './types.js'

const toNewPatientEntry = (object: unknown): NewPatient => {

  console.log(object)
  const newEntry: NewPatient = {
    name: "Place Holder",
    dateOfBirth: "1979-01-30",
    ssn: "99979-77A",
    gender: "theydie",
    occupation: "Cop-stopper"
  }

  return newEntry
}

export default toNewPatientEntry