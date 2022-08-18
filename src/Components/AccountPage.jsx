import React, { useState } from 'react'
import { UserAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';

import { createStage, checkCollision } from '../gameHelper';

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './Styles/StyledTetris';
import "./AccountPage.css"

// Custom Hooks
import { useInterval } from '../Hooks/UseInterval';
import { usePlayer } from '../Hooks/usePlayer';
import { useStage } from '../Hooks/useStage';
import { useGameStatus } from '../Hooks/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';


const AccountPage = () => {

  const {user,logout} = UserAuth();
  const navigate = useNavigate();

  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  const handleLogOut = async () => {
    try {
      await logout()
      navigate('/')
      console.log("LOGGED OUT")
    } catch (e) {
      console.log(e.message)
    }
  }

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      // Activate the interval again when user releases down arrow.
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setScore(0);
    setLevel(1);
    setRows(0);
    setGameOver(false);
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // Also increase speed
      setDropTime(10000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game over!
      if (player.pos.y < 1) {
        console.log('GAME OVER!!!');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    // We don't need to run the interval when we use the arrow down to
    // move the tetromino downwards. So deactivate it for now.
    setDropTime(null);
    drop();
  };

  // This one starts the game
  useInterval(() => {
    drop();
  }, dropTime);

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 65) {
        movePlayer(-1);
      } else if (keyCode === 68) {
        movePlayer(1);
      } else if (keyCode === 83) {
        dropPlayer();
      } else if (keyCode === 87) {
        playerRotate(stage, 1);
      }
    }
  };

  return (
    <div>
        <div className='top'>
            <p className='p'>WELCOME, {user && user.email}!</p><button className="logout" onClick={handleLogOut}>LOGOUT</button>
        </div>

        <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`SCORE: ${score}`} />
              <Display text={`ROWS: ${rows}`} />
              <Display text={`LEVEL: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
          
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>

    </div>
  )
}

export default AccountPage