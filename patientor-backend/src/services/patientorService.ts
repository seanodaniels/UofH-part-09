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
        ({id, name, dateOfBirth, gender, occupation}) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        })
    )
}

export default {
    getDiagnoses,
    getPatients,
    getSecurePatients
}