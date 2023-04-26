import { password, username } from "./imports.js";
const queryString = document.location.search;
const parameters = new URLSearchParams(queryString);
const blogID = parameters.get("id");

fetch(`https://jarleblogg.no/wp-json/wp/v2/posts/${blogID}`, {
  method: "GET",
  headers: { Authorization: "Basic " + btoa(`${username}:${password}`) },
}).then((res) => res.json().then((data) => console.log(data)));
