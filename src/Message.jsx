import { useState, useEffect } from "react"

const Message = ({ message }) => {
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    if (message == 'Correct!'){
      setMessageType('correct');
    } else {
      setMessageType ('lose')
    }

  }, [message])


  return (
    <>

      <div className={`message ${messageType}`}>
        {message}
      </div>
    </>
  )
}

export default Message