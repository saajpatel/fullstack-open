import { useState } from 'react'

const Header = ({header}) => (
  <h1>
    {header}
  </h1>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const headers = {
    title: 'Anecdote of the day',
    most: 'Anecdote with the most votes'
  }

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(
    [0, 0, 0, 0, 0, 0, 0, 0]
  )

  const handleNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * 8))
  }
  
  const handleVote = () => {
    const newVote = [...vote]
    newVote[selected] += 1
    setVote(newVote)
  }

  return (

    <div>
      <Header header={headers.title}/>
      <p>
        {anecdotes[selected]}
      </p>
      <p>
        has {vote[selected]} votes
      </p>
      <button onClick={handleVote}>
        vote
      </button>
      <button onClick={handleNextAnecdote}>
        next anecdote
      </button>
      <Header header={headers.most}/>
      <p>
        {anecdotes[vote.indexOf(Math.max(...vote))]}
      </p>
    </div>
  )
}

export default App