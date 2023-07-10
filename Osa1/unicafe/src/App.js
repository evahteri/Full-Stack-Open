import { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsLine = (props) => {
  if (props.text === "positive") {
    return (
      <tr>
      <td>{props.text}</td>
      <td>{props.value} %</td>
    </tr>
    )
  }
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>

  )
}

const Positive = (props) => {
  const average = props.good / (props.good + props.neutral + props.bad)
  if (props.good + props.neutral + props.bad === 0) {
    return 0
  }
  return average
}

const Average = (props) => {
  const average = (props.good + props.bad * (-1)) / (props.good + props.neutral + props.bad)
  if (props.good + props.neutral + props.bad === 0) {
    return 0
  }
  return average
}

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad === 0) {
    return <div>
      <p>No feedback given</p>
    </div>
  }
  const average = <Average good={props.good} bad={props.bad} neutral={props.neutral}/>
  const positive = <Positive good={props.good} bad={props.bad} neutral={props.neutral}/>
  return (
  <table>
    <tbody>
      <StatisticsLine text="good" value={props.good} />
      <StatisticsLine text="neutral" value={props.neutral} />
      <StatisticsLine text="bad" value={props.bad} />
      <StatisticsLine text="all" value={props.good + props.neutral + props.bad} />
      <StatisticsLine text="average" value={average} />
      <StatisticsLine text="positive" value={positive} />
    </tbody>
  </table>
  )

}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      
      <Button handleClick={handleGoodClick} text="good"></Button>
      <Button handleClick={handleNeutralClick} text="neutral"></Button>
      <Button handleClick={handleBadClick} text="bad"></Button>

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App