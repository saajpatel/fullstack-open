import { useState } from 'react'

const Header = ({header}) => (<h1>{header}</h1>)

const Button = (props) => (

  <button onClick={props.handleClick}>
    {props.text}
  </button>

)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const headers = {
    feedback: 'give feedback',
    statistics: 'statistics'
  }

  return (
    <div>
      <Header header = {headers.feedback}/>

      <Button handleClick={() => (setGood(good + 1))} text={'good'}/>
      <Button handleClick={() => (setNeutral(neutral + 1))} text={'neutral'}/>
      <Button handleClick={() => (setBad(bad + 1))} text={'bad'}/>

      <Header header = {headers.statistics}/>

      <p>good {good}</p>
      <p>meutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App