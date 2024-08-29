import axios from 'axios'
import { Diary, NewDiary } from '../types'

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = () => {
  return axios.get<Diary[]>(baseUrl).then(r => r.data)
}

export const createDiary = (object: NewDiary) => {
  return axios
    .post<Diary>(baseUrl, object)
    .then(r => r.data)
}