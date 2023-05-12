import {
  username,
  password,
  renderBlogPosts,
  processResponse,
  baseURL,
} from "./imports.js";

const fetchBlog = fetchBlogposts();

document
  .querySelector(".blog-list__button--view-more")
  .addEventListener("click", () => {
    fetchBlog();
  });

function fetchBlogposts() {
  let pageNum = 1;
  function fetchBlogList(pagenum) {
    fetch(`${baseURL}?_embed&&?order=desc&?orderby=date&page=${pageNum}`, {
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
    pageNum++;
    console.log(pageNum);
  }
  return fetchBlogList;
}
