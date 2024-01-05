const navEl = document.getElementById("sidebar");
let petArr = [];
let breedArr = [];

navEl.addEventListener("click", function () {
    this.classList.toggle("active");
});

if (getFromStorage("petArr") !== null) {
    petArr = getFromStorage("petArr");
} 

if (getFromStorage("breedArr") !== null) {
    breedArr = getFromStorage("breedArr");
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
