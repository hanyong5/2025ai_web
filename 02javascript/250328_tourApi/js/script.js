const page = 1

async function getTourData() {
  const loading = document.querySelector(".loading")

  const GO_KEY =
    "fvqYaGbexxakRPZj75oysm6y0Hos5Li3Vq47UgAYNvrYTeOzWmK9%2F5vzNC9OnAgbyG%2BtIWWqRIdTFKxa010hVA%3D%3D"

  try {
    const tourRes = await axios.get(
      `http://apis.data.go.kr/B551011/KorService1/areaBasedList1?numOfRows=12&pageNo=${page}&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${GO_KEY}&listYN=Y&arrange=A&contentTypeId=12&_type=json`
    )
    const tourDataList = tourRes.data.response.body.items.item
    const totalCount = tourRes.data.response.body.totalCount

    console.log(tourDataList)

    let html = ""
    for (const tourData of tourDataList) {
      html += `
                <div class="col-6 col-md-3 mb-3">
                    <div class="card overflow-hidden">
                        <div class="imgView">
                        <img src="${
                          tourData.firstimage != "" ? tourData.firstimage : "images/no_image.jpg"
                        }" alt="" />
                        </div>
                        <div class="card-body">
                        <h5>${tourData.title}</h5>
                        <button class="btn btn-primary" 
                        data-bs-toggle="modal" 
                        data-bs-target="#exampleModal"
                        data-title="${tourData.title}"
                        data-lat="${tourData.mapy}"
                        data-lng="${tourData.mapx}"
                        >상세보기</button>
                        </div>
                    </div>
                </div>
                `
    }
    document.querySelector(".tourData").innerHTML = html
    document.querySelector(".total").innerHTML = totalCount
  } catch (error) {
    console.error("정보x" + error)
  } finally {
    loading.style.display = "none"
  }
}

getTourData()

exampleModal.addEventListener("shown.bs.modal", async function (e) {
  const button = e.relatedTarget
  console.log(button)
  const title = button.getAttribute("data-title")
  const lat = parseFloat(button.getAttribute("data-lat"))
  const lng = parseFloat(button.getAttribute("data-lng"))

  const modalTitle = exampleModal.querySelector(".modal-title")
  modalTitle.innerHTML = title
})
