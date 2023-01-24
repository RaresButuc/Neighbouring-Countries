const loadEvent = function () {
    const mainFunct = (element) => {
        main.innerHTML = `
        <img src="${element.flags.png}">
        <h1>Country name: ${element.name.common}</h1>
        <h2>Region: ${element.region}</h2>
        <h3>Subregion: ${element.subregion}</h3>
        <h4>Capital: ${element.capital}</h4>
        <h4>Population: ${element.population}</h4>
        <h4>Area: ${element.area}</h4>
    `;
    }
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

    //**************************************** */
    //Ex. 5
    const nav = document.querySelector("#toolbar")
    nav.insertAdjacentHTML("beforeend",
        `<button id="prev">Previous country</button>
        <button id="next">Next country</button>
        `)
    const prevBtn = document.querySelector("#prev");
    prevBtn.style.display = "none"
    const nextBtn = document.querySelector("#next");
    nextBtn.style.display = "none"
    let visitedCountries = [];
    let currentIndex = visitedCountries.length -1;
    //**************************** */
    options.addEventListener("change", function () {
        const selectedValue = this.value;
        const selectedCountry = countries.find(country => country.name.common === selectedValue);

        //**************************************** */
        //Ex. 5
        visitedCountries.push(selectedCountry)
        console.log(visitedCountries)
        ++currentIndex
        if(currentIndex >= 1){
            prevBtn.style.display = "block"
            prevBtn.addEventListener('click', function(){
                mainFunct(visitedCountries[currentIndex-1])
                nextBtn.style.display = "block"
                nextBtn.addEventListener('click', function(){
                    mainFunct(visitedCountries[currentIndex])
                })
            })
        }
        
        //**************************** */


        if (selectedCountry) {
            mainFunct(selectedCountry)
        }
        //3.Largest population

        const populationBtn = document.querySelector("#population");

        populationBtn.addEventListener("click", function () {

            let largestPopulationNeighbor;
            let largestPopulation = 0;
            if (!selectedCountry.borders) {
                main.innerHTML = `<h2>This country has no neighbours.</h2>`
            }
            selectedCountry.borders.forEach(borderCountry => {
                const currentNeighbor = countries.find(country => country.cca3 === borderCountry);
                if (currentNeighbor.population > largestPopulation) {
                    largestPopulation = currentNeighbor.population;
                    largestPopulationNeighbor = currentNeighbor;
                    mainFunct(largestPopulationNeighbor)
                }
            })
        })

        //4. Largest area
        const areaBtn = document.querySelector("#area");
        areaBtn.addEventListener("click", function () {

            let largestAreaNeighbor;
            let largestArea = 0;
            if (!selectedCountry.borders) {
                main.innerHTML = `<h2>This country has no neighbours.</h2>`
            }
            selectedCountry.borders.forEach(borderCountry => {

                const currentNeighbor = countries.find(country => country.cca3 === borderCountry);
                console.log(currentNeighbor)
                if (currentNeighbor.area > largestArea) {
                    largestArea = currentNeighbor.area;
                    largestAreaNeighbor = currentNeighbor;
                    mainFunct(largestAreaNeighbor)
                }
            })
        })
        //5. Previous and next buttons
    })
}

window.addEventListener("load", loadEvent);
