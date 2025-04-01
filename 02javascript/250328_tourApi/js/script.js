// let currentPage = 1
// let totalPage = 1

// async function getTourData(page) {
//   const loading = document.querySelector(".loading")

//   const GO_KEY =
//     "fvqYaGbexxakRPZj75oysm6y0Hos5Li3Vq47UgAYNvrYTeOzWmK9%2F5vzNC9OnAgbyG%2BtIWWqRIdTFKxa010hVA%3D%3D"

//   try {
//     const tourRes = await axios.get(
//       `http://apis.data.go.kr/B551011/KorService1/areaBasedList1?numOfRows=12&pageNo=${page}&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${GO_KEY}&listYN=Y&arrange=A&contentTypeId=12&_type=json`
//     )
//     const tourDataList = tourRes.data.response.body.items.item
//     const totalCount = tourRes.data.response.body.totalCount

//     console.log(tourDataList)

//     let html = ""
//     for (const tourData of tourDataList) {
//       html += `
//                 <div class="col-6 col-md-3 mb-3">
//                     <div class="card overflow-hidden">
//                         <div class="imgView">
//                         <img src="${
//                           tourData.firstimage != "" ? tourData.firstimage : "images/no_image.jpg"
//                         }" alt="" />
//                         </div>
//                         <div class="card-body">
//                         <h5>${tourData.title}</h5>
//                         <button class="btn btn-primary"
//                         data-bs-toggle="modal"
//                         data-bs-target="#exampleModal"
//                         data-title="${tourData.title}"
//                         data-lat="${tourData.mapy}"
//                         data-lng="${tourData.mapx}"
//                         >상세보기</button>
//                         </div>
//                     </div>
//                 </div>
//                 `
//     }
//     document.querySelector(".tourData").innerHTML = html
//     document.querySelector(".total").innerHTML = totalCount

//     totalPage = Math.ceil(totalCount / 15)
//     currentPage = page
//     pageNation()
//   } catch (error) {
//     console.error("정보x" + error)
//   } finally {
//     loading.style.display = "none"
//   }
// }

// getTourData(currentPage)

// exampleModal.addEventListener("shown.bs.modal", async function (e) {
//   const button = e.relatedTarget
//   console.log(button)
//   const title = button.getAttribute("data-title")
//   const lat = parseFloat(button.getAttribute("data-lat"))
//   const lng = parseFloat(button.getAttribute("data-lng"))

//   const modalTitle = exampleModal.querySelector(".modal-title")

//   modalTitle.innerHTML = title

//   const container = document.getElementById("map")
//   const mapOption = {
//     center: new kakao.maps.LatLng(lat, lng),
//     level: 3,
//   }

//   container.innerHTML = ""
//   const map = new kakao.maps.Map(container, mapOption)

//   const markerPosition = new kakao.maps.LatLng(lat, lng)
//   const marker = new kakao.maps.Marker({
//     position: markerPosition,
//     map: map,
//   })

//   setTimeout(() => {
//     kakao.maps.event.trigger(map, "resize")
//     map.setCenter(markerPosition)
//   }, 100)
// })

// function pageNation() {
//   const pn = document.querySelector(".pageNation .pageList")
//   pn.innerHTML = ""

//   const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1 // init 1
//   const endPage = startPage + 9 // init 10

//   console.log(startPage + "/" + endPage + "/" + totalPage)

//   let html = ""
//   for (let i = startPage; i <= endPage; i++) {
//     html += `<span class="pageNum ${
//       currentPage == i ? "active" : ""
//     }"><a href="javascript:void(0)" class="nav-link" onclick="getTourData(${i})">${i}</a></span>`
//   }

//   pn.innerHTML = html

//   document.querySelector(".prev").addEventListener("click", function () {
//     if (currentPage > 1) {
//       getTourData(currentPage - 1)
//     }
//   })

//   document.querySelector(".next").addEventListener("click", function () {
//     if (currentPage < totalPage) {
//       getTourData(currentPage + 1)
//     }
//   })

//   document.querySelector(".fNext").addEventListener("click", function () {
//     getTourData(totalPage)
//   })

//   if (currentPage == 1) {
//     document.querySelector(".prev").style.display = "none"
//   } else {
//     document.querySelector(".prev").style.display = "block"
//   }
//   if (currentPage == totalPage) {
//     document.querySelector(".next").style.display = "none"
//   } else {
//     document.querySelector(".next").style.display = "block"
//   }
// }

let currentPage = 1
let totalPage = 1

const API_KEY =
  "fvqYaGbexxakRPZj75oysm6y0Hos5Li3Vq47UgAYNvrYTeOzWmK9%2F5vzNC9OnAgbyG%2BtIWWqRIdTFKxa010hVA%3D%3D"
const BASE_URL = "http://apis.data.go.kr/B551011/KorService1/areaBasedList1"

const loading = document.querySelector(".loading")
const tourContainer = document.querySelector(".tourData")
const totalEl = document.querySelector(".total")
const pageList = document.querySelector(".pageNation .pageList")
const prevBtn = document.querySelector(".prev")
const nextBtn = document.querySelector(".next")
const fNextBtn = document.querySelector(".fNext")

async function getTourData(page = 1) {
  loading.style.display = "block"

  try {
    const { data } = await axios.get(
      `http://apis.data.go.kr/B551011/KorService1/areaBasedList1?numOfRows=12&pageNo=${page}&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${API_KEY}&listYN=Y&arrange=A&contentTypeId=12&_type=json`
    )

    const tourList = data.response.body.items.item || []
    const totalCount = data.response.body.totalCount

    renderTourList(tourList)
    totalEl.innerHTML = totalCount

    totalPage = Math.ceil(totalCount / 12)

    currentPage = page
    renderPagination()
  } catch (err) {
    console.error("데이터를 불러올 수 없습니다.", err)
  } finally {
    loading.style.display = "none"
  }
}

function renderTourList(tourList) {
  tourContainer.innerHTML = tourList
    .map((item) => {
      const imageUrl = item.firstimage || "images/no_image.jpg"
      return `
        <div class="col-6 col-md-3 mb-3">
          <div class="card overflow-hidden">
            <div class="imgView">
              <img src="${imageUrl}" alt="${item.title}" />
            </div>
            <div class="card-body">
              <h5>${item.title}</h5>
              <div class="">
              <button class="btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target="#exampleModal"
                data-title="${item.title}"
                data-lat="${item.mapy}"
                data-lng="${item.mapx}">
                상세보기
              </button>

              <button class="btn btn-info">추천</button>
              </div>
              
            </div>

          </div>
        </div>
      `
    })
    .join("")
}

function renderPagination() {
  const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1
  const endPage = Math.min(startPage + 9, totalPage)

  pageList.innerHTML = ""

  for (let i = startPage; i <= endPage; i++) {
    const activeClass = currentPage === i ? "active" : ""
    const span = document.createElement("span")
    span.className = `pageNum ${activeClass}`
    span.innerHTML = `<a href="javascript:void(0)" class="nav-link" onclick="getTourData(${i})">${i}</a>`
    pageList.appendChild(span)
  }

  prevBtn.style.display = currentPage === 1 ? "none" : "block"
  nextBtn.style.display = currentPage === totalPage ? "none" : "block"
}

function setupPaginationEvents() {
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) getTourData(currentPage - 1)
  })

  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPage) getTourData(currentPage + 1)
  })

  fNextBtn.addEventListener("click", () => getTourData(totalPage))
}

function setupModalEvent() {
  const exampleModal = document.getElementById("exampleModal")

  exampleModal.addEventListener("shown.bs.modal", function (e) {
    const button = e.relatedTarget
    const title = button.getAttribute("data-title")
    const lat = parseFloat(button.getAttribute("data-lat"))
    const lng = parseFloat(button.getAttribute("data-lng"))

    exampleModal.querySelector(".modal-title").innerHTML = title

    const container = document.getElementById("map")
    container.innerHTML = ""

    const mapOption = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3,
    }

    const map = new kakao.maps.Map(container, mapOption)

    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(lat, lng),
      map: map,
    })

    setTimeout(() => {
      kakao.maps.event.trigger(map, "resize")
      map.setCenter(marker.getPosition())
    }, 100)
  })
}

getTourData()
setupPaginationEvents()
setupModalEvent()
