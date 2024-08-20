import { NewPatient, Gender } from './types'

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const isGender = (text: string): text is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(text)
}

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name.')
  }
  return name
}

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth)) {
    throw new Error('Incorrect or missing dateOfBirth.')
  }
  return dateOfBirth
}

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn.')
  }
  return ssn
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender identity.')
  }
  return gender
}

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation.')
  }
  return occupation
}

const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data.')
  }

  if (
    'name' in object
    && 'dateOfBirth' in object
    && 'ssn' in object
    && 'gender' in object
    && 'occupation' in object
  ) {
    const newEntry: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation)
    }
    return newEntry
  }

  throw new Error('Incorrect data: a field is missing.')
}

// const toNewPatientEntry = (object: unknown): NewPatient => {

//   console.log(object)
//   const newEntry: NewPatient = {
//     name: "Place Holder",
//     dateOfBirth: "1979-01-30",
//     ssn: "99979-77A",
//     gender: "theydie",
//     occupation: "Cop-stopper"
//   }

//   return newEntry
// }

export default toNewPatientEntry