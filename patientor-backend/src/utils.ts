import {
  Entry,
  NewPatient,
  Gender,
  NewEntries,
  Diagnosis,
  Discharge,
  SickLeave,
  dummySickLeave,
  dummyDischarge
} from './types'

const isString = (data: unknown): data is string => {
  return typeof data === 'string' || data instanceof String
}

const isGender = (data: string): data is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(data)
}

const isSickLeave = (obj: object): obj is SickLeave => {
  return (
    obj !== null
    && typeof obj === 'object'
    && Object.keys(dummySickLeave).every(k => Object.keys(obj).includes(k))
  )
}

const isEntriesArray = (data: unknown): data is Array<Entry> => {
  return Array.isArray(data)
}

const isEntriesObject = (obj: unknown): obj is object => {
  return typeof obj === 'object'
}

const isDischarge = (obj: unknown): obj is Discharge => {
  return (
    !(obj === null)
    && (typeof obj === 'object')
    && Object.keys(dummyDischarge).every(k => Object.keys(obj).includes(k))
  )
}

const isEmployerName = (data: unknown): data is string => {
  return typeof data === 'string' || data instanceof String
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
}

const parseEntries = (data: unknown): Array<Entry> => {
  if (!isEntriesArray(data)) {
    throw new Error('Incorrect or missing entries.')
  }

  // We know that entries is an array, so now we can iterate through it
  // Lets check if it has a type property, and, if it does, let us make
  // sure it is one of the values we need rather than garbage.
  data.map(e => {
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
  return data
}

const parseType = (data: unknown): string => {
  const types = [
    'HealthCheck',
    'OccupationalHealthcare',
    'Hospital'
  ]
  if (!isString(data) || !(types.map(t => t.toString()).includes(data))) {
    throw new Error('Incorrect or missing entries.')
  }
  return data
}

const parseName = (data: unknown): string => {
  if (!isString(data)) {
    throw new Error('Incorrect or missing name.')
  }
  return data
}

const parseCriteria = (data: unknown): string => {
  if (!isString(data)) {
    throw new Error('Incorrect criteria.')
  }
  return data
}

const parseDescription = (data: unknown): string => {
  if (!isString(data)) {
    throw new Error('Incorrect or missing description.')
  }
  return data
}

const parseSpecialist = (data: unknown): string => {
  if (!isString(data)) {
    throw new Error('Incorrect or missing specialist.')
  }
  return data
}

const parseDate = (data: unknown): string => {
  if (!isString(data)) {
    throw new Error('Incorrect or missing date.')
  }
  return data
}

const parseSSN = (data: unknown): string => {
  if (!isString(data)) {
    throw new Error('Incorrect or missing ssn.')
  }
  return data
}

const parseEmployerName = (data: unknown): string => {
  if (!isEmployerName(data)) {
    throw new Error('Incorrect or missing employer name')
  }
  return data
}

const parseSickLeave = (data: unknown): SickLeave => {
  if (!data || !isSickLeave(data)) {
    throw new Error('Incorrect or missing sick leave')
  }
  return data
}

const parseGender = (data: unknown): Gender => {
  if (!data || !isString(data) || !isGender(data)) {
    throw new Error('Incorrect or missing gender identity.')
  }
  return data
}

// const parseDischarge = (data: unknown): Discharge => {
//   if (!data || !isDischarge(data)) {
//     throw new Error('Incorrect or missing Discharge.')
//   }
//   return data
// }

const parseOccupation = (data: unknown): string => {
  if (!isString(data)) {
    throw new Error('Incorrect or missing occupation.')
  }
  return data
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
        if ('employerName' in obj) {
          const buildFinal: NewEntries = 'sickLeave' in obj
            ? {
              ...initialObj,
              type: 'OccupationalHealthcare',
              employerName: parseEmployerName(obj.employerName),
              sickLeave: parseSickLeave(obj.sickLeave)
            }
            : {
              ...initialObj,
              type: 'OccupationalHealthcare',
              employerName: parseEmployerName(obj.employerName)
            }
          return buildFinal
        }
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