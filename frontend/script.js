const loadEvent = function () {
    //1. List the countries
    const options = document.querySelector("#all");

    countries.forEach((country, i) => {
        options.insertAdjacentHTML("beforeend", `<option id = ${i}> ${country.name.common} </option>`);
    });

    //2. Details of the selected country
    const main = document.querySelector("#country");
    main.innerHTML = `Select a country from the list`
    options.addEventListener("change", function () {
        const selectedValue = this.value;
        const selectedCountry = countries.find(country => country.name.common === selectedValue);
        if (selectedCountry) {
            main.innerHTML = `
                <img src="${selectedCountry.flags.png}">
                <h1>${selectedCountry.name.common}</h1>
                <h2>${selectedCountry.region}</h2>
                <h3>${selectedCountry.subregion}</h3>
                <h4>${selectedCountry.capital}</h4>
            `;
        }
    });

    //3. Neighbour with the largest population


};

window.addEventListener("load", loadEvent);
