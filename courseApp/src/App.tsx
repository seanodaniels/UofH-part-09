import { courseParts } from './data/courses'
import Content from './components/Content'
import TotalExercises from './components/TotalExercises'

const App = () => {
  return (
    <div>
      <h1>Half Stack application development</h1>
      <Content courseParts={courseParts} />
      <TotalExercises courseParts={courseParts} />
    </div>
  )
}

export default App