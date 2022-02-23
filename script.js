let itemDate = null;

let itemTitle = null;

let itemDescription = null;

const openPopup = () => {
  document.getElementsByClassName("popup")[0].classList.add("active");
};
const closePopup = () => {
  document.getElementsByClassName("popup")[0].classList.remove("active");
};

document.getElementById("add-btn").addEventListener("click", openPopup);

document.getElementById("close-btn").addEventListener("click", closePopup);

const itemComplete = (id) => {
  document.getElementById(id).classList.add("done");

  let itemObj = JSON.parse(localStorage.getItem(id));
  itemObj.done = true;

  let itemString = JSON.stringify(itemObj);
  localStorage.setItem(id, itemString);
};

const addItem = () => {
  //   console.log("Hello World");
  itemDate = document.getElementById("date").value;

  itemTitle = document.getElementById("title").value;

  itemDescription = document.getElementById("description").value;
  //   console.log(itemDescription);
  const item = {
    id: localStorage.length,
    date: new Date(itemDate).toLocaleDateString(),
    title: itemTitle,
    description: itemDescription,
    done: false,
  };
  let itemString = JSON.stringify(item);
  localStorage.setItem(localStorage.length + 1, itemString);
  loadList();
  closePopup();
  return false;
};

const loadList = () => {
  let dateArr = [];
  Object.keys(localStorage).forEach((key) => {
    let itemObj = JSON.parse(localStorage.getItem(key));
    dateArr.push(itemObj.date);
  });
  if (dateArr.length !== 0) {
    let dateArrSort = dateArr.sort();
    let html = "";
    for (let i = 0; i < dateArrSort.length; i++) {
      Object.keys(localStorage).forEach((key) => {
        let itemObj = JSON.parse(localStorage.getItem(key));
        if (dateArrSort[i] == itemObj.date) {
          if (itemObj.done == false) {
            html += `
                <div class="note" id="${key}">
                    <div class="right_side">
                        <div class="title">
                            <small class="date">${itemObj.date}</small>
                            <h2 class="Title">${itemObj.title}</h2>
                            <div class="icon_side">
                                <button class="checkIcon" id="check" onclick="itemComplete(${key})"><i class="fa-solid fa-check"></i></button>
                                <button class="deleteIcon" onclick="deleteItem(${key})"><i class="fa-solid fa-trash-can"></i></button>                    
                            </div>
                        </div>
                        <div>
                            <p class="description">${itemObj.description}</p>
                        </div>
                    </div>
                </div>`;
          } else {
            html += `
            <div class="note done" id="${key}">
                <div class="right_side">
                    <div class="title">
                        <small class="date">${itemObj.date}</small>
                        <h2 class="Title">${itemObj.title}</h2>
                        <div class="icon_side">
                            <button class="checkIcon" id="check" onclick="itemComplete(${key})"><i class="fa-solid fa-check"></i></button>
                            <button class="deleteIcon" onclick="deleteItem(${key})"><i class="fa-solid fa-trash-can"></i></button>                    
                        </div>
                    </div>
                    <div>
                        <p class="description">${itemObj.description}</p>
                    </div>
                </div>
            </div>`;
          }
        }
        document.querySelector(".notes_container").innerHTML = html;
      });
    }
  } else {
    document.querySelector(
      ".notes_container"
    ).innerHTML = `<p>No Items Found!! Please add by clicking on Add Item</p>`;
  }
};

function deleteItem(id) {
  localStorage.removeItem(`${id}`);
  loadList();
}
const clearAll = () => {
  localStorage.clear();
  loadList();
};
loadList();
