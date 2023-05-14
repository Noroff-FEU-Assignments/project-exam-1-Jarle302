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
  .forEach((element) => isActive(element) && element.classList.add("active"));

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
  <h2>The Synthetic Scribe</h2>
  <a href="/index.html"><img class="footer__img" src="/assets/logo.png" /img></a>
  <h3>
  Subscribe for random subject updates!
  </h2>
  <label class="input--subscribe--label" for="input--subscribe">
    yourEmail@email.com
  </label>
  <input
    name="input--subscribe"
    id="input--subscribe"
    type="text"
    default="yourEmail@email.com"
  />
  <button>Subscribe!</button>
  <div>
  <a href="www.facebook.com">
  <i class="fa-brands fa-facebook"></i>
  </a>
  <a href="www.instagram.com">
  <i class="fa-brands fa-instagram"></i>
  </a>
  </div> <p class="footer__p--copyright"> Copyright © Jarle Tollaksen 2023</p>;
  </section>;
  `;
