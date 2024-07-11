import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const App = () => {

  const [allData, setAllData] = useState([])
  const [query, setQuery] = useState('')
  const [list, setList] = useState(null)

  useEffect(() => {
    countriesService
      .getAll()
      .then(allCountries => {
        setAllData(allCountries)
      })
    }, [])

  useEffect(() => {

    console.log(allData)

  }, [query])

  const handleQueryChange = event => {
    setQuery(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div>
      <p>
        find countries 
        <input
          value={query}
          onChange={handleQueryChange}>
        </input>
      </p>
    </div>
  )
}

export default App
