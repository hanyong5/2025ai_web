let listData = []

const inp = document.querySelector(".inp")
const btn = document.querySelector(".btn")
const dBtn = document.querySelector(".dBtn")
const listView = document.querySelector(".listView")

function loadData() {
  const storageData = localStorage.getItem("listData")
  console.log(storageData)
  listData = storageData ? JSON.parse(storageData) : []
}

function saveData() {
  localStorage.setItem("listData", JSON.stringify(listData))
}

function viewData() {
  console.log("view" + listData)
  let viewList = ""
  listData.forEach(function (item, index) {
    viewList += `<li>
                    <div>
                    <input type="checkbox" ${item.completed ? "checked" : ""}  
                    onclick="toggleCompleted(${index})" />
                        <span class="${item.completed ? "view" : ""}">${item.text}</span>
                    </div> 
                    <div onclick="del(${index})" class="myDel">[삭제]</div>
                </li>`
  })

  console.log(viewList)
  listView.innerHTML = viewList
}

btn.addEventListener("click", function () {
  let value = inp.value
  if (value) {
    listData.push({ text: value, completed: false })
    saveData()
    inp.value = ""
    viewData()
  } else {
    alert("오늘의 할일 입력해주세요")
  }
})

dBtn.addEventListener("click", function () {
  listData = []
  saveData()
  viewData()
})

function del(index) {
  //   alert(index)
  listData.splice(index, 1)
  saveData()
  viewData()
}

function toggleCompleted(index) {
  listData[index].completed = !listData[index].completed
  saveData()
  viewData()
}

loadData()
viewData()
