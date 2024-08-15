import express from 'express'
import patientorService from '../services/patientorService'

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

router.post('/patients', (_req, res) => {
    console.log('req for patients post')
    res.send(patientorService.addPatients())
})

export default router