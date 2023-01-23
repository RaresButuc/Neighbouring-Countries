//1. List the countries
const loadEvent = function () {
    const options = document.querySelector("#all")
    countries.forEach((country, i) => {
        options.insertAdjacentHTML("beforeend", `<option id = ${i}> ${country.name.common} </option>`)
    });
}

window.addEventListener("load", loadEvent)
