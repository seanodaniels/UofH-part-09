import { Entry, NewPatient, Gender, NewEntries, Diagnosis, Discharge } from './types'

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

const isDischarge = (obj: unknown): obj is Discharge => {
  return (!(obj === null) && (typeof obj === 'object') && ('date' in obj))
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
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

const parseType = (type: unknown): string => {
  const types = [
    'HealthCheck',
    'OccupationalHealthcare',
    'Hospital'
  ]
  if (!isString(type) || !(types.map(t => t.toString()).includes(type))) {
    throw new Error('Incorrect or missing entries.')
  }
  return type
}

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name.')
  }
  return name
}

const parseCriteria = (criteria: unknown): string => {
  if (!isString(criteria)) {
    throw new Error('Incorrect criteria.')
  }
  return criteria
}

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description.')
  }
  return description
}

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing specialist.')
  }
  return specialist
}

const parseDate = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth)) {
    throw new Error('Incorrect or missing date.')
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

export const toNewPatient = (object: unknown): NewPatient => {
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
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries)
    }
    return newEntry
  }

  throw new Error('Incorrect data: a field is missing.')
}

export const toNewEntries = (obj: unknown): NewEntries => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Incorrect or missing data.')
  }

  if (
    'type' in obj
    && 'description' in obj
    && 'date' in obj
    && 'specialist' in obj
  ) {

    const requiredObj = {
      description: parseDescription(obj.description),
      date: parseDate(obj.date),
      specialist: parseSpecialist(obj.specialist),
      type: parseType(obj.type)
    }

    const initialObj = ('diagnosisCodes' in obj)
      ? {
        ...requiredObj,
        diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes)
      }
      : {
        ...requiredObj
      }

    switch (obj.type) {
      case "Hospital":
        if (
          ('discharge' in obj) && (isDischarge(obj.discharge))
        ) {
          const buildDischarge: Discharge = ('criteria' in obj.discharge)
            ? {
              date: parseDate(obj.discharge.date),
              criteria: parseCriteria(obj.discharge.criteria)
            }
            : {
              date: parseDate(obj.discharge.date)
            }
          const buildFinal: NewEntries = {
            ...initialObj,
            type: 'Hospital',
            discharge: {
              ...buildDischarge
            }
          }
          console.log(`Final Build:\n${JSON.stringify(buildFinal)}\nComplete.`)
          return buildFinal
        }
        throw new Error('Missing discharge information.')
        break
      case "OccupationalHealthcare":
        // do stuff
        throw new Error('Incorrect or malformed data.')
        break
      case "HealthCheck":
        // do stuff
        throw new Error('Incorrect or malformed data.')
        break
      default:
        // do stuff
        throw new Error('Incorrect or malformed type.')
        break
    }
    return obj as NewEntries
  }


  throw new Error('Incorrect data: a field is missing.')
}