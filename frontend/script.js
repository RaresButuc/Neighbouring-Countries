const loadEvent = function () {
    //1. List the countries
    const options = document.querySelector("#all");
    const population = document.querySelector('#population')
    const area = document.querySelector('#area')
    options.insertAdjacentHTML("beforeend", `<option value="" selected="true" disabled>Select a country</option>`);

    countries.forEach((country, i) => {
        options.insertAdjacentHTML("beforeend", `<option id = ${i}> ${country.name.common} </option>`);
    });

    //2. Details of the selected country
    const main = document.querySelector("#country");
    main.innerHTML = `Select a country from the list`
    let selectedCountry;
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

        //3.Largest population

        const populationBtn = document.querySelector("#population");

        populationBtn.addEventListener("click", function () {

            let largestPopulationNeighbor;
            let largestPopulation = 0;

            selectedCountry.borders.forEach(borderCountry => {
                const currentNeighbor = countries.find(country => country.cca3 === borderCountry);

                if (currentNeighbor.population > largestPopulation) {
                    largestPopulation = currentNeighbor.population;
                    largestPopulationNeighbor = currentNeighbor;
                    main.innerHTML = `
        <img src="${largestPopulationNeighbor.flags.png}"> </img>
        <h1>${largestPopulationNeighbor.name.common}</h1>
        <h2>${largestPopulationNeighbor.region}</h2>
        <h3>${largestPopulationNeighbor.subregion}</h3>
        <h4>${largestPopulationNeighbor.capital}</h4>
        <p> Population: ${largestPopulationNeighbor.population}</p>`
                }
            })
        })

        //4. Largest area
        const areaBtn = document.querySelector("#area");
        areaBtn.addEventListener("click", function () {

            let largestAreaNeighbor;
            let largestArea = 0;
            console.log(selectedCountry.area)
            selectedCountry.borders.forEach(borderCountry => {
                
                const currentNeighbor = countries.find(country => country.cca3 === borderCountry);
                console.log(currentNeighbor)
                if (currentNeighbor.area > largestArea) {
                    largestArea = currentNeighbor.area;
                    largestAreaNeighbor = currentNeighbor;
                    main.innerHTML = `
        <img src="${largestAreaNeighbor.flags.png}"> </img>
        <h1>${largestAreaNeighbor.name.common}</h1>
        <h2>${largestAreaNeighbor.region}</h2>
        <h3>${largestAreaNeighbor.subregion}</h3>
        <h4>${largestAreaNeighbor.capital}</h4>
        <p> Area: ${largestAreaNeighbor.area}</p>`
                }
            })
        })

        //5. Previous and next buttons
        
    })
}

window.addEventListener("load", loadEvent);
