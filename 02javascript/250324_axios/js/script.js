const Url = "https://dapi.kakao.com/v2/search/web"
const API_KEY = "a87c5485c788a8a30b03b139d3818495"
let query = ""
let currentPage = 1
let totalPage = 1

const inpElm = document.querySelector("#query")

// document.querySelector("#query")
document.querySelector("#searchBtn").addEventListener("click", function () {
  //   alert("test")
  query = inpElm.value.trim()
  search(currentPage)
})

async function search(page) {
  // if(query == ""){
  if (!query) {
    alert("검색어를 입력하세요")
    inpElm.focus()
    return
  }

  const apiUrl = Url + "?query=" + query + "&page=" + page
  // const apiUrl = `${Url}?query=${query}&sort=accruracy&page=${page}`
  try {
    const response = await axios.get(apiUrl, {
      headers: { Authorization: `KakaoAK ${API_KEY}` },
    })

    const data = response.data
    console.log(data.documents)

    let kakaoData = ""
    data.documents.forEach(function (item, index) {
      kakaoData += `<div>
                        <a href="${item.url}" class="nav-link" target="_blank"><h4>${item.title}</h4></>
                        <p class="bg-info rounded p-3">${item.contents}</p>
                    </div>`
    })

    document.querySelector(".results").innerHTML = kakaoData
    totalPage = Math.min(50, Math.ceil(data.meta.pageable_count / 10))
    currentPage = page
    pagination()
  } catch (error) {
    console.error("에러남" + error)
  }
}

function pagination() {
  const pn = document.querySelector(".pagination")
  pn.innerHTML = ""

  const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1 // init 1
  const endPage = Math.min(startPage + 9, totalPage) // init 10

  console.log("page : " + startPage, endPage)

  for (let i = startPage; i <= endPage; i++) {
    const liElem = document.createElement("li") // <li class=""></li>
    liElem.className = `page-item ${i == currentPage ? "active" : ""}`
    liElem.innerHTML = `<a href="" class="page-link">${i}</a>`
    // liElem.textContent = i
    pn.appendChild(liElem)
  }
}
