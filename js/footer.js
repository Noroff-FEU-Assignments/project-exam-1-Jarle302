document.querySelector("footer").innerHTML = `<section>
  <h2>The Synthetic Scribe</h2>
  <img src="/assets/logo2.png" /img>
  <h3>
    Curious what random subject the Synthetic scribe chooses next time? Suscribe
    to our newsletter and never miss out!
  </h2>
  <label class="footer__input-subscribe--label" for="input--subscribe">
    yourEmail@email.com
  </label>
  <input
    name="footer__input-subscribe"
    id="footer__input-subscribe"
    type="text"
    default="yourEmail@email.com"
  />
  <button>Subscribe!</button>
</section>;
<div>
  <a href="www.facebook.com">
    <i class="fa-brands fa-facebook"></i>
  </a>
  <a href="www.instagram.com">
    <i class="fa-brands fa-instagram"></i>
  </a>
  <p> Copyright © Jarle Tollaksen 2023</p>
</div>`;
