const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
const calculateBMIBtn = document.getElementById("calculateBMI-btn");
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
const tableBodyEl = document.getElementById("tbody");
renderTableData(petArr)

const dateFormatOption = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
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

submitBtn.addEventListener('click', function () {

    // // Input data
    // const input = {
    //     id: idInput.value,
    //     name: nameInput.value,
    //     age: parseInt(ageInput.value),
    //     type: typeInput.value,
    //     weight: parseFloat(weightInput.value),
    //     length: parseFloat(lengthInput.value),
    //     color: colorInput.value,
    //     breed: breedInput.value,
    //     vaccinated: vaccinatedInput.checked,
    //     dewormed: dewormedInput.checked,
    //     sterilized: sterilizedInput.checked,
    //     date: new Date().toLocaleDateString("en-UK", dateFormatOption),
    //     bmi: "?",
    // };

    // const validate = validation(input);

    // if (validate) {
    //     petArr.push(input)
    //     saveToStorage("petArr", petArr)

    //     clearInput()

    //     renderTableData(petArr)
    // }

    // Test inputs
    const input1 = {
        id: "P001",
        name: "Jack",
        age: 13,
        type: "Cat",
        weight: 5,
        length: 50,
        color: "#048123",
        breed: "Tabby",
        vaccinated: true,
        dewormed: false,
        sterilized: false,
        date: new Date().toLocaleDateString("en-UK", dateFormatOption),
        bmi: "?",
    };

    const input2 = {
        id: "P002",
        name: "Oggy",
        age: 14,
        type: "Cat",
        weight: 14,
        length: 44,
        color: "#91EEEC",
        breed: "Tabby",
        vaccinated: true,
        dewormed: true,
        sterilized: true,
        date: new Date().toLocaleDateString("en-UK", dateFormatOption),
        bmi: "?",
    };

    const input3 = {
        id: "P003",
        name: "Bob",
        age: 14,
        type: "Dog",
        weight: 15,
        length: 44,
        color: "#A34100",
        breed: "Terrier",
        vaccinated: false,
        dewormed: false,
        sterilized: false,
        date: new Date().toLocaleDateString("en-UK", dateFormatOption),
        bmi: "?",
    };

    petArr.push(input1)
    petArr.push(input2)
    petArr.push(input3)

    saveToStorage("petArr", petArr)

    clearInput()

    renderTableData(petArr)

    function clearInput() {
        idInput.value = "";
        nameInput.value = "";
        ageInput.value = "";
        typeInput.value = "Select Type";
        weightInput.value = "";
        lengthInput.value = "";
        colorInput.value = "#000000";
        breedInput.value = "Select Breed";
        vaccinatedInput.checked = false;
        dewormedInput.checked = false;
        sterilizedInput.checked = false;
    }
});

function validation(input) {
    isValid = true;

    errMsg = "";

    if (input.id === "") {
        errMsg += "ID cannot be nulled!\n";
        isValid = false;
    }

    for (let i = 0; i < petArr.length; i++) {
        if (input.id === petArr[i].id) {
            errMsg += "ID cannot be duplicated!\n";
            isValid = false;
            break;
        }
    }

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

function renderTableData(petArr) {
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
                            <td>${petArr[i].bmi}</td>
							<td>${petArr[i].date}</td>
							<td><button type="button" class="btn btn-danger" onclick="deletePet('${petArr[i].id}')">Delete</button></td>`

        tableBodyEl.appendChild(row)
    }
}

function deletePet(petId) {
    // Confirm before deletePet
    if (confirm('Are you sure to delete?')) {
        for (let i = 0; i < petArr.length; i++) {
            if (petId === petArr[i].id) {
                petArr.splice(i, 1);

                saveToStorage("petArr", petArr);

                renderTableData(petArr);
                break;
            }
        }
    }
}

let healthyCheck = true;
healthyBtn.addEventListener('click', function () {
    if (healthyCheck === true) {
        const healthyPetArr = [];

        for (let i = 0; i < petArr.length; i++) {
            if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
                healthyPetArr.push(petArr[i]);
            }
        }

        renderTableData(healthyPetArr);

        healthyBtn.textContent = "Show All Pets";

        healthyCheck = false;
    } else {
        renderTableData(petArr);

        healthyBtn.textContent = "Show All Pets";

        healthyCheck = true;
    }
});

calculateBMIBtn.onclick = function () {
    for (let i = 0; i < petArr.length; i++) {
        if (petArr[i].type === "Dog") {
            petArr[i].bmi = ((petArr[i].weight * 703) / petArr[i].length ** 2).toFixed(2);
        } else {
            petArr[i].bmi = ((petArr[i].weight * 886) / petArr[i].length ** 2).toFixed(2);
        }
    }

    renderTableData(petArr);
}

