const Url = "https://dapi.kakao.com/v2/search/web"
const API_KEY = "a87c5485c788a8a30b03b139d3818495"
let query = ""

const inpElm = document.querySelector("#query")

// document.querySelector("#query")
document.querySelector("#searchBtn").addEventListener("click", function () {
  //   alert("test")
  query = inpElm.value.trim()
  search()
})

async function search() {
  // if(query == ""){
  if (!query) {
    alert("검색어를 입력하세요")
    inpElm.focus()
    return
  }

  const apiUrl = Url + "?query=" + query
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
  } catch (error) {
    console.error("에러남" + error)
  }
}
