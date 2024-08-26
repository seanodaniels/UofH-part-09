export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

export const keyMe = (unformattedString: string): string => {
  const keyedString = unformattedString.replace(/[^A-Z0-9]/ig, "")
  return keyedString
}