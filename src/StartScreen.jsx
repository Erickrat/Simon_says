import React from 'react'
import './App.css'

const StartScreen = ({isValid, setIsValid, record, setRecord}) => {

    const handleNewGame = () => {
        setIsValid(true);
    }

  return (
    <div>
        <div className='game-title'>Simon says!</div>
                {record > 0 && <div className='record'>Current record: {record}</div>}
                <div className='new-game'>New Game?:</div>
        <button className='start' onClick={handleNewGame}>Play</button>
    </div>
  )
}

export default StartScreen