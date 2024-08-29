import { useState, useEffect } from 'react'
import axios from 'axios'
import { Diary } from './types'
import { getAllDiaries, createDiary } from './services/diaries'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [newDate, setNewDate] = useState('2024-08-29')
  const [newWeather, setNewWeather] = useState('sunny')
  const [newVisibility, setNewVisibility] = useState('good')
  const [newComment, setNewComment] = useState('comment')
 

  useEffect(() => {
      getAllDiaries().then(data => setDiaries(data))
    }, [])

  const createNewDiary = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const diaryToAdd = {
      id: diaries.length + 1,
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    }
    // setDiaries(diaries.concat(diaryToAdd))

    createDiary(diaryToAdd)
      .then(data => {
          setDiaries(diaries.concat(data))
          setNewDate('')
          setNewWeather('')
          setNewVisibility('')
          setNewComment('')
        }
      )
      .catch(error => {            
        if (axios.isAxiosError(error)) {            
          setErrorMessage(`ERROR: ${error.response?.data}`)
        } else {
          console.error('generic error: ', error);
        }          
      })
  }

  return (
    <div id="main-body">      
      <div id="add-diary">
        <h2>Add new entry</h2>
        <Notification message={errorMessage}/>
        <form onSubmit={createNewDiary}>
          date: <input value={newDate} onChange={(event) => setNewDate(event.target.value)} /><br />
          weather: <input value={newWeather} onChange={(event) => setNewWeather(event.target.value)} /><br />
          visibility: <input value={newVisibility} onChange={(event) => setNewVisibility(event.target.value)} /><br />
          comment: <input value={newComment} onChange={(event) => setNewComment(event.target.value)} /><br />
        <button type='submit'>add</button>
        </form>
      </div>
      <div id="diary-list">
        <h2>Diary entries</h2>
        {diaries.map(d => 
          <div key={d.id} className='diary-entry'>
            <p><strong>{d.date}</strong></p>
            <p>
              visibility: {d.visibility}<br /> 
              weather: {d.weather}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App