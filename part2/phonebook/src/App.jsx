import { useState, useEffect } from 'react'
import axios from 'axios'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

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
const Persons = ({persons, filter, deletePerson}) => {

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <>
      {personsToShow.map(person =>
        <div key={person.name}> 
          {person.name} {person.number} 
          <button onClick={() => deletePerson(person)}>
            delete
          </button>
        </div>
      )}
    </>
  )

}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setnewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newPhone
    }

    for (const person of persons) {

      if (person.name === nameObject.name) {
  
        if (window.confirm(`${nameObject.name} is already added to phonebook, replace the old number with a new one?`)) {

          const changedPerson = {...person, number: nameObject.number}

          phonebookService
            .updateNumber(changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(n => n.id !== returnedPerson.id ? n : returnedPerson))
              setNewName('')
              setnewPhone('')
              setMessage(
                `Changed number of ${changedPerson.name}`
              )
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            })
            .catch(error => {
              setErrorMessage(error.response.data.error)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              //setPersons(persons.filter(n => n.id !== changedPerson.id))
            })
            

        }

        return
        
      }

    }
    
    phonebookService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setnewPhone('')
        setMessage(
          `Added ${returnedPerson.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

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

  const deletePerson = (person) => {

    if(window.confirm(`Delete ${person.name}?`)) {

      phonebookService
      .deletePerson(person)
      .then (() => {
        setPersons(persons.filter(onePerson => onePerson.id !== person.id))
      })
      .catch(error => {

      })
        
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <ErrorNotification message={errorMessage}/>
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
      <Persons persons={persons} filter={filter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App