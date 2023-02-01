import React, { useEffect, useState } from 'react'

const Nivel = ({ secuence, record, setRecord }) => {

  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    setCurrentScore(secuence.length - 1);
  }, [secuence])

  useEffect(() => {
    if (currentScore > record){
      setRecord(currentScore);
    }
  }, [currentScore])

  return (
    <div>
      <div className='level-box'>
        <span>Level: </span><div className='level-number'>{secuence.length}</div>
      </div>

    </div>
  )
}

export default Nivel