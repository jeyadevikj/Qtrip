import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log("from init()",cities);
  console.log(config.backendEndpoint + "/cities");

  //Updates the DOM with the cities
  console.log("before");
  cities.forEach((key) => {
    //console.log(key);
    addCityToDOM(key.id, key.city, key.description, key.image);
    console.log(key.id, key.city, key.description, key.image)
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  // const data = fetch("http://43.204.223.125:8082/cities")
  // .then((response) => response.json())
  // // .then((data) => console.log(data));

  // .catch((err) => null);
  // console.log("fetch",data);
  try {
    var cities = await fetch(config.backendEndpoint + "/cities");
    let data = await cities.json();
    console.log("try",data)
    return data;
  } catch (err) {
    return null;
  }
  
  //return data;
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  //main id
  // console.log("addcity")
  let maindiv = document.getElementById("data");
  //sub-id and image
  let subdiv = document.createElement("div");
  subdiv.setAttribute("class", "col-sm-12 col-md-6 col-lg-3 mt-4");

  let sub_div1 = document.createElement("div");
  sub_div1.setAttribute("class", "tile");

  let imge = document.createElement("img");
  imge.setAttribute("src", image);
  
  let link=document.createElement("a");
  link.setAttribute("id",id);
  link.setAttribute("href","pages/adventures/?city="+id);
  // imge.append(link);

  let edittext = document.createElement("div");
  edittext.setAttribute(
    "class",
    "tile-text text-center text-light justify-content-end d-flex flex-column");

  //city
  let cities = document.createElement("h4");
  let text = document.createTextNode(city);
  cities.append(text);
  //decription
  let descrip = document.createElement("p");
  let txt = document.createTextNode(description);
  descrip.append(txt);

  edittext.append(cities, descrip);

  sub_div1.append(imge,edittext)
 // tile.append();
  link.append(sub_div1);
  subdiv.append(link);
  maindiv.append(subdiv);
}

export { init, fetchCities, addCityToDOM };
