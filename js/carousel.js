function renderCarouselSlides() {
  document.querySelector(".slides--container").innerHTML = `
 <div class="slides">
<div class="slides__img"> <img src="" alt=""></div>
 </div>
 <div><p class="slides__tag--featured"></p><h2 class="slides__h2"></h2> <p class="slides__p--breadtext"></p></div>
   `;
}

function changeSlides(slidesArray) {}

function carouselState() {
  indexCount = 0;
  function increment() {
    return indexCount++;
  }
  function decrement() {
    return indexCount--;
  }

  return [increment, decrement, indexCount];
}

function changeSlides(callback) {}
