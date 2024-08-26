import { ContentProps } from '../types'
import { keyMe } from '../utils'

import Part from './Part'

const Content = (props: ContentProps) => {
  const coursesContent = props.courseParts.map(p => {
    return <Part coursePart={p} key={keyMe(p.name)} />
  })
  return coursesContent
}

export default Content

