import { useState, useEffect } from 'react'
import axios from 'axios'
import countriesService from './services/countries'

const Display = ({data, showOneCountry}) => {

  console.log(data)
  if (data === null) {
    return null
  }

  if (data.length > 10) {
    return "Too many matches, specify another filter"
  }

  if (data.length === 1) {
    const country = data[0]
    console.log(Object.values(country.languages))
    return (
      <CountryData country={data[0]}/>
    )

  }

  return (
    <div>
      {data.map(country =>
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={() => showOneCountry(country.name.common)}>
          show
          </button>
        </div>
      )}
    </div>
  )

}

const CountryData = ({country}) => {
  
if (country === '') {
  return null
}

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
        {Object.values(country.languages).map(language =>
          <li key={language}>
            {language}
          </li>
        )}
      </ul>
      <img src={country.flags.png}/>
    </div>
  )
}

const App = () => {

  const [query, setQuery] = useState('')
  const [data, setData] = useState([])
  const [oneCountry, setOneCountry] = useState('')

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
    setOneCountry('')
  }

  const showOneCountry = (country) => {

    countriesService
    .getOne(country)
    .then(oneCountry => {
      setOneCountry(oneCountry)
    })

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
      <Display data={data} showOneCountry={showOneCountry}/>
      <CountryData country={oneCountry}/>
    </div>
  )
}

export default App
