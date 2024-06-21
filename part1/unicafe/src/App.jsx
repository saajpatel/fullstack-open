import { useState } from 'react'

const Header = ({header}) => (<h1>{header}</h1>)

const Button = (props) => (

  <button onClick={props.handleClick}>
    {props.text}
  </button>

)

const Information = ({text, value}) => (

  <p>
    {text} {value}
  </p>

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

  const all = good + neutral + bad

  return (
    <div>
      <Header header = {headers.feedback}/>

      <Button handleClick={() => (setGood(good + 1))} text={'good'}/>
      <Button handleClick={() => (setNeutral(neutral + 1))} text={'neutral'}/>
      <Button handleClick={() => (setBad(bad + 1))} text={'bad'}/>

      <Header header = {headers.statistics}/>

      <Information text={'good'} value={good}/>
      <Information text={'neutral'} value={neutral}/>
      <Information text={'bad'} value={bad}/>
      <Information text={'all'} value={all}/>
      <Information text={'average'} value={(good - bad)/(all)}/>
      <Information text={'positive'} value={(good/all*100) + ' %'} />
    </div>
  )
}

export default App