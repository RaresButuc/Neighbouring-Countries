const loadEvent = function () {
    //1. List the countries
    const options = document.querySelector("#all");
    const population = document.querySelector('#population')
    const area = document.querySelector('#area')
    // options.insertAdjacentHTML("beforeend", `<p>Select the country</p>`);
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

        //3. Neighbour with the largest population
        population.addEventListener('click', function () {
            countries.forEach((element, i) => {
                let bigNeighbour = countries[countries.indexOf(element) -1]
                        let smallNeighbour = countries[countries.indexOf(element) +1]
                if (selectedCountry === element) {
                    if (countries[countries.indexOf(element) - 1].population > countries[countries.indexOf(element) + 1].population) {
                        main.innerHTML = `
                        <img src="${bigNeighbour.flags.png}">
                        <h1>${bigNeighbour.name.common}</h1>
                        <h2>${bigNeighbour.region}</h2>
                        <h3>${bigNeighbour.subregion}</h3>
                        <h4>${bigNeighbour.capital}</h4>
                        <h5>${bigNeighbour.population}</h5>
                     `;
                    } else {
                        main.innerHTML = `
                        <img src="${smallNeighbour.flags.png}">
                        <h1>${smallNeighbour.name.common}</h1>
                        <h2>${smallNeighbour.region}</h2>
                        <h3>${smallNeighbour.subregion}</h3>
                        <h4>${smallNeighbour.capital}</h4>
                        <h5>${smallNeighbour.population}</h5>
                     `;
                    }
                }
            })
        })
    });

};

window.addEventListener("load", loadEvent);
