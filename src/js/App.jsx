import React, { useState } from 'react';
import styled from 'styled-components';
import logger from './logger';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 110vw;
  height: 100vh;
  transform: skew(-5deg) translateX(-50px);
  overflow: none;
`;

const TitleText = styled.h1`
  position: absolute;
  top: 30px;
  text-align: center;
  width: 100%;
  font-size: 50px;
  color: white;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
`

const ResultText = styled.h2`
  position: absolute;
  text-align: center;
  top: ${props => props.top || '100px'};
  width: 100%;
  font-size: 30px;
  color: white;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
`

const Button = styled.button`
  position: absolute;
  left: ${props => props.left || '50%'};
  text-align: center;
  width: 20%;
  font-size: 30px;
  color: white;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.75);
  padding: 10px;
`

const Section = styled.div`
  flex: 1;
  background-image: url(${props => props.background});
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease-in-out;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 50px;
    background-image: url(${props => props.nextBackground});
    background-size: cover;
    background-position: left center;
    z-index: 1;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const SectionText = styled.p`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  font-size: 36px;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
`

const options = ['rock', 'paper', 'scissors']

const App = () => {
  const [gameMode, setGameMode] = useState(null)
  const [player1, setPlayer1] = useState(null)
  const [player2, setPlayer2] = useState(null)
  const [result, setResult] = useState(null)

  const simulateGame = (choiceA, choiceB) => {
    if (choiceA) {
      setGameMode('human-vs-ai')
      logger('human-vs-ai game simulating')
    } else {
      setGameMode('ai-vs-ai')
      logger('ai-vs-ai game simulating')
    }
    const player1Choice = choiceA || options[Math.floor(Math.random() * options.length)]
    const player2Choice = choiceB || options[Math.floor(Math.random() * options.length)]
    setPlayer1(player1Choice)
    setPlayer2(player2Choice)

    if (player1Choice === player2Choice) {
      setResult(`It's a tie!`)
    } else if (
      (player1Choice === 'rock' && player2Choice === 'scissors') ||
      (player1Choice === 'paper' && player2Choice === 'rock') ||
      (player1Choice === 'scissors' && player2Choice === 'paper')
    ) {
      setResult('Player 1 wins!');
    } else {
      setResult('Player 2 wins!');
    }
  }

  const resetGame = () => {
    setPlayer1(null)
    setPlayer2(null)
    setResult(null)
  }

  const handleSectionClick = (option) => {
    simulateGame(option)
  }

  const renderResult = () => {
    if (!(player1 && player2 && result && gameMode)) return null
    return (
      <div data-testid={gameMode}>
        <ResultText top={'120px'}>{`Player 1: ${player1} Player 2: ${player2}`}</ResultText>
        <ResultText top={'200px'}>{result}</ResultText>
      </div>
    )
  }

  return (
    <Container>
      <TitleText>Choose your fighter!</TitleText>
      <Button left='0px' onClick={() => simulateGame()}>Simulate Game</Button>
      <Button left='500px' onClick={resetGame}>Reset Game</Button>
      {renderResult()}
      {options.map((option) => (
        <Section
          key={option}
          background={`/public/${option}.png`}
          onClick={() => handleSectionClick(option)}
        >
          <SectionText>{option}</SectionText>
        </Section>
      ))}
    </Container>
  )
};

export default App;
