import { ContentProps } from '../types'

const Content = (props: ContentProps) => {
  const jsxContent = props.courseParts.map(p => {
    return <p>{p.name} {p.exerciseCount}</p>
  })
  return jsxContent
}

export default Content