document
  .querySelector("#formDetails")
  .addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {

  event.preventDefault();

  let destinationName = event.target.elements["destinationName"].value;
  let destinationLocation = event.target.elements["location"].value;
  let destinationPhoto = event.target.elements["imgUrl"].value;
  let destinationDesc = event.target.elements["description"].value;

  resetFormValues(event.target);

  let destinationCard = createDestinationCard(
    destinationName,
    destinationLocation,
    destinationPhoto,
    destinationDesc
  );

  let wishListContainer = document.querySelector("#formClone");

  if (wishListContainer.children.length === 0) {
    document.querySelector("#title").innerHTML = "My WishList";
  }

  document
    .querySelector("#formClone")
    .appendChild(destinationCard);
}

function resetFormValues(form) {

  for (let i = 0; i < form.length; i++) {
    form.elements[i].value = "";
  }
}

function createDestinationCard(name, location, imgUrl, description) {
  let card = document.createElement("div");
  card.setAttribute("class", "card");
  card.style.width = "15rem";
  card.style.height = "fit-content";
  card.style.margin = "20px;";

  let img = document.createElement("img");
  img.setAttribute("class", "card-img-top");
  img.setAttribute("alt", name);

  let constantimgUrl =
    "https://cavchronicle.org/wp-content/uploads/2018/03/top-travel-destination-for-visas-900x504.jpg";
  if (imgUrl.length === 0) {
    img.setAttribute("src", constantimgUrl);
  } else {
    img.setAttribute("src", imgUrl);
  }

  card.appendChild(img);

  let cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  let cardTitle = document.createElement("h5");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.innerText = name;
  cardBody.appendChild(cardTitle);

  let cardSubtitle = document.createElement("h6");
  cardSubtitle.setAttribute("class", "card-subtitle mb-2 text-muted");
  cardSubtitle.innerText = location;
  cardBody.appendChild(cardSubtitle);

  if (description.length !== 0) {
    let cardText = document.createElement("p");
    cardText.setAttribute("class", "card-text");
    cardText.innerText = description;
    cardBody.appendChild(cardText);
  }

  let buttonsContainer = document.createElement("div");
  buttonsContainer.setAttribute("class", "btn-container");

  let cardEditBtn = document.createElement("button");
  cardEditBtn.setAttribute("class", "btn btn-warning");
  cardEditBtn.innerText = "Edit";
  cardEditBtn.addEventListener("click", editDestination);

  let cardDeleteBtn = document.createElement("button");
  cardDeleteBtn.setAttribute("class", "btn btn-danger");
  cardDeleteBtn.innerText = "Remove";
  cardDeleteBtn.addEventListener("click", removeDestination);

  buttonsContainer.appendChild(cardEditBtn);
  buttonsContainer.appendChild(cardDeleteBtn);

  cardBody.appendChild(buttonsContainer);

  card.appendChild(cardBody);

  return card;
}

function editDestination(event) {
  let cardBody = event.target.parentElement.parentElement;
  let title = cardBody.children[0];
  let subTitle = cardBody.children[1];

  let card = cardBody.parentElement;
  let imgUrl = card.children[0];

  let newTitle = window.prompt("Enter new name");
  let newLocation = window.prompt("Enter new location");
  let newImgUrl = window.prompt("Enter new photo url");

  if (newTitle.length > 0) {
    title.innerText = newTitle;
  }

  if (newLocation.length > 0) {
    subTitle.innerText = newLocation;
  }

  if (newImgUrl.length > 0) {
    imgUrl.setAttribute("src", newImgUrl);
  }
}

function removeDestination(event) {
  let cardBody = event.target.parentElement.parentElement;
  let card = cardBody.parentElement;
  card.remove();
}