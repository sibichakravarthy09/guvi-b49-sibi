const form = document.getElementById("myform");
const table = document.getElementById("dataTable");

form.addEventListener("submit", function (event) {
  event.preventDefault();
// Get the values from the form
const firstName = document.getElementById("firstName").value;
const lastName = document.getElementById("lastName").value;
const gender = document.querySelector('input[name="gender"]:checked').value;
const food = [];
document.querySelectorAll('input[name="food"]:checked').forEach((checkbox) => {
  food.push(checkbox.value);
});
const address = document.getElementById("address").value;
const state = document.getElementById("state").value;
const country = document.getElementById("country").value;
const pincode = document.getElementById("pincode").value;
// Create a new row in the table
const row = document.createElement("tr");
// Create cells for each column
const nameCell = document.createElement("td");
const genderCell = document.createElement("td");
const foodCell = document.createElement("td");
const addressCell = document.createElement("td");
const stateCell = document.createElement("td");
const countryCell = document.createElement("td");
const pincodeCell = document.createElement("td");
// Add the values to the cells
nameCell.innerHTML = `${firstName} ${lastName}`;
genderCell.innerHTML = gender;
foodCell.innerHTML = food.join(", ");
addressCell.innerHTML = address;
stateCell.innerHTML = state;
countryCell.innerHTML = country;
pincodeCell.innerHTML = pincode;
// Add the cells to the row
row.appendChild(nameCell);
row.appendChild(genderCell);
row.appendChild(foodCell);
row.appendChild(addressCell);
row.appendChild(stateCell);
row.appendChild(countryCell);
row.appendChild(pincodeCell);
// Add the row to the table
const table = document.getElementById("dataTable");
table.appendChild(row);
form.reset();
});