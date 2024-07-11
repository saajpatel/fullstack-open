import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const geoUrl = 'http://api.openweathermap.org/geo/1.0/direct'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
const api_key = import.meta.env.VITE_SOME_KEY

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getOne = (country) => {

    const dataRequest = axios.get(`${baseUrl}/name/${country}`)
    return dataRequest.then(response => response.data)
}

const getGeo = (country) => {

    const geoRequest = axios.get(`${geoUrl}?q=${country}&appid=${api_key}`)
    return geoRequest.then(response => response.data)

}

const getWeather = (data) => {

    const geoData = data[0]
    const weatherRequest = axios.get(`${weatherUrl}?lat=${geoData.lat.toFixed(2)}&lon=${geoData.lon.toFixed(2)}&appid=${api_key}&units=metric`)
    console.log(`${weatherUrl}?lat=${geoData.lat.toFixed(2)}&lon=${geoData.lon.toFixed(2)}&appid=${api_key}&units=metric`)
    return weatherRequest.then(response => response.data)

}

export default { getAll, getOne, getGeo, getWeather }