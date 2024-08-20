export interface Diagnoses {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation?: string;
}

export enum Gender {
    male = 'male',
    female = 'female',
    nonBinary = 'nonBinary',
    other = 'other',
    unspecified = 'unspecified'
}

export type NewPatient = Omit<Patient, 'id'>

export type SecurePatientData = Omit<Patient, 'ssn'>