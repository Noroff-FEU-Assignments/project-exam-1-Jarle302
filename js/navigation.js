function renderNavigation() {
  document.querySelector("header").innerHTML = `<nav class="nav--main wrapper">
  <a href="/index.html"> <img class="logo-image" src="/assets/logo.png" alt="" /> </a>

    <ul class="nav__ul">
        <li class="nav_ul_li"><a class="nav__ul__li__a" href="/index.html">Home</a></li>
        <li class="nav_ul_li"><a class="nav__ul__li__a" href="/html/bloglist.html">Blog</a></li>
        <li class="nav_ul_li"><a class="nav__ul__li__a" href="/html/about.html">About</a></li>
        <li class="nav_ul_li"><a class="nav__ul__li__a" href="/html/contact.html">Contact</a></li>
    </ul>
    <button class="hamburger-menu__button">
    <i class="fa-solid fa-bars"></i></button>
</nav>`;
}

renderNavigation();

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
