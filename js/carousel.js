const [increment, decrement, changeSlides] = carouselState();
import {
  baseURL,
  username,
  password,
  renderBlogPosts,
  processResponse,
} from "./imports.js";
fetch(`${baseURL}?_embed`, {
  method: "GET",
  headers: { Authorization: "Basic " + btoa(`${username}:${password}`) },
}).then((res) =>
  res.json().then((data) => {
    console.log(data);
    const parsedPosts = processResponse(data);
    parsedPosts.forEach((element) =>
      renderBlogPosts(
        element,
        document.querySelector(".slides--container"),
        false
      )
    );
    console.log(parsedPosts);
    const slidesArray = document.querySelectorAll(".slides");
    console.log(slidesArray);
    slidesArray[0].classList.add("active");
    document
      .querySelector("#forward--button")
      .addEventListener("click", () => changeSlides(increment, slidesArray));
    document
      .querySelector("#backward--button")
      .addEventListener("click", () => changeSlides(decrement, slidesArray));
  })
);

function carouselState() {
  let indexCount = 0;
  function increment(arr) {
    if (arr) {
      if (indexCount >= arr.length - 1) {
        return (indexCount = 0);
      }
    }
    console.log(indexCount + 1);
    return indexCount++;
  }
  function decrement(arr) {
    if (arr) {
      if (indexCount === 0) {
        return (indexCount = arr.length - 1);
      }
    }
    console.log(indexCount - 1);
    return indexCount--;
  }

  function changeSlides(callback, arr) {
    console.log(indexCount);
    arr[indexCount].classList.remove("active");
    callback(arr);
    arr[indexCount].classList.add("active");
  }

  return [increment, decrement, changeSlides];
}
