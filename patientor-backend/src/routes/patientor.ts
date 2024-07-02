import express from 'express'
import patientorService from '../services/patientorService'

const router = express.Router()

router.get('/', (_req, res) => {
    console.log('req for diagnoses')
    res.send(patientorService.getEntries())
})

export default router