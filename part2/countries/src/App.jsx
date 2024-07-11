import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const Country = ({country}) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countriesService
      .getWeather(country)
      .then(weatherData => {
        console.log(weatherData)
        setWeather(weatherData)
      })
  }, [])

  if (!weather) {
    return null
  }

  const icon = weather.weather[0].icon
  const weatherIconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`

  console.log(country)

  return (

    <div>

      <h2>{country.name.common}</h2>

      <div>capital {country.capital}</div>
      <div>area {country.area}</div>

      <h4>languages:</h4>
      <ul>
        {Object.values(country.languages).map(language =>
          <li key={language}>
            {language}
          </li>
        )}
      </ul>

      <img src={country.flags.png}/>

      <h2>Weather in {country.capital}</h2>

      <p>
        temperature {weather.main.temp} Celsius
      </p>

      <img src={weatherIconUrl}/>

      <p>
        wind {weather.wind.speed} m/s
      </p>

    </div>

  )

}

const Display = ({countries, showCountry}) => {

  if (countries.length > 10) {

    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  if (countries.length === 1) {

    return (
      <Country country={countries[0]}/>
    )

  }

  return (
    <div>
      {countries.map(oneCountry =>
        <div key={oneCountry.name.common}>
          {oneCountry.name.common}
          <button onClick={() => {showCountry(oneCountry.name.common)}}>
            show
          </button>
        </div>
      )}
    </div>
  )

}

const App = () => {

  const [allData, setAllData] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(allCountries => {
        setAllData(allCountries)
      })
    }, [])

  const filteredCountries = allData.filter(
    oneCountry => oneCountry.name.common.toLowerCase().includes(query.toLowerCase()
  ))
  
  console.log(filteredCountries)

  const handleQueryChange = event => {
    setQuery(event.target.value)
  }

  return (
    <div>
      <div>
        find countries 
        <input
          value={query}
          onChange={handleQueryChange}>
        </input>
      </div>
      <Display 
      countries={filteredCountries}
      showCountry={setQuery}/>
    </div>
  )
}

export default App
