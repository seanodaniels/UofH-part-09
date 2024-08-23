import { courseParts } from './data/courses'
import Content from './components/Content'

const App = () => {

  // const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)


  return (

  <div>
    <Content courseParts={courseParts} />
  </div>

  )
}

export default App




