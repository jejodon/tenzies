import { useState, useRef, useEffect } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice())
  
  const newGameButton = useRef(null);
  
  const gameWon = dice.every(die => die.isHeld) && 
  dice.every(die => die.value === dice[0].value )

  useEffect(() => {
    if (gameWon) {
      newGameButton.current.focus()
    }
  }, [gameWon])

  function generateAllNewDice() {
    const randomNumbers = []

    for (let i = 0; i < 10; i++) {
      let result = {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }
      randomNumbers.push(result)
    }
    return randomNumbers
  }

  function hold(id) {
    setDice(oldDice => oldDice.map(die => die.id === id ?
          {...die, isHeld: !die.isHeld} :
          die
      )
    )
  }

  function rollAgain() {
    if (!gameWon) {
      setDice(oldDice => oldDice.map(die => die.isHeld ?
        die :
        {...die, value: Math.ceil(Math.random() * 6)}
      ))
    } else {
      setDice(generateAllNewDice())
    }
  }

  const diceElements = dice.map((dieObj) => (<Die 
    key={dieObj.id} 
    value={dieObj.value} 
    isHeld={dieObj.isHeld} 
    hold={() => hold(dieObj.id)}
    />))

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}  
      </div>  
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollAgain} ref={newGameButton}>{gameWon ? "New game": "Roll"}</button>    
    </main>
  )
}