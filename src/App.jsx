import React from "react"
import Die from "./Die"

export default function App() {
  const [dice, setDice] = React.useState(generateAllNewDice())

  function generateAllNewDice() {
    const randomNumbers = []

    for (let i = 0; i < 10; i++) {
      let result = Math.ceil(Math.random() * 6)
      randomNumbers.push(result)
    }
    return randomNumbers
  }

  function rollAgain() {
    setDice(generateAllNewDice())
  }

  const diceElements = dice.map((number) => (<Die value={number} />))

  return (
    <main>
      <div className="dice-container">
        {diceElements}
      </div>

      <button className="roll-dice" onClick={rollAgain}>Roll</button>      
    </main>
  )
}