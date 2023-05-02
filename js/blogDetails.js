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
    document.querySelectorAll("img").forEach((img) => {
      img.addEventListener("click", (e) => {
        e.stopPropagation();
        console.log({ img });
        document.querySelector(".img-modal").style.display = "block";
        document.querySelector(".img-modal__img").src = img.src;
      });
      //gotten from chat-gpt
      document.addEventListener("click", (e) => {
        if (!document.querySelector(".img-modal").contains(e.target)) {
          document.querySelector(".img-modal").style.display = "none";
        }
      });
    });
  })
);

document
  .querySelector(".img-modal__button--exit")
  .addEventListener("click", () => {
    document.querySelector(".img-modal").style.display = "none";
  });
