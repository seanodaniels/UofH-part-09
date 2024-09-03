import diagnosesData from '../../data/diagnoses'
import patientData from '../../data/patients'
import { v1 as uuid } from 'uuid'

import { Diagnoses } from '../types'
import { Patient, NewPatient, SecurePatientData, NonSensitivePatient } from '../types'

const getDiagnoses = (): Diagnoses[] => {
    return diagnosesData
}

const getPatients = (): Patient[] => {
    return patientData
}

const getSecurePatients = (): SecurePatientData[] => {
    return patientData.map(
        ({ id, name, dateOfBirth, gender, occupation, entries }) =>
            ({ id, name, dateOfBirth, gender, occupation, entries })
    )
}

const addPatient = (entry: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...entry
    }
    patientData.push(newPatient)
    return newPatient
}


const findSecurePatient = (id: string): NonSensitivePatient | undefined => {
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