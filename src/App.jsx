import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    generateCards();
  }, []);

  const generateCards = async () => {
    try {
      const response = await axios.get('https://api.pexels.com/v1/curated', {
        params: {
          per_page: 10,
        },
        headers: {
          'Authorization': import.meta.env.VITE_PEXELS_API_KEY
        }
      });
      
      // Create pairs of cards with the same image
      const cardPairs = response.data.photos.flatMap(photo => [
        { id: `${photo.id}-1`, imageUrl: photo.src.large },
      ]);
      
      setCards(cardPairs);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }

  const shuffleCards = () => {
    const shuffledCards = [...cards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
      return shuffledCards;
  }

  return (
    <>
      <h1>Memory Game</h1>
  
      <div className="game-container">
        <div className="game-board">
          {cards.map((card) => (
            <div key={card.id} className="card">
              <img src={card.imageUrl} alt="Memory card" />
            </div>
          ))}
        </div>
      </div>
      
      <p>Current Score: {currentScore}</p>
      <p>Highest Score: {highestScore}</p>
    </>
  )
}

export default App
