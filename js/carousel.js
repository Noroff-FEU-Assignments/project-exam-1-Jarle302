const [increment, decrement, changeSlides] = carouselState();
import {
  baseURL,
  username,
  password,
  renderBlogPosts,
  processResponse,
  modalMessage,
} from "./imports.js";

document.querySelector(".spinner").style.display = "block";
fetch(`${baseURL}?_embed`, {
  method: "GET",
  headers: { Authorization: "Basic " + btoa(`${username}:${password}`) },
})
  .then((res) =>
    res.json().then((data) => {
      const parsedPosts = processResponse(data);
      parsedPosts.forEach((element) =>
        renderBlogPosts(
          element,
          document.querySelector(".slides--container"),
          false
        )
      );
      const slidesArray = document.querySelectorAll(".slides");
      slidesArray[0].classList.add("active");
      document
        .querySelector("#forward--button")
        .addEventListener("click", () => changeSlides(increment, slidesArray));
      document
        .querySelector("#backward--button")
        .addEventListener("click", () => changeSlides(decrement, slidesArray));
      document.querySelector(".spinner").style.display = "none";
    })
  )
  .catch((error) =>
    modalMessage(
      document.querySelector(".slides--container"),
      "there was an error, sorry for the inconvenice"
    )
  );
//carousel code, returns three functions, destructure them out, state is kept in a closure.
function carouselState() {
  let indexCount = 0;
  function increment(arr) {
    if (arr) {
      if (indexCount >= arr.length - 1) {
        return (indexCount = 0);
      }
    }
    return indexCount++;
  }
  function decrement(arr) {
    if (arr) {
      if (indexCount === 0) {
        return (indexCount = arr.length - 1);
      }
    }
    return indexCount--;
  }

  function changeSlides(callback, arr) {
    arr[indexCount].classList.remove("active");
    callback(arr);
    arr[indexCount].classList.add("active");
  }

  return [increment, decrement, changeSlides];
}
