import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [selectedCardIds, setSelectedCardIds] = useState([]);

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
      
      const cardObjects = response.data.photos.map(photo => ({
        id: `${photo.id}-1`,
        imageUrl: photo.src.large
      }));
      
      setCards(cardObjects);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }


  const handleCardClick = (card) => {
    if (selectedCardIds.includes(card.id)) {
      setSelectedCardIds([]);
      setCurrentScore(0);
      setCards(shuffleCards());
      return;
    } else {
      setSelectedCardIds([...selectedCardIds, card.id]);
      setCurrentScore(currentScore + 1);
      setCards(shuffleCards());
    }

    setHighestScore(Math.max(currentScore, highestScore));


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
      <p>Click on a card to select it. If you click the same card twice, you lose.</p>
      
      <div className="score-container">
        <span className="score">Current Score: {currentScore}</span>
        <span className="high-score">Highest Score: {highestScore}</span>
      </div>

      <div className="game-container">
        <div className="game-board">
          {cards.map((card) => (
            <div key={card.id} className="card" onClick={() => handleCardClick(card)}>
              <img src={card.imageUrl} alt="Memory card" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
