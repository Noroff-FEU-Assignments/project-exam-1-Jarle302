function renderNavigation() {
  document.querySelector("header").innerHTML = `<nav>
  <a href="/index.html"> <img class="logo-image" src="/assets/logoimage.png" alt="" /> </a>

    <ul class="nav__ul">
        <li class="nav_ul_li"><a class="nav__ul__li__a" href="/index.html">Home</a></li>
        <li class="nav_ul_li"><a class="nav__ul__li__a" href="/html/blogList.html">Blog</a></li>
        <li class="nav_ul_li"><a class="nav__ul__li__a" href="/html/about.html">About</a></li>
        <li class="nav_ul_li"><a class="nav__ul__li__a" href="/html/contact.html">Contact</a></li>
    </ul>
</nav>`;
}

renderNavigation();
