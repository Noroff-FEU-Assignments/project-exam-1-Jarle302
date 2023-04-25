const [increment, decrement, changeSlides] = carouselState();

fetch("http://jarleblog.local//wp-json/wp/v2/posts/?_embed").then((res) =>
  res.json().then((data) => {
    console.log(data);
    const parsedPosts = processResponse(data);
    parsedPosts.forEach((element) => renderCarouselSlides(element));
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

function renderCarouselSlides({ title, text, imgURL, date, modified }) {
  document.querySelector(".slides--container").innerHTML += `
 <div class="slides" style="background-image:url(${imgURL}); background-size:cover;">

 <div class="slides--container--textbox"><p class="slides__tag--featured">Latest</p><h2 class="slides__h2">${title}</h2> <p class="slides__p--breadtext">${text}</p></div>
   `;
}

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

function processResponse(arr) {
  const newArr = [];
  arr.forEach((element) => {
    const newObject = {};
    newObject.title = element.title.rendered;
    //regex gotten from chatGPT
    newObject.text = element.excerpt.rendered.replace(/(<p>|<\/p>|\n)/g, "");
    newObject.date = element.date;
    newObject.edited = element.modified;
    newObject.imgURL = element._embedded["wp:featuredmedia"]
      ? element._embedded["wp:featuredmedia"][0].media_details.sizes.full
          .source_url
      : "";

    newArr.push(newObject);
  });
  return newArr;
}
