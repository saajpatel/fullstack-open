import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
    }

    for (const person of persons) {

      if (person.name === nameObject.name) {
  
        alert(`${nameObject.name} is already added to phonebook`)
        return
        
      }

    }
    
    setPersons(persons.concat(nameObject))
    setNewName('')

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map(person =>
        <div key={person.name}> {person.name} </div>
      )}
    </div>
  )
}

export default App