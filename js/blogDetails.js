import {
  baseURL,
  password,
  username,
  postComment,
  renderComment,
} from "./imports.js";

//get the correct blog id to be used when fetching the specific blog post
const queryString = document.location.search;
const parameters = new URLSearchParams(queryString);
const blogID = parameters.get("id");
document.querySelector(".spinner").style.display = "block";

//fetch the specific blogpost
fetch(`${baseURL}${blogID}`, {
  method: "GET",
  headers: { Authorization: "Basic " + btoa(`${username}:${password}`) },
}).then((res) =>
  res.json().then((data) => {
    document.title = `The Synthetic Scribe ||${data.title.rendered}`;
    document.querySelector(".blog__div--container").innerHTML =
      data.content.rendered;
    document.querySelectorAll("img").forEach((img) => {
      img.addEventListener("click", (e) => {
        e.stopPropagation();
        document.querySelector(".img-modal").style.display = "flex";
        document.querySelector(".img-modal__img").src = img.src;
        document.querySelector(".img-modal__img").alt = img.alt;
      });

      //add eventlistener to be able to close the modal
      document.addEventListener("click", (e) => {
        if (document.querySelector(".img-modal__img") !== e.target) {
          document.querySelector(".img-modal").style.display = "none";
        }
      });
    });
    document.querySelector(".spinner").style.display = "none";
  })
);

document
  .querySelector(".button--post-comment")
  .addEventListener("click", (e) => {
    e.preventDefault();
    postComment(
      blogID,
      document.querySelector("#message--comments"),
      document.querySelector("#username--comments")
    );
  });

//display spinner and fetch comments linked to the specific blogpost
document.querySelector(".spinner--two").style.display = "block";
fetch(`https://jarleblogg.no/wp-json/wp/v2/comments/?post=${blogID}`)
  .then((res) => res.json())
  .then((data) => {
    data.length > 0
      ? data.forEach(
          (element) =>
            (document.querySelector(
              ".comments--container"
            ).innerHTML += `<div class="blog--comment"> <div class="user-info">  <h3> <img class="comments--avatar" src=${
              element.author_avatar_urls[24]
            }" alt=""> ${
              element.author_name
            } <span class="comments--date">${element.date.replace(
              "-05T17",
              ""
            )}</span></h3></div> ${element.content.rendered} </div> `)
        )
      : (document.querySelector(
          ".comments--container"
        ).innerHTML += `<div class="blog--comment"> <h3 class="comment-placeholder">Be the first to comment!</h3> </div>`);
    document.querySelector(".spinner--two").style.display = "none";
  });
