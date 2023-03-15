import config from "../conf/index.js";

let adventuresCopy = "";
//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // console.log(search);
  // const paramsString = "q=URLUtils.searchParams&topic=api";
  let searchParams = new URLSearchParams(search);
  // console.log(searchParams);
  let cities = searchParams.get("city");
  // console.log(cities);
  try {
    if (cities == null) {
      cities = "";
    } else {
      return cities;
    }
    return cities;
  } catch ({ error }) {
    return null;
  }
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  // console.log(city);
  let adv_city = await fetch(
    config.backendEndpoint + "/adventures?city=" + city
  )
    // console.log(adv_city);
    .then((response) => response.json())
    .catch((err) => null);
    adventuresCopy=adv_city;
  // console.log(adv_city);
  return adv_city;
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let maindiv = document.getElementById("data");
  for (let i = 0; i < adventures.length; i++) {
    let sub_div = document.createElement("div");
    sub_div.setAttribute("class", "col-lg-3 mb-4");

    let sub_tile = document.createElement("div");
    sub_tile.setAttribute("class", "activity-card");

    let imge = document.createElement("img");
    imge.setAttribute("src", adventures[i].image);
    //imge.setAttribute("id",adventures[i].id);

    let cat = document.createElement("p");
    cat.setAttribute("class", "category-banner");
    let adv_name_category = document.createTextNode(adventures[i].category);
    cat.append(adv_name_category);

    let link = document.createElement("a");
    link.setAttribute("id", adventures[i].id);
    link.setAttribute("href", "detail/?adventure=" + adventures[i].id);

    // let duration = document.createElement("duration");
    // duration.setAttribute("");

    console.log("adventure", adventures);
    let card_body = document.createElement("div");
    card_body.setAttribute("class", "card-body pb-0");
    //sname.append(text);

    let card_text = document.createElement("div");
    card_text.setAttribute(
      "class",
      "card-text d-lg-flex justify-content-lg-between flex-wrap w-100"
    );

    let adv_name = document.createElement("p");
    let adv_name_text = document.createTextNode(adventures[i].name);
    adv_name.append(adv_name_text);

    let cost = document.createElement("p");
    cost.innerHTML = `&#8377;<span class = "amount-in-rupess">${adventures[i].costPerHead}</span>`;
    // cost.setAttribute();

    //2nd row
    let card_text1 = document.createElement("div");
    card_text1.setAttribute(
      "class",
      "card-text d-lg-flex justify-content-lg-between flex-wrap w-100"
    );

    let adv_name1 = document.createElement("p");
    let adv_name_text1 = document.createTextNode("duration");

    adv_name1.append(adv_name_text1);

    let adv_cost1 = document.createElement("p");
    adv_cost1.innerHTML = adventures[i].duration + "hours";

    card_text.append(adv_name, cost);
    card_text1.append(adv_name1, adv_cost1);

    card_body.append(card_text, card_text1);

    sub_tile.append(imge, cat, card_body);
    link.append(sub_tile);
    sub_div.append(link);

    maindiv.append(sub_div);
  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let newlist = [];
  list.forEach(function (obj) {
    if (obj.duration >= low && obj.duration <= high) {
      newlist.push(obj);
    }
  });
  console.log("filterduration", list, low, high);
  return newlist;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  // console.log(list);
  let newlist = [];
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < categoryList.length; j++) {
      if (list[i].category === categoryList[j]) {
        newlist.push(list[i]);
      }
    }
  }
  list = newlist;
  console.log("newlist", newlist);
  console.log("category list", categoryList);
  return list;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // let category = filterByCategory();
  // let duration = filterByDuration();
  // console.log(list);
  // console.log(filters);
  // console.log("cat",filters.category);
  // list=filterByCategory(list,filters.category);

  if (filters.category.length != 0 && filters.duration != "") {
    
    list = filterByCategory(list, filters.category);

    let num = filters.duration.split("-");
    let min = num[0];
    let max = num[1];
    console.log(min, max);
    list = filterByDuration(list, min, max);
  } else if (filters.category.length != 0) {
    list = filterByCategory(list, filters.category);
  } else if (filters.duration != "") {
    let num1 = filters.duration.split("-");
    let min1 = num1[0];
    let max1 = num1[1];
    console.log(min1, max1);
    list = filterByDuration(list, min1, max1);
  }
  console.log("filter", list, filters);
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
let obj = localStorage.getItem("filters");
let data = JSON.parse(obj);
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryList = document.getElementById("category-list");
  console.log("filters", filters);
  if (filters.duration != "") {
    document.getElementById("duration-select").value = filters.duration;
  }
  filters.category.forEach((category, index) => {
    let categoryDiv = document.createElement("div");
    categoryDiv.setAttribute("class", "category-filter");
    categoryDiv.setAttribute("style", "position: relative");

    const categoryText = document.createElement("span");
    categoryText.setAttribute("class", "me-3");
    categoryText.textContent = category;

    const closeBtn = document.createElement("button");
    closeBtn.setAttribute("class", "btn");
    closeBtn.setAttribute("style", "position: absolute;right:0;top:0");
    closeBtn.innerHTML = `<i class="fa fa-close"></i>`;
    closeBtn.addEventListener("click", () => {
      filters.category.splice(index, 1);
      document.getElementById("data").innerHTML = "";
      categoryList.innerHTML = "";
      generateFilterPillsAndUpdateDOM(filters);
      let filteredAdventures = filterFunction(adventuresCopy, filters);
      addAdventureToDOM(filteredAdventures);
      saveFiltersToLocalStorage(filters);
    });

    categoryDiv.append(categoryText);
    categoryDiv.append(closeBtn);
    categoryList.append(categoryDiv);
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
