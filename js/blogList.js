import {
  username,
  password,
  renderBlogPosts,
  processResponse,
  baseURL,
} from "./imports.js";

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
