import {
  username,
  password,
  renderBlogPosts,
  processResponse,
  baseURL,
  modalMessage,
} from "./imports.js";

//init searchobject to be used when searcing or ordering the blogposts(when making the api call)
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
  });

document
  .querySelector(".blog-list__button--view-more")
  .addEventListener("click", () => {
    document
      .querySelectorAll(".spinnerTwo")
      .forEach((element) => (element.style.display = "block"));
    fetchBlog(searchObject);
  });

//function to fetchblopost is using the search object to change the api call accordingly
// the function returns a function that keeps track of its state, so than when you
// press view more you will get correct next page.
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
        console.log(data);
        if (data.message) {
          console.log(data);
          modalMessage(
            document.querySelector(".blog-list__section--container"),
            "You've have reached in the end of our posts, the blog will generate a new post tomrrow for your entertainment",
            true
          );
        }
        if (data.length === 0) {
          modalMessage(
            document.querySelector(".blog-list__section--container"),
            "Sorry! We couldn't find what you are looking for, please try again with a different search query",
            true
          );
        }
        processResponse(data).forEach((element) =>
          renderBlogPosts(
            element,
            document.querySelector(".blog-list__section--container", false)
          )
        );
        document
          .querySelectorAll(".spinnerTwo")
          .forEach((element) => (element.style.display = "none"));
        pageNum++;
      })
      .catch((err) => {
        console.log(err);
        document
          .querySelectorAll(".spinnerTwo")
          .forEach((element) => (element.style.display = "none"));
        return;
      });
  }
  return fetchBlogList;
}

const orderByButton = document.querySelector(".button--order-by--date");

orderByButton.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".spinnerTwo").style.display = "block";
  searchObject.order =
    document.querySelector(`input[name="sortByDate"]:checked`).value || "desc";
  fetchBlog(searchObject, true);
});
