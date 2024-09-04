import { Entry, NewPatient, Gender } from './types'

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const isGender = (text: string): text is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(text)
}

const isEntriesArray = (params: unknown): params is Array<Entry> => {
  return Array.isArray(params)
}

const isEntriesObject = (obj: unknown): obj is object => {
  return typeof obj === 'object'
}

const parseEntries = (entries: unknown): Array<Entry> => {
  if (!isEntriesArray(entries)) {
    throw new Error('Incorrect or missing entries.')
  }

  // We know that entries is an array, so now we can iterate through it
  // Lets check if it has a type property, and, if it does, let us make
  // sure it is one of the values we need rather than garbage.
  entries.map(e => {
    if (isEntriesObject(e)) {
      // It is an object. Now we can make sure that the value in type
      // is acceptable.
      if (
        (e.type !== 'OccupationalHealthcare')
        && (e.type !== 'HealthCheck')
        && (e.type !== 'Hospital')
      ) {
        throw new Error('Incorrect type. Check your syntax.')
      }
    }
  })
  return entries
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
    && 'entries' in object
  ) {
    const newEntry: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries)
    }
    return newEntry
  }

  throw new Error('Incorrect data: a field is missing.')
}

export default toNewPatientEntry