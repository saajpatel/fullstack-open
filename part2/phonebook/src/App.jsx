import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filter, handleFilterChange}) => (
    <div>
    filter shown with <input
    value={filter}
    onChange={handleFilterChange}
    />
  </div>
)

const PersonForm = ({addName, newName, handleNameChange, newPhone, handlePhoneChange}) => (
  <form onSubmit={addName}>
    <div>
      name: <input 
      value={newName}
      onChange={handleNameChange}/>
    </div>
    <div>
      number: <input
      value={newPhone}
      onChange={handlePhoneChange} 
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)
const Persons = ({persons, filter}) => {

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <>
      {personsToShow.map(person =>
        <div key={person.name}> {person.name} {person.phone} </div>
      )}
    </>
  )

}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setnewPhone] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      phone: newPhone
    }

    for (const person of persons) {

      if (person.name === nameObject.name) {
  
        alert(`${nameObject.name} is already added to phonebook`)
        return
        
      }

    }
    
    setPersons(persons.concat(nameObject))
    setNewName('')
    setnewPhone('')

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setnewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
        addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newPhone={newPhone} 
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App