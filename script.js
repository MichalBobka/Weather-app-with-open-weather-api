const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=f7df77ef00fd5d4b6f55a0d495f0eed2'
const API_UNITS = '&units=metric'

const getWeather = () => {
	const city = input.value || 'New York'
	const URL = API_LINK + city + API_KEY + API_UNITS

	axios
		.get(URL)
		.then(res => {
			const temp = res.data.main.temp
			const hum = res.data.main.humidity
			const status = Object.assign({}, ...res.data.weather)

			cityName.textContent = res.data.name
			temperature.textContent = Math.floor(temp) + '°C'
			humidity.textContent = hum + '%'
			weather.textContent = status.main

			warning.textContent = ''
			input.value = ''

			if (status.id > 199 && status.id < 233) {
				photo.setAttribute('src', './img.thunderstorm.png')
			} else if (status.id > 299 && status.id < 322) {
				photo.setAttribute('src', './img/drizzle.png')
			} else if (status.id > 499 && status.id < 532) {
				photo.setAttribute('src', './img/rain.png')
			} else if (status.id > 599 && status.id < 623) {
				photo.setAttribute('src', './img/ice.png')
			} else if (status.id > 700 && status.id < 782) {
				photo.setAttribute('src', './img/fog.png')
			} else if (status.id === 800) {
				photo.setAttribute('src', './img/sun.png')
			} else if (status.id > 800 && status.id < 805) {
				photo.setAttribute('src', './img/cloud.png')
			} else {
				photo.setAttribute('src', './img/unknown.png')
			}
		})
		.catch(() => (warning.textContent = 'Enter valid city name'))
}

const enterCheck = (e) => {
    if(e.key === 'Enter'){
        getWeather()
    }
}

input.addEventListener('keyup', enterCheck)
button.addEventListener('click', getWeather)
