import React, { useState, useEffect } from 'react'

function Game() {
  const initiateGame = () => {
    let game = [], rand
    while(game.length < 15) {
      rand = Math.floor(Math.random() * 15) + 1
      if(!game.includes(rand))
        game.push(rand)
    }
    game.push(0)
    return game
  }
  
  const [game, setGame] = useState(initiateGame())
  const [win, setWin] = useState(false)
  const [moveCount, setMoves] = useState(0)

  // utility methods-----------------------------
  const resetGame = () => {
    setGame(initiateGame())
    setMoves(0)
  }
  
  const swapPosition = (start, end) => {
    let gameUpdate = [...game]
    
    const temp = gameUpdate[start]
    gameUpdate[start] = gameUpdate[end]
    gameUpdate[end] = temp
    setGame(gameUpdate)
  }

  const getCurrentPosition = () => {
    return game.indexOf(0)
  }

  const canMove = (start, end) => {
    return (
      ([3,7,11].includes(start) && [4,8,12].includes(end)) ||
      ([4,8,12].includes(start) && [3,7,11].includes(end)) ||
      game[end] === undefined
    ) ? false : true
  }
  
  const moveItem = move => e => {
    // move with arrow keys
    if (e.keyCode === 38) {
      move = 'up'
    }
    else if (e.keyCode === 40) {
      move = 'down'
    }
    else if (e.keyCode === 37) {
      move = 'left'
    }
    else if (e.keyCode === 39) {
      move = 'right'
    }

    // move on click
    if(!isNaN(move) && game[move] !== 0) {
      if(game[move-1] === 0) {
        move = 'left'
      } else if(game[move+1] === 0) {
        move = 'right'
      } else if(game[move-4] === 0) {
        move = 'up'
      } else if(game[move+4] === 0) {
        move = 'down'
      }
    }

    // move with buttons
    console.log(move)

    const start = getCurrentPosition()
    let end = null
    // let end = (isNaN(move) || game[move] === 0) ? null : move // <-- hack the game :)

    switch(move) {
      case 'up':
        end = start + 4
        break
      case 'left':
        end = start + 1
        break
      case 'right':
        end = start - 1
        break
      case 'down':
        end = start - 4
        break

      default:
        break
    }

    if(canMove(start, end)) { 
      swapPosition(start, end)
      setMoves(moveCount + 1) 
    }
    else
      console.log('Cant move. Out of Border!')
  }

  // onKeyUp event handler
  document.onkeyup = moveItem()

  // chek win condition
  useEffect(() => {
    const initialGameState = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0]
    setWin(game.every((el, index) => el === initialGameState[index]))
  }, [game])

  // display controls message
  useEffect(() => {
    alert('Use buttons, arrow keys or click on a square to move.')
  }, [])

  if(win){
    return (
      <div>
        <h1>{`Congrats, u won in ${moveCount} moves`}</h1>
        <button onClick={() => setWin(false)}>Go back</button>
      </div>
    )
  }
  
  return (
    <div>
      <header>
        <div><button onClick={resetGame}>Reset Game</button></div>
        <h1>{`Moves: ${moveCount}`}</h1>
      </header>

      <div className="game">
        {game.map((el, index) => {
          let square = 'square'
          if(el === 0)
            square += ' empty-square'
          else if(el % 2 === 0)
            square += ' even-square' 
          return (
            <div className={square} key={index} onClick={moveItem(index)} >
              <h1>{el}</h1>
            </div>
          )
        })}
      </div>

      <div className="game-controls">
        <button onClick={moveItem('up')} >UP</button>
        <div>
          <button onClick={moveItem('left')} >LEFT</button>
          <button onClick={moveItem('right')} >RIGHT</button>
        </div>
        <button onClick={moveItem('down')} >DOWN</button>
      </div>
      
    </div>
  )
}

export default Game