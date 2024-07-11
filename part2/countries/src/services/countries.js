import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
const api_key = import.meta.env.VITE_SOME_KEY

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getWeather = (country) => {

    const weatherRequest = axios.get(`${weatherUrl}?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}&units=metric`)
    console.log(`${weatherUrl}?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}&units=metric`)
    return weatherRequest.then(response => response.data)

}

export default { getAll, getWeather }