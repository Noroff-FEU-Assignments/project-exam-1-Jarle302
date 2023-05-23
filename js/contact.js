import { validateInput } from "./imports.js";
import { username, password, closeModal } from "./imports.js";
validateInput(
  (value) => value.trim().length > 5,
  document.querySelector("#input--name"),
  "Name must be atleast 6 characters"
);

//regen gotten from chatGPT
validateInput(
  (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
  document.querySelector("#input--email"),
  "Please input a valid email address"
);
validateInput(
  (value) => value.trim().length > 15,
  document.querySelector("#input--subject"),
  "Subject needs to be atleast 16 characters"
);
validateInput(
  (value) => value.trim().length > 25,
  document.querySelector("#input--message"),
  "message needs to be atleast 26 characters"
);

document.querySelector(".btn").addEventListener("click", (e) => {
  e.preventDefault();
  const contactData = new FormData(document.querySelector(".form--contact"));
  document.querySelector(".spinner").style.display = "block";
  fetch(
    "https://jarleblogg.no/wp-json/contact-form-7/v1/contact-forms/798/feedback",
    {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(`${username}:${password}`),
      },
      body: contactData,
    }
  )
    .then((res) => res.json())
    .then((data) => {
      document
        .querySelectorAll("input[type='text'],textarea")
        .forEach((element) => (element.value = ""));
      document.querySelector(".modal--contact").style.display = "flex";
      document.querySelector(".spinner").style.display = "none";
      closeModal("modal--contact");
    });
});
