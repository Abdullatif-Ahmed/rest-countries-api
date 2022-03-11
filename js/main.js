let filterHeading = document.querySelector(".filter-container .filter-heading");
let modeToggle = document.querySelector("#mode-toggle");
let countryContainer = document.querySelector(".country-container");
let searchInp = document.getElementById("search-inp");
let filterRegion = document.querySelectorAll(".filter-container ul li");
filterHeading.addEventListener("click", () => {
  document.querySelector(".filter-container ul").classList.toggle("active");
});

function toggleMode() {
  modeToggle.addEventListener("click", (e) => {
    e.preventDefault;
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
    toggleImg();
    if (document.body.classList.contains("light-mode")) {
      localStorage.setItem("light-mode", "light-mode");
    } else {
      localStorage.removeItem("light-mode");
    }
  });
  if (localStorage.getItem("light-mode")) {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
  }
}
toggleMode();
function toggleImg() {
  if (document.body.classList.contains("dark-mode")) {
    document.querySelector("#mode-toggle img").src = "./images/icon-sun.svg";
  } else if (document.body.classList.contains("light-mode")) {
    document.querySelector("#mode-toggle img").src = "./images/icon-moon.svg";
  }
}
toggleImg();
fetchData("https://restcountries.com/v2/all");

async function fetchData(url) {
  let response = await fetch(url);
  if (response.status === 200) {
    let data = await response.json();
    addToPage(data);
    console.log(data);
  } else {
    console.log("ff");
  }
}
searchInp.addEventListener("input", (e) => {
  let searchVal = e.target.value.trim();
  if (searchVal.length === 0) {
    fetchData("https://restcountries.com/v3.1/all");
  } else {
    fetchData(`https://restcountries.com/v3.1/name/${searchVal}`);
  }
});
filterRegion.forEach((el) => {
  el.addEventListener("click", (e) => {
    console.log(e.target.dataset.region);
    fetchData(
      `https://restcountries.com/v3.1/region/${e.target.dataset.region}`
    );
  });
});
function addToPage(data) {
  countryContainer.innerHTML = "";

  data.forEach((country) => {
    let countryBox = document.createElement("div");
    countryBox.className = "country-box";
    countryBox.innerHTML = `
        <div class="img-container">
      <img src="${country.flags.png}" alt="${
      country.name ? country.name : country.name.common
    }"  />
    </div>
    <div class="country-box-bottom">
      <h2 data-country="${
        country.name.common ? country.name.common : country.name
      }" class="country-name">${
      country.name.common ? country.name.common : country.name
    }</h2>
      <div class="country-detail">
        Population: <span class="population-count">${country.population}</span>
      </div>
      <div class="country-detail">
        Region: <span class="region-name">${country.region}</span>
      </div>
      <div class="country-detail">
        Capital: <span class="capital-name">${country.capital}</span>
      </div>
    </div>`;
    countryContainer.appendChild(countryBox);
  });
}
