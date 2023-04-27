import { baseURL, password, username } from "./imports.js";
const queryString = document.location.search;
const parameters = new URLSearchParams(queryString);
const blogID = parameters.get("id");

fetch(`${baseURL}${blogID}`, {
  method: "GET",
  headers: { Authorization: "Basic " + btoa(`${username}:${password}`) },
}).then((res) =>
  res.json().then((data) => {
    document.querySelector(".blog__div--container").innerHTML =
      data.content.rendered;
    document.querySelectorAll("img").forEach((img) =>
      img.addEventListener("click", () => {
        console.log({ img });
        document.querySelector(".img-modal").style.display = "block";
        document.querySelector(".img-modal__img").src = img.src;
      })
    );
  })
);

document
  .querySelector(".img-modal__button--exit")
  .addEventListener("click", () => {
    document.querySelector(".img-modal").style.display = "none";
  });
