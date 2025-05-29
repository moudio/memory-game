import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [cards, setCards] = useState([]);

  
  useEffect(() => {
    setCards(generateCards());
  }, []);



  return (
    <>

  
      <h1>Memory Game</h1>
    </>
  )
}

export default App
