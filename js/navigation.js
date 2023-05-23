import { postToWP, validateInput } from "./imports.js";

function renderNavigation(domEl, ...links) {
  document.querySelector(domEl).innerHTML = `<nav class="nav--main wrapper">
  <a href="/index.html"> <img class="logo-image" src="/assets/logo.png" alt="" /> </a>

    <ul class="nav__ul">
    ${links
      .map(
        (link, index) =>
          `<li class="nav_ul_li"><a class="nav__ul__li__a" href="${link}">${
            index === 0
              ? "home"
              : link.split(".")[0].split("/")[
                  link.split(".")[0].split("/").length - 1
                ]
          }</a></li>`
      )
      .join("")}
        
    </ul>
    <button class="hamburger-menu__button btn--big-font">
    <i class="fa-solid fa-bars"></i></button>
</nav>`;
}

renderNavigation(
  "header",
  "/index.html",
  "/html/bloglist.html",
  "/html/about.html",
  "/html/contact.html"
);

document
  .querySelectorAll(".nav__ul__li__a")
  .forEach(
    (element) => isActive(element) && element.classList.add("active--nav")
  );

document
  .querySelector(".hamburger-menu__button")
  .addEventListener("click", () => {
    console.log("clicked");
    document.querySelector(".nav__ul").classList.toggle("visible");
  });

function isActive(element) {
  const url =
    window.location.pathname.split("/").length === 2
      ? window.location.pathname.split("/")[1].split(".")[0]
      : window.location.pathname.split("/")[2].split(".")[0];
  console.log(window.location.pathname);
  return url ===
    element.href.split("/")[element.href.split("/").length - 1].split(".")[0]
    ? true
    : false;
}

document.querySelector(
  "footer"
).innerHTML = `<section class="wrapper footer__section">
<h2 class="footer__h2">The Synthetic Scribe</h2>
<div>
  <a href="/index.html"><img class="footer__img" src="/assets/logo.png" /img></a>
  <div>
  <a class="social-media-icons" href="https://www.facebook.com/">
  <i class="fa-brands fa-facebook"></i>
  </a>
  <a class="social-media-icons" href="https://www.instagram.com">
  <i class="fa-brands fa-instagram"></i>
  </a>
  <a class="social-media-icons" href="https://www.twitter.com">
  <i class="fa-brands fa-twitter"></i>
  </a>
  </div> </div><div class="footer__div--subscribe">
  <p class="footer__h3">
  Subscribe for random subject updates!
  </p>
  <form class="form--subscribe">
  <div class="spinner spinner--nav"></div>
  <label class="input--subscribe--label" for="input--subscribe">
    yourEmail@email.com
  </label>
  <input
    name="your-email"
    id="input--subscribe"
    type="text"
    placeholder="yourEmail@email.com"
  />
  <button class="btn btn--alternate btn--footer">Subscribe!</button></div>
  </form>
  <p class="footer__p--copyright"> Copyright © Jarle Tollaksen 2023</p>;
  <div class="modal--subscribe">
          <h2>Success</h2>
          <p>You have successfully subscribed!</p>
        </div>
  </section>;
  `;

document.querySelector("#input--subscribe").addEventListener("focus", () => {
  document.querySelector(".input--subscribe--label").style.opacity = 1;
  document.querySelector("#input--subscribe").placeholder = "";
});

window.addEventListener("scroll", () => {
  if (scrollY > 0) {
    document.querySelector("header").classList.add("isScrolled--header");
    document.querySelector(".logo-image").classList.add("isScrolled--img");
  } else {
    document.querySelector("header").classList.remove("isScrolled--header");
    document.querySelector(".logo-image").classList.remove("isScrolled--img");
  }
});

document.querySelector(".btn--footer").addEventListener("click", (e) => {
  postToWP(e, "822", "modal--subscribe", "form--subscribe", "spinner--nav");
});

//regen gotten from chatGPT
validateInput(
  (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
  document.querySelector("#input--subscribe"),
  "Please input a valid email address"
);
