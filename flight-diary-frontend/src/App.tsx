import axios from 'axios'
import { useState, useEffect } from 'react'

interface Diary {
  id: number,
  date: string,
  weather: string,
  visibility: string,
  comment?: string
}

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [newDate, setNewDate] = useState('')
  const [newWeather, setNewWeather] = useState('')
  const [newVisibility, setNewVisibility] = useState('')
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    axios.get<Diary[]>('http://localhost:3000/api/diaries')
      .then(r => {
        setDiaries(r.data)
      })
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
    setDiaries(diaries.concat(diaryToAdd))
    setNewDate('')
    setNewWeather('')
    setNewVisibility('')
    setNewComment('')
  }

  return (
    <div id="main-body">
      <div id="add-diary">
        <h2>Add new entry</h2>
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