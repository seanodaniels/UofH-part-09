import diagnosesData from '../../data/diagnoses'
import patientData from '../../data/patients'

import { Diagnoses } from '../types'
import { Patients, SecurePatientData } from '../types'

const getDiagnoses = ():Diagnoses[] => {
    return diagnosesData
}

const getPatients = ():Patients[] => {
    return patientData
}

const getSecurePatients = (): SecurePatientData[] => {
    return patientData.map(
        ({id, name, dateOfBirth, gender, occupation}) => 
        ({id, name, dateOfBirth, gender, occupation})
    )
}

const addPatients = ():boolean => {
    return true
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
    addPatients,
    findSecurePatient
}