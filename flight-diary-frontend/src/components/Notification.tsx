const Notification = ({ message }: { message:string })  => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

export default Notification