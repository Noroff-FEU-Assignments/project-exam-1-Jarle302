function renderNavigation() {
  document.querySelector("header").innerHTML = `<nav>
  <a href="/index.html"> <img class="logo-image" src="/assets/logo.png" alt="" /> </a>

    <ul class="nav__ul">
        <li class="nav_ul_li"><a class="nav__ul__li__a" href="/index.html">Home</a></li>
        <li class="nav_ul_li"><a class="nav__ul__li__a" href="/html/blogList.html">Blog</a></li>
        <li class="nav_ul_li"><a class="nav__ul__li__a" href="/html/about.html">About</a></li>
        <li class="nav_ul_li"><a class="nav__ul__li__a" href="/html/contact.html">Contact</a></li>
    </ul>
</nav>`;
}

renderNavigation();

document
  .querySelectorAll(".nav__ul__li__a")
  .forEach((element) => isActive(element) && element.classList.add("active"));

function isActive(element) {
  console.log(window.location.href);

  return element.href ===
    window.location.href
      .split("https://reliable-kashata-528c36.netlify.app/")[0]
      .split("?")[0]
    ? true
    : false;
}
