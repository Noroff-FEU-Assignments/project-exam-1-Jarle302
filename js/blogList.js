import {
  username,
  password,
  renderBlogPosts,
  processResponse,
  baseURL,
} from "./imports.js";

fetchBlogposts("10");
/*
fetch(`${baseURL}?_embed`, {
  method: "GET",
  headers: { Authorization: "Basic " + btoa(`${username}:${password}`) },
}).then((res) =>
  res
    .json()
    .then((data) =>
      processResponse(data).forEach((element) =>
        renderBlogPosts(
          element,
          document.querySelector(".blog-list__section--container", false)
        )
      )
    )
);

*/
document
  .querySelector(".blog-list__button--view-more")
  .addEventListener("click", () => {
    let counter = 10;
    let perPage = 100;
    fetchBlogposts(perPage, counter), (counter += perPage);
  });

function fetchBlogposts(postsPerPage, offset) {
  fetch(
    `${baseURL}?_embed&&?order=desc&?orderby=dateposts?per_page=${postsPerPage}${
      offset ? `&offset=${offset}` : ""
    }`,
    {
      method: "GET",
      headers: { Authorization: "Basic " + btoa(`${username}:${password}`) },
    }
  ).then((res) =>
    res
      .json()
      .then((data) =>
        processResponse(data).forEach((element) =>
          renderBlogPosts(
            element,
            document.querySelector(".blog-list__section--container", false)
          )
        )
      )
  );
}
