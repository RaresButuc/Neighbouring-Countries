let visitedCountries = [];
let currentIndex = -1;
let isLastClickPrevOrNext = false

const mainFunct = (element, selectedElement) => {
    selectedElement.innerHTML = `
    <img src="${element.flags.png}">
    <h1>Country name: ${element.name.common}</h1>
    <h2>Region: ${element.region}</h2>
    <h3>Subregion: ${element.subregion}</h3>
    <h4>Capital: ${element.capital}</h4>
    <h4>Population: ${element.population}</h4>
    <h4>Area: ${element.area}</h4>
`;
}

const processPrevBtn = (selectedElement) => {
    console.log("PrevBtn")
    currentIndex--
    console.log(currentIndex)
    console.log(visitedCountries[currentIndex])
    mainFunct(visitedCountries[currentIndex], selectedElement)
}
const processNextBtn = (selectedElement) => {
    console.log("NextBtn")
    currentIndex++
    mainFunct(visitedCountries[currentIndex], selectedElement)
}

const loadEvent = function () {
    let largestPopulationNeighbor;
    let largestPopulation = 0;
    let largestAreaNeighbor;
    let largestArea = 0;

    const largest = (element1, element2, element3, key) => {
        if (!element1.borders) {
            main.innerHTML = `<h2>This country has no neighbours.</h2>`
        }
        element1.borders.forEach(borderCountry => {
            const currentNeighbor = countries.find(country => country.cca3 === borderCountry);

            if (currentNeighbor[key] > element2) {
                element2 = currentNeighbor[key];
                element3 = currentNeighbor;
                mainFunct(element3)
            }
        })
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

    //****************************************** */
    options.addEventListener("change", function () {
        const selectedValue = this.value;
        let selectedCountry = countries.find(country => country.name.common === selectedValue);

        if (selectedCountry) {
            console.log(selectedCountry)
            mainFunct(selectedCountry, main) //Show details of the country
        }

        const populationBtn = document.querySelector("#population");
        const areaBtn = document.querySelector("#area");
        //PopulationBtn and after AreaBtn
        //3.Largest population
        populationBtn.addEventListener("click", function () {
            largest(selectedCountry, largestPopulation, largestPopulationNeighbor, "population")

            //4. Largest area
            areaBtn.addEventListener("click", function () {
                largest(selectedCountry, largestArea, largestAreaNeighbor, "area")
            })
        })
        //AreaBtn and after PopulationBtn
        areaBtn.addEventListener("click", function () {
            largest(selectedCountry, largestArea, largestAreaNeighbor, "area")
            populationBtn.addEventListener("click", function () {
                largest(selectedCountry, largestPopulation, largestPopulationNeighbor, "population")
            })
        })

        //5. Previous and next buttons
        if (isLastClickPrevOrNext) {
            let tempVisitedCountries = JSON.parse(JSON.stringify(visitedCountries))
            // console.log(visitedCountries)
            for (let i = currentIndex + 1; i < visitedCountries.length; i++) {
                tempVisitedCountries.splice(i, 1)
            }
            visitedCountries = tempVisitedCountries
        }
        visitedCountries.push(selectedCountry)
        currentIndex = visitedCountries.length - 1;
        isLastClickPrevOrNext = false;
        console.log("visited",visitedCountries)
        console.log("current", currentIndex)
        prevBtn.style.display = "block"
        if (visitedCountries.length > 1) {
            nextBtn.style.display = "block"
        }
    })
    prevBtn.addEventListener('click', function(){
        isLastClickPrevOrNext = true;
        currentIndex--
        console.log(currentIndex)
        console.log(visitedCountries[currentIndex])
        mainFunct(visitedCountries[currentIndex], main)
        return
    })
    nextBtn.addEventListener('click', function () {
        isLastClickPrevOrNext = true;
        currentIndex++
        mainFunct(visitedCountries[currentIndex], main)
    })
    //6. Translations
    nav.insertAdjacentHTML("beforeend", `<select id=translations></select>`)
    const optionsOfTranslations = document.querySelector("#translations")
    optionsOfTranslations.insertAdjacentHTML("beforeend", `<option value="" selected="true" disabled>Select a language</option>`);
    countries.forEach(country => {
        //console.log(Object.keys(country.translations))
        (Object.keys(country.translations)).forEach(language => {
            options.insertAdjacentHTML("beforeend", `<option> ${language} </option>`);
        });
    });
}

window.addEventListener("load", loadEvent);
