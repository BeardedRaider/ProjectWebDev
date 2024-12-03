// Define the Person class
class Person {
    constructor(name, income, birthday) {
    this.name = name;
    this.income = parseFloat(income);
    this.birthday = new Date(birthday);
    }
}

// Array to store Person objects
const people = [];

// Add a person to the list
const addPerson = () => {
    const name = $("#name").val();
    const income = $("#income").val();
    const birthday = $("#birthday").val();

    if (name && income && birthday) {
    const person = new Person(name, income, birthday);
    people.push(person);
    updatePersonList();
    clearForm();
    } else {
    alert("Please fill out all fields.");
    }
};

// Update the displayed person list
const updatePersonList = () => {
    const personDisplay = $("#personDisplay");
    personDisplay.empty();

    people.forEach((person, index) => {
    personDisplay.append(
        `<li>
        <strong>${index + 1}. Name:</strong> ${person.name}, 
        <strong>Income:</strong> $${person.income.toFixed(2)}, 
        <strong>Birthday:</strong> ${person.birthday.toDateString()}
        </li>`
    );
    });
};

// Clear the form inputs
const clearForm = () => {
    $("#name").val("");
    $("#income").val("");
    $("#birthday").val("");
};

// Sort by income (highest first)
const sortByIncome = () => {
    people.sort((a, b) => b.income - a.income);
    updatePersonList();
};

// Sort by birthday (oldest first)
const sortByBirthday = () => {
    people.sort((a, b) => a.birthday - b.birthday);
    updatePersonList();
};

// Clear the list
const clearList = () => {
    people.length = 0; // Clear the array
    updatePersonList(); // Update the displayed list to reflect the change
};

// Event listeners
$(document).ready(() => {
    $("#addPersonButton").click(addPerson); // Add event listener for the add person button
    $("#sortIncomeButton").click(sortByIncome); // Add event listener for the sort by income button
    $("#sortBirthdayButton").click(sortByBirthday); // Add event listener for the sort by birthday button
    $("#clearButton").click(clearList); // Add event listener for the clear button
});


