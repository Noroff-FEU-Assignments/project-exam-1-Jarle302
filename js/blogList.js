import {
  username,
  password,
  renderBlogPosts,
  processResponse,
  baseURL,
} from "./imports.js";

let searchObject = {
  order: "desc",
  search: "",
  category: "",
};
const fetchBlog = fetchBlogposts(searchObject);
fetchBlog(searchObject);

document.querySelector(`input[name="sortByDate"]`).checked = true;

document
  .querySelector("#bloglist__input--search")
  .addEventListener("input", () => {
    document.querySelector("#bloglist__input--search")
      ? (searchObject.search = document.querySelector(
          "#bloglist__input--search"
        ).value)
      : (searchObject.search = "");
    console.log(searchObject);
  });

document
  .querySelector(".blog-list__button--view-more")
  .addEventListener("click", () => {
    document.querySelector(".spinnerTwo").style.display = "block";
    fetchBlog(searchObject);
  });

function fetchBlogposts() {
  document.querySelector(".spinnerTwo").style.display = "block";
  let pageNum = 1;
  function fetchBlogList(
    { order = "desc", search, category },
    isNewSearch = false,
    pagenum
  ) {
    if (isNewSearch) {
      pageNum = 1;
      document.querySelector(".blog-list__section--container").innerHTML = "";
    }
    console.log(order);
    let url = `https://jarleblogg.no/wp-json/wp/v2/posts?_embed&order=${order}&page=${pageNum}`;

    if (search) {
      url += `&search=${search}`;
    }

    if (category) {
      url += `&category=${category}`;
    }

    fetch(url, {
      method: "GET",
      headers: { Authorization: "Basic " + btoa(`${username}:${password}`) },
    })
      .then((res) => res.json())
      .then((data) => {
        processResponse(data).forEach((element) =>
          renderBlogPosts(
            element,
            document.querySelector(".blog-list__section--container", false)
          )
        );
        document.querySelector(".spinnerTwo").style.display = "none";
        pageNum++;
      })
      .catch((err) => {
        console.log(err);
        return;
      });
    // document.querySelector(".spinnerTwo").style.display = "none";

    console.log(pageNum);
  }
  return fetchBlogList;
}

const orderByButton = document.querySelector(".button--order-by--date");

orderByButton.addEventListener("click", (e) => {
  e.preventDefault();
  searchObject.order =
    document.querySelector(`input[name="sortByDate"]:checked`).value || "desc";
  console.log(searchObject);
  fetchBlog(searchObject, true);
});
