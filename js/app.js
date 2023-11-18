import days from "../data/data.js";

const $container = document.querySelector(".js-container");
const date = new Date();
const today = date.getDate();

let data;

function saveToLocalStorage() {
  localStorage.setItem("data", JSON.stringify(data));
}

function initialData() {
  const storageData = localStorage.getItem("data");
  const localData = JSON.parse(storageData);

  if (localData) {
    data = localData;
  } else {
    data = days;
  }
}

function templateCard(item) {
  const card = document.createElement("div");
  const front = document.createElement("div");
  const back = document.createElement("div");

  card.classList = "card";

  if (item.isFlipped) {
    front.classList = "card_content card_front is-flipped";
    back.classList = "card_content card_back";
  } else {
    front.classList = "card_content card_front";
    back.classList = "card_content card_back is-flipped";
  }

  front.innerHTML = `<h2>December ${item.day}.</h2>`;

  let message;

  if (Number(item.day) === 24) {
    message = "Ma van Karácsony napja";
  } else {
    message = `Már csak ${24 - item.day} nap van Karácsonyig`;
  }

  back.innerHTML = `
    <div class="card_header">
        <iframe
            src="${item.link}"
            title="YouTube video player"
            frameborder="0"
            allowfullscreen
        ></iframe>
    </div>
    <div class="card_body">
        <p>${message}</p>
    </div>
  `;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", () => {
    if (item.day <= today) {
      front.classList.add("is-flipped");
      back.classList.remove("is-flipped");

      data[item.day - 1].isFlipped = true;

      saveToLocalStorage();
    } else {
      alert(
        "Hooooo-hooooo-hoooo! Ennek a dátumnak még nincs itt az ideje! Várj türelemmel!"
      );
    }
  });

  return card;
}

function render() {
  for (let day of data) {
    const newCard = templateCard(day);

    $container.appendChild(newCard);
  }
}

initialData();
render();
