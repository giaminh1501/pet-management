const submitBtn = document.getElementById("submit-btn");
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const tableBodyEl = document.getElementById("tbody");
renderBreedData(breedArr)

submitBtn.addEventListener('click', function () {

    // // Input breeds data
    // const breed = {
    //     breed: breedInput.value,
    //     type: typeInput.value,
    // }

    // const validate = validation(input);

    // if (validate) {
    //     breedArr.push(breed)
    //     saveToStorage("breedArr", breedArr)

    //     clearInput()

    //     renderBreedData(breedArr)
    // }

    // Test breeds data 
    const breed1 = {
        breed: "Terrier",
        type: "Dog",
    }

    const breed2 = {
        breed: "Tabby",
        type: "Cat",
    }

    const breed3 = {
        breed: "Persian",
        type: "Cat",
    }

    breedArr.push(breed1)
    breedArr.push(breed2)
    breedArr.push(breed3)

    saveToStorage("breedArr", breedArr)

    clearInput()

    renderBreedData(breedArr)

    function clearInput() {
        breedInput.value = "";
        typeInput.value = "Select Type";
    }
});

function validation(input) {
    isValid = true;

    errMsg = "";

    if (input.breed === "") {
        errMsg += "Breed cannot be nulled!\n";
        isValid = false;
    }

    if (input.type === "Select Type") {
        errMsg += "Please choose a pet type!\n";
        isValid = false;
    }

    if (isValid === false) {
        alert(errMsg);
    }

    return isValid;
}

function renderBreedData(breedArr) {
    tableBodyEl.innerHTML = "";

    for (let i = 0; i < breedArr.length; i++) {
        const row = document.createElement('tr')
        row.innerHTML = `<th scope="row">${i + 1}</th>
							<td>${breedArr[i].breed}</td>
							<td>${breedArr[i].type}</td>														                	
							<td><button type="button" class="btn btn-danger" onclick="deleteBreed(${i + 1})">Delete</button></td>`

        tableBodyEl.appendChild(row)
    }
}

function deleteBreed(breedIndex) {
    // Confirm before deleteBreed
    if (confirm('Are you sure to delete?')) {
        for (let i = 0; i < breedArr.length; i++) {
            if (breedIndex === i + 1) {
                breedArr.splice(i, 1);

                saveToStorage("breedArr", breedArr);

                renderBreedData(breedArr);
            }
        }
    }
}