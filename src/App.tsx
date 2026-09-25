import { useState } from 'react';
import { createInitialGameState } from './game/gameState';
import Board from "./components/Board";
import './App.css';

function App() {
  const [gameState, setGameState] = useState(createInitialGameState);

  return (
    <main>
        <h1>King’s Valley Labyrinth</h1>
        <p>Current player: {gameState.currentPlayer}</p>
        <Board gameState={gameState} />
      </main>
    );
}

export default App
