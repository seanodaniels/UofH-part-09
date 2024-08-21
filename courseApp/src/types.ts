export interface HeaderProps {
  courseName: string
}

export interface TotalProps {
  totalExercises: number
}

interface CourseParts {
  name: string,
  exerciseCount: number
}

export interface ContentProps {
  courseParts: Array<CourseParts>
}