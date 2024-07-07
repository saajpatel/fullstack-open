import { useState, useEffect } from 'react'
import axios from 'axios'
import countriesService from './services/countries'

const Display = ({data}) => {

  console.log(data)
  if (data === null) {
    return null
  }

  if (data.length > 10) {
    return "Too many matches, specify another filter"
  }

  if (data.length === 1) {
    const country = data[0]
    console.log(country.languages)
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>
          capital {country.capital}
        </p>
        <p>
          area {country.area}
        </p>
        <h3>languages:</h3>
        <ul>
          
        </ul>
      </div>
    )

  }

  return (
    <div>
      <ul>
      {data.map(country =>
        <li key={country.name.common}>
          {country.name.common}
        </li>
      )}
      </ul>
    </div>
  )

}

const App = () => {

  const [query, setQuery] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    countriesService
      .getAll()
      .then(allCountries => {
        setData(allCountries.filter(
          country => (country.name.common.toLowerCase().includes(query.toLowerCase()))))
      })
  }, [query])

  const handleQueryChange = event => {
    setQuery(event.target.value)
  }

  return (
    <div>
      <p>
        find countries
        <input
        value={query}
        onChange={handleQueryChange}
        />
      </p>
      <Display data={data}/>
    </div>
  )
}

export default App
