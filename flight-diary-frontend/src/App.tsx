import { useState, useEffect } from 'react'
import axios from 'axios'
import { Diary } from './types'
import { getAllDiaries, createDiary } from './services/diaries'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [newDate, setNewDate] = useState('')
  const [newWeather, setNewWeather] = useState('')
  const [newVisibility, setNewVisibility] = useState('')
  const [newComment, setNewComment] = useState('')
 

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

  const chooseWeather = (value: string) => {
    setNewWeather(value)
  }

  const chooseVisibility = (value: string) => {
    setNewVisibility(value)
  }

  return (
    <div id="main-body">      
      <div id="add-diary">
        <h2>Add new entry</h2>
        <Notification message={errorMessage}/>
        <form onSubmit={createNewDiary}>
          <div className='form-element'>
            <strong>date:</strong><br />
            <input type="date" value={newDate} onChange={(event) => setNewDate(event.target.value)} />
          </div>
          <div className='form-element'>
            <strong>weather:</strong> <br />
            sunny<input type="radio" name="weather-filter" onChange={() => chooseWeather('sunny')} /><br />
            rainy<input type="radio" name="weather-filter" onChange={() => chooseWeather('rainy')} /><br />
            cloudy<input type="radio" name="weather-filter" onChange={() => chooseWeather('cloudy')} /><br />
            stormy<input type="radio" name="weather-filter" onChange={() => chooseWeather('stormy')} /><br />
            windy<input type="radio" name="weather-filter" onChange={() => chooseWeather('windy')} />
          </div>
          <div className='form-element'>
            <strong>visibility:</strong> <br />
            great<input type="radio" name="visibility-filter" onChange={() => chooseVisibility('great')} /><br />
            good<input type="radio" name="visibility-filter" onChange={() => chooseVisibility('good')} /><br />
            ok<input type="radio" name="visibility-filter" onChange={() => chooseVisibility('ok')} /><br />
            poor<input type="radio" name="visibility-filter" onChange={() => chooseVisibility('poor')} />
          </div>
          <div className='form-element'>
            <strong>comment:</strong><br />
            <input value={newComment} onChange={(event) => setNewComment(event.target.value)} />
          </div>
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