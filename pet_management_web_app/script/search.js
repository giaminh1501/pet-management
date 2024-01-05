const findBtn = document.getElementById("find-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const dateFormatOption = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
}

const date = new Date().toLocaleDateString("en-UK", dateFormatOption);

const tableBodyEl = document.getElementById("tbody");
const formEl = document.getElementById("container-form");

renderSearchData(petArr)

function renderSearchData(petArr) {
    tableBodyEl.innerHTML = "";

    for (let i = 0; i < petArr.length; i++) {
        const row = document.createElement('tr')
        row.innerHTML = `<th scope="row">${petArr[i].id}</th>
							<td>${petArr[i].name}</td>
							<td>${petArr[i].age}</td>
							<td>${petArr[i].type}</td>
							<td>${petArr[i].weight} kg</td>
							<td>${petArr[i].length} cm</td>
							<td>${petArr[i].breed}</td>
							<td>
								<i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
							</td>
							<td><i class="bi ${petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"}"></i></td>
							<td><i class="bi ${petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"}"></i></td>
							<td><i class="bi ${petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"}"></i></td>
							<td>${petArr[i].date}</td>`

        tableBodyEl.appendChild(row)
    }
}

breedInput.addEventListener('click', function () {
    if (typeInput.value === "Select Type") {
        alert("Please select a Pet Type first!");
    }
});

typeInput.addEventListener('click', function () {
    breedInput.innerHTML = `<option>Select Breed</option>`;

    let dogs = breedArr.filter(breed => breed.type === "Dog");
    let cats = breedArr.filter(breed => breed.type === "Cat");

    if (typeInput.value === "Dog") {
        dogs.forEach(dog => {
            const option = document.createElement("option");
            option.innerHTML = `${dog.breed}`;
            breedInput.appendChild(option);
        });
    } else if (typeInput.value === "Cat") {
        cats.forEach(cat => {
            const option = document.createElement("option");
            option.innerHTML = `${cat.breed}`;
            breedInput.appendChild(option);
        });
    }
});

findBtn.addEventListener('click', function () {

    let searchArr = petArr;

    if (idInput.value) {
        searchArr = searchArr.filter((item) => item.id.includes(idInput.value))
    }

    if (nameInput.value) {
        searchArr = searchArr.filter((item) => item.name.includes(nameInput.value))
    }

    if (typeInput.value !== "Select Type") {
        searchArr = searchArr.filter((item) => item.type === typeInput.value)
    }

    if (breedInput.value !== "Select Breed") {
        searchArr = searchArr.filter((item) => item.breed === breedInput.value)
    }

    if (vaccinatedInput.checked === true) {
        searchArr = searchArr.filter((item) => item.vaccinated === true)
    }

    if (dewormedInput.checked === true) {
        searchArr = searchArr.filter((item) => item.dewormed === true)
    }

    if (sterilizedInput.checked === true) {
        searchArr = searchArr.filter((item) => item.sterilized === true)
    }

    if (searchArr.length !== 0) {
        renderSearchData(searchArr);
    } else {
        alert("No records found base on this criteria!");
        renderSearchData(searchArr);
    }
});

