import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'
import { courseName, courseParts } from './data/courses.ts'

const App = () => {

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  )
}

export default App

