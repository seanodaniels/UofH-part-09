import express from 'express'
import patientorService from '../services/patientorService'
import toNewPatientEntry from '../utils'

const router = express.Router()

router.get('/diagnoses', (_req, res) => {
    console.log('req for diagnoses')
    res.send(patientorService.getDiagnoses())
})

router.get('/patients', (_req, res) => {
    console.log('req for patients get')
    res.send(patientorService.getSecurePatients())
})

router.get('/patients/:id', (req, res) => {      
    const patient = patientorService.findSecurePatient(req.params.id)    
    if (patient) {
        res.send(patient)
    } else {
        res.sendStatus(404)
    }
})

router.post('/patients', (req, res) => {
    console.log('request for adding a patient')
    try {
        const newPatient = toNewPatientEntry(req.body)
        const addedEntry = patientorService.addPatient(newPatient)
        res.json(addedEntry)
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.'
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message
        }
        res.status(404).send(errorMessage)
    }
})

export default router