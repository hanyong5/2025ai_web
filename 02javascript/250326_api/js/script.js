console.log("script")

async function initMap() {
  // var container = document.querySelector("#map")
  var container = document.getElementById("map")
  var mapOption = {
    center: new kakao.maps.LatLng(37.56826, 126.977829),
    level: 10,
  }

  var map = new kakao.maps.Map(container, mapOption)

  axios
    .get("city1.json")
    .then((res) => {
      console.log(res.data.city)
      const cityData = res.data.city

      //   cityData.forEach(function(item,index){})
      cityData.forEach((item, i) => {
        if (!item.title) {
          console.log(item.name)
          var markerPosition = new kakao.maps.LatLng(item.lat, item.lon)
          var marker = new kakao.maps.Marker({
            position: markerPosition,
          })
          marker.setMap(map)

          //   //이벤트
          //   var infowindow = new kakao.maps.InfoWindow({
          //     content: `<div class="mapinfo">${item.name}</div>`,
          //   })

          //   kakao.maps.event.addListener(marker, "mouseover", function () {
          //     infowindow.open(map, marker)
          //   })

          //   kakao.maps.event.addListener(marker, "mouseout", function () {
          //     infowindow.close()
          //   })

          getWeather(item.lat, item.lon).then((wData) => {
            console.log(wData)
            //이벤트
            // var infowindow = new kakao.maps.InfoWindow({
            //   content: `<img src="http://openweathermap.org/img/wn/${wData.icon}.png">
            //             <div class="mapinfo">도시 : ${item.name}</div>
            //             <div>온도 : ${wData.temp}</div>
            //             <div>상태 : ${wData.desc}</div>
            //             `,
            // })

            const content = `
            <div class="customoverlay">
              <div class="wrap">
                <div class="info">
                  <div class="title">${item.name}</div>
                  <div class="body">
                    <img src="images/${wData.icon}.png" style="width:50px;height:50px;">
                    <div class="desc">
                      <div>🌡️ 온도: ${wData.temp}°C</div>
                      <div>☁️ 상태: ${wData.desc}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `

            const overlay = new kakao.maps.CustomOverlay({
              content: content,
              position: marker.getPosition(),
              yAnchor: 1.2,
              zIndex: 3,
            })

            kakao.maps.event.addListener(marker, "click", function () {
              //   infowindow.open(map, marker)
              overlay.setMap(map)
            })

            kakao.maps.event.addListener(marker, "mouseout", function () {
              //   infowindow.close()
              overlay.setMap(null)
            })
          })
        }
      })
    })
    .catch((error) => {
      console.error("파일에러" + error)
    })
}

function getWeather(lat, lon) {
  const API_KEY = "4eedfeb184dc7cb08af6c0bd529c48b9"
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=${API_KEY}`
  let wData = axios
    .get(url)
    .then((response) => {
      const data = response.data
      console.log(data.name)
      return {
        temp: data.main.temp,
        desc: data.weather[0].description,
        icon: data.weather[0].icon,
      }
    })
    .catch((err) => {
      console.error("에러" + err)
    })

  return wData
}

initMap()
