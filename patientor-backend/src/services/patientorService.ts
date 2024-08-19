import diagnosesData from '../../data/diagnoses'
import patientData from '../../data/patients'
import { v1 as uuid } from 'uuid'

import { Diagnoses } from '../types'
// import { Patient, NewPatient, SecurePatientData } from '../types'
import { Patient, SecurePatientData } from '../types'

const getDiagnoses = ():Diagnoses[] => {
    return diagnosesData
}

const getPatients = ():Patient[] => {
    return patientData
}

const getSecurePatients = (): SecurePatientData[] => {
    return patientData.map(
        ({id, name, dateOfBirth, gender, occupation}) => 
        ({id, name, dateOfBirth, gender, occupation})
    )
}

// const addPatient = ( entry: NewPatient ): Patient => {
//     const newPatient = {
//         id: uuid(),
//         ...entry
//     }
//     patientData.push(newPatient)
//     return newPatient
// }

const addPatient = (
    name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string
    ): Patient => {

    const newPatient = {
        id: uuid(),
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    }

    patientData.push(newPatient)
    return newPatient
}

const findSecurePatient = (id: string): SecurePatientData | undefined => {
    console.log(`patient lookup for ${id}`)
    const entry = patientData.find(p => p.id === id)
    return entry
}

export default {
    getDiagnoses,
    getPatients,
    getSecurePatients,
    addPatient,
    findSecurePatient
}