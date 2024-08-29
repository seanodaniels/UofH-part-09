import axios, { AxiosError } from 'axios'
import { Diary, NewDiary } from '../types'

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = () => {
  return axios.get<Diary[]>(baseUrl).then(r => r.data)
}

// export const createDiary = async (object: NewDiary) => {
//   console.log('creating')
//   const response = await axios.post<Diary>(baseUrl, object)
//   return response
// }

export const createDiary = async (object: NewDiary) => {
  const response = await axios.post<Diary>(baseUrl, object)
  return response.data
} 