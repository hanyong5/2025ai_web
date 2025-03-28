const API_KEY = "4eedfeb184dc7cb08af6c0bd529c48b9"

const myCityElem = document.querySelector(".mycity")
const tempElem = document.querySelector(".temp")
const locElem = document.querySelector(".loc")
const desElem = document.querySelector(".des")
const iconElem = document.querySelector(".icon")

myCityElem.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(success, fail)
})

function success(position) {
  console.log(position)
  let lat = Math.floor(position.coords.latitude * 10000) / 10000
  let lon = Math.floor(position.coords.longitude * 10000) / 10000

  const latitude = lat
  const longitude = lon

  getWeather(latitude, longitude)
}

function fail() {
  alert("좌표가 없음!!!!")
}

function getWeather(lat, lon) {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=35.907757&lon=127.766922&units=metric&lang=kr&appid=${API_KEY}`
    )
    // .get("https://api.openweathermap.org/data/2.5/weather", {
    //   params: {
    //     lat: lat,
    //     lon: lon,
    //     appid: API_KEY,
    //     units: "metric",
    //     lang: "kr",
    //   },
    // })
    .then(function (res) {
      console.log(res)
      tempElem.innerHTML = res.data.main.temp + "도"
      locElem.innerHTML = res.data.name
      desElem.innerHTML = res.data.weather[0].description

      const icon = res.data.weather[0].icon
      const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
      iconElem.setAttribute("src", iconURL)
    })
    .catch(function (error) {
      console.error("에러" + error)
    })
}
