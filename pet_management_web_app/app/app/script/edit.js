const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
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

renderEditData(petArr)

function renderEditData(petArr) {
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
							<td>${petArr[i].date}</td>
							<td><button type="button" class="btn btn-warning" onclick="editPet('${petArr[i].id}')">Edit</button></td>`

        tableBodyEl.appendChild(row)
    }
}

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

function editPet(petId) {
    formEl.classList.remove("hide");

    for (let i = 0; i < petArr.length; i++) {
        if (petId === petArr[i].id) {

            idInput.value = petId;
            nameInput.value = petArr[i].name;
            ageInput.value = petArr[i].age;
            typeInput.value = petArr[i].type;
            weightInput.value = petArr[i].weight;
            lengthInput.value = petArr[i].length;
            colorInput.value = petArr[i].color;
            vaccinatedInput.value = petArr[i].vaccinated;
            dewormedInput.value = petArr[i].dewormed;
            sterilizedInput.value = petArr[i].sterilized;
            date = petArr[i].date;

            renderBreedData();

            breedInput.value = `${petArr[i].breed}`;
        }
    }
}

submitBtn.addEventListener('click', function () {

    // Input data
    const input = {
        id: idInput.value,
        name: nameInput.value,
        age: parseInt(ageInput.value),
        type: typeInput.value,
        weight: parseFloat(weightInput.value),
        length: parseFloat(lengthInput.value),
        color: colorInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
        date: new Date().toLocaleDateString("en-UK", dateFormatOption),
        bmi: "?",
    };

    const validate = validation(input);

    if (validate) {
        // Confirm before editPet
        if (confirm('Are you sure to edit?')) {
            for (let i = 0; i < petArr.length; i++) {
                if (input.id === petArr[i].id) {
                    input.date = petArr[i].date;

                    petArr[i] = input;
                    saveToStorage("petArr", petArr);
                }
            }

            formEl.classList.add("hide");
            renderEditData(petArr);
        }
    }

});

function validation(input) {
    isValid = true;

    errMsg = "";

    if (input.name === "") {
        errMsg += "Name cannot be nulled!\n";
        isValid = false;
    }

    if (isNaN(input.age)) {
        errMsg += "Age cannot be nulled!\n";
        isValid = false;
    }

    if (input.age < 1 || input.age > 15) {
        errMsg += "Age must be between 1 and 15!\n";
        isValid = false;
    }

    if (input.type === "Select Type") {
        errMsg += "Please choose a pet type!\n";
        isValid = false;
    }

    if (isNaN(input.weight)) {
        errMsg += "Weight cannot be nulled!\n";
        isValid = false;
    }

    if (input.weight < 1 || input.weight > 15) {
        errMsg += "Weight must be between 1 and 15!\n";
        isValid = false;
    }

    if (isNaN(input.length)) {
        errMsg += "Length cannot be nulled!\n";
        isValid = false;
    }

    if (input.length < 1 || input.length > 100) {
        errMsg += "Length must be between 1 and 100!\n";
        isValid = false;
    }

    if (input.breed === "Select Breed") {
        errMsg += "Please choose a pet breeding type!\n";
        isValid = false;
    }

    if (isValid === false) {
        alert(errMsg);
    }

    return isValid;
}