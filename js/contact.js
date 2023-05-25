import { validateInput } from "./imports.js";
import { username, password, postToWP, isFormValidated } from "./imports.js";

validateInput(
  (value) => value.trim().length > 5,
  document.querySelector("#input--name"),
  "Name must be atleast 6 characters",
  ` <p class="success-message" ><i class="fa-regular fa-square-check";"></i> Done <p>`,
  document.querySelector(".btn"),
  document.querySelector("#input--name"),
  document.querySelector("#input--email"),
  document.querySelector("#input--subject"),
  document.querySelector("#input--message")
);

//regen gotten from chatGPT
validateInput(
  (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
  document.querySelector("#input--email"),
  "Please input a valid email address",
  ` <p class="success-message" ><i class="fa-regular fa-square-check";"></i> Done <p>`,
  document.querySelector(".btn"),
  document.querySelector("#input--name"),
  document.querySelector("#input--email"),
  document.querySelector("#input--subject"),
  document.querySelector("#input--message")
);
validateInput(
  (value) => value.trim().length > 15,
  document.querySelector("#input--subject"),
  "Subject needs to be atleast 16 characters",
  ` <p class="success-message" ><i class="fa-regular fa-square-check";"></i> Done <p>`,
  document.querySelector(".btn"),
  document.querySelector("#input--name"),
  document.querySelector("#input--email"),
  document.querySelector("#input--subject"),
  document.querySelector("#input--message")
);
validateInput(
  (value) => value.trim().length > 25,
  document.querySelector("#input--message"),
  "message needs to be atleast 26 characters",
  ` <p class="success-message" ><i class="fa-regular fa-square-check";"></i> Done <p>`
);

document.querySelector(".btn").addEventListener("click", (e) => {
  e.preventDefault();
  isFormValidated(
    document.querySelector("#input--name"),
    document.querySelector("#input--email"),
    document.querySelector("#input--subject"),
    document.querySelector("#input--message")
  )
    ? postToWP(e, "798", "modal--contact", "form--contact", "spinner")
    : console.log("error");
});
