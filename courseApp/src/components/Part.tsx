import {  CoursePart } from '../types'
import { assertNever } from '../utils'

const Part = (props: {coursePart: CoursePart}) => {
  switch (props.coursePart.kind) {
    case "basic":
      return (
        <p>
          <strong>{props.coursePart.name} {props.coursePart.exerciseCount}</strong><br />
          <em>{props.coursePart.description}</em><br />
        </p>
      )
      break
    case "group":
      return (
        <p>
          <strong>{props.coursePart.name} {props.coursePart.exerciseCount}</strong><br />
          project exercises {props.coursePart.groupProjectCount}
        </p>
      )
      break
    case "background":
      return (
        <p>
          <strong>{props.coursePart.name} {props.coursePart.exerciseCount}</strong><br />
          <em>{props.coursePart.description}</em><br />
          submit to {props.coursePart.backgroundMaterial}
        </p>
      )
      break

    default:
      return assertNever(props.coursePart)
      break
      
  }
}

export default Part