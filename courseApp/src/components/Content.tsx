import { ContentProps } from '../types'

const Content = (props: ContentProps) => {
  const coursesContent = props.courseParts.map(p => {
    console.log(p)
    switch (p.kind) {
      case "basic":
        return (
          <p>
            <strong>{p.name} {p.exerciseCount}</strong><br />
            <em>{p.description}</em><br />
          </p>
        )
        break
      case "group":
        return (
          <p>
            <strong>{p.name} {p.exerciseCount}</strong><br />
            project exercises {p.groupProjectCount}
          </p>
        )
        break
      case "background":
        return (
          <p>
            <strong>{p.name} {p.exerciseCount}</strong><br />
            <em>{p.description}</em><br />
            submit to {p.backgroundMaterial}
          </p>
        )
        break

      default:
        return <p>Default info</p>
        break
        
    }
  })
  return coursesContent
}

export default Content

