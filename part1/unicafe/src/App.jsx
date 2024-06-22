import { useState } from 'react'

const Header = ({header}) => (<h1>{header}</h1>)

const Button = (props) => (

  <button onClick={props.handleClick}>
    {props.text}
  </button>

)

const StatisticLine = ({text, value}) => (

  <tr>  
    <td>
      {text}
    </td>
    <td>
      {value}
    </td>
  </tr>

)

const Statistics = ({good, neutral, bad, all}) => {

  if (all === 0) {

    return (

      <p>
        No feedback given
      </p>

    )

  }

  return (
    <table>
      <tbody>
        <StatisticLine text={'good'} value={good}/>
        <StatisticLine text={'neutral'} value={neutral}/>
        <StatisticLine text={'bad'} value={bad}/>
        <StatisticLine text={'all'} value={all}/>
        <StatisticLine text={'average'} value={(good - bad)/(all)}/>
        <StatisticLine text={'positive'} value={(good/all*100) + ' %'}/>
      </tbody>
    </table>

  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const headers = {
    feedback: 'give feedback',
    statistics: 'statistics'
  }

  const all = good + neutral + bad

  return (
    <div>
      <Header header = {headers.feedback}/>

      <Button handleClick={() => (setGood(good + 1))} text={'good'}/>
      <Button handleClick={() => (setNeutral(neutral + 1))} text={'neutral'}/>
      <Button handleClick={() => (setBad(bad + 1))} text={'bad'}/>

      <Header header = {headers.statistics}/>

      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

export default App