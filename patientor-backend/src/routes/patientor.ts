import express from 'express'
import patientorService from '../services/patientorService'

const router = express.Router()

router.get('/diagnoses', (_req, res) => {
    console.log('req for diagnoses')
    res.send(patientorService.getDiagnoses())
})

router.get('/patients', (_req, res) => {
    console.log('req for diagnoses')
    res.send(patientorService.getSecurePatients())
})

export default router