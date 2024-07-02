import diagnosesData from '../../data/diagnoses'

import { Diagnoses } from '../types'

const getEntries = ():Diagnoses[] => {
    return diagnosesData
}

export default {
    getEntries,
}