import { useEffect, useState } from 'react'
import './App.css'
import StartScreen from './StartScreen';
import Nivel from './Nivel';
import Message from './Message';

import { randomGenerator } from './helpers';

function App() {
  const [yellowButton, setYellowButton] = useState('');
  const [redButton, setRedButton] = useState('');
  const [blueButton, setBlueButton] = useState('');
  const [greenButton, setGreenButton] = useState('');

  const [secuence, setSecuence] = useState([]);
  const [secuenceUser, setSecuenceUser] = useState([]);

  const [isValid, setIsValid] = useState(false);
  const [turn, setTurn] = useState(false);
  const [message, setMessage] = useState('');
  const [display, setDisplay] = useState('');
  const [record, setRecord] = useState(0);

  const handleShowSequence = () => {
    if (isValid) {

      for (let i = 0; i < secuence.length; i++) {
        setTimeout(() => {

          switch (secuence[i]) {
            case 'Yellow':
              setYellowButton('active');
              break;
            case 'Red':
              setRedButton('active');
              break;
            case 'Blue':
              setBlueButton('active');
              break;
            case 'Green':
              setGreenButton('active');
              break;
          }
        }, 2000 * i)

        setTimeout(() => {
          setTurn(true)
        }, 2000 * secuence.length);

      }

    }



  }

  const handleNewLevel = () => {
    switch (randomGenerator()) {
      case 0:
        setSecuence([...secuence, 'Yellow']);
        break;
      case 1:
        setSecuence([...secuence, 'Red']);
        break;
      case 2:
        setSecuence([...secuence, 'Blue']);
        break;
      case 3:
        setSecuence([...secuence, 'Green']);
        break;
    }
  }

  const handleYellowClickDown = () => {
    if (turn) {
      setYellowButton('active');
    }
  }

  const handleYellowClickUp = () => {
    setYellowButton('');
    if (yellowButton === 'active') {
      setSecuenceUser([...secuenceUser, 'Yellow']);
    }
  }

  const handleRedClickDown = () => {
    if (turn) {
      setRedButton('active');
    }
  }

  const handleRedClickUp = () => {
    setRedButton('');
    if (redButton === 'active') {
      setSecuenceUser([...secuenceUser, 'Red']);
    }
  }

  const handleBlueClickDown = () => {
    if (turn) {
      setBlueButton('active');
    }
  }

  const handleBlueClickUp = () => {
    setBlueButton('');
    if (blueButton === 'active') {
      setSecuenceUser([...secuenceUser, 'Blue']);
    }
  }

  const handleGreenClickDown = () => {
    if (turn) {
      setGreenButton('active');
    }
  }

  const handleGreenClickUp = () => {
    setGreenButton('');
    if (greenButton === 'active') {
      setSecuenceUser([...secuenceUser, 'Green']);
    }
  }

  useEffect(() => {
    if ((redButton || yellowButton || blueButton || greenButton) && !turn) {
      setTimeout(() => {
        setYellowButton('');
        setRedButton('');
        setBlueButton('');
        setGreenButton('');
      }, 1000);
    }
  }, [yellowButton, redButton, blueButton, greenButton]);

  useEffect(() => {
    if (secuenceUser[secuenceUser.length - 1] !== secuence[secuenceUser.length - 1]) {
      setMessage('You lose!')


      setTimeout(() => {
        setIsValid(false);
        setSecuence([]);
        setSecuenceUser([]);
        setTurn(false)
        setMessage('');
      }, 2000);

    } else if (secuenceUser.length == secuence.length && turn) {
      setMessage('Correct!')

      setTimeout(() => {
        handleNewLevel();
        setSecuenceUser([]);
        setTurn(false);

      }, 800);
    }
  }, [secuenceUser]);

  useEffect(() => {
    if (isValid) {
      handleNewLevel();
      setSecuenceUser([]);
    }
  }, [isValid]);

  useEffect(() => {
    setTimeout(() => {
      handleShowSequence()
      setMessage('')
    }, 1500);
  }, [secuence]);

  useEffect(() => {
    if (turn) {
      setDisplay('activate');
    } else {
      setDisplay('');
    }
  }, [turn])

  return (

    <div className='correcto'>
      {isValid ? (
        <>
          <div className='container'>
            <div className='score'>
              <div className={`display ${display}`}>Your turn!</div>
              <Nivel
                secuence={secuence}
                record={record}
                setRecord={setRecord}
              />
            </div>
            <button
              className={`button yellow ${yellowButton}`}
              onMouseDown={handleYellowClickDown}
              onMouseUp={handleYellowClickUp}
            ></button>
            <button
              className={`button red ${redButton}`}
              onMouseDown={handleRedClickDown}
              onMouseUp={handleRedClickUp}
            ></button>
            <button
              className={`button blue ${blueButton}`}
              onMouseDown={handleBlueClickDown}
              onMouseUp={handleBlueClickUp}
            ></button>
            <button
              className={`button green ${greenButton}`}
              onMouseDown={handleGreenClickDown}
              onMouseUp={handleGreenClickUp}
            ></button>
          </div>

          {message && <Message message={message}>{message}</Message>}
        </>
      ) : (
        <StartScreen
          isValid={isValid}
          setIsValid={setIsValid}
          record={record}
          setRecord={setRecord}
        />
      )}


    </div>
  )
}

export default App
