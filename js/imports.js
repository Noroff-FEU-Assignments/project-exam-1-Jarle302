export const username = "jarlehtollaksen2@live.no";
export const password = `5PWI pcln 2hoE 1Tid H0Nn UfOl`;
export const baseURL = "https://jarleblogg.no/wp-json/wp/v2/posts/";

/*render blogpost, set isbackgroundimg to true, 
if you want the img to not be in an img tag, but be a background img instead*/
export function renderBlogPosts(
  { title, text, imgURL, date, modified, id, alt },
  domEl,
  isBackgroundImg = false
) {
  domEl.innerHTML += `
   <a href="/html/blogDetails.html?id=${id}" class="slides" style="background-image:url( ${
    isBackgroundImg ? imgURL : ""
  }); background-position: center; background-size:cover;">
  ${
    !isBackgroundImg
      ? `<div class="img--container"><img src="${imgURL}" alt=${alt}></div>`
      : ""
  }
   <div class="slides--container--textbox"><p class="carousel--date">${date}</p><p class="slides__tag--featured">${
    isBackgroundImg ? "Latest" : ""
  }</p><h2 class="slides__h2">${title}</h2> <p class="slides__p--breadtext">${text}</p></div>
    </a> `;
}
//parsing the data to fit my needs
export function processResponse(arr) {
  const newArr = [];
  arr.forEach((element) => {
    const newObject = {};
    newObject.title = element.title.rendered;
    //regex gotten from chatGPT
    newObject.id = element.id;
    newObject.text = element.excerpt.rendered.replace(/(<p>|<\/p>|\n)/g, "");
    newObject.date = element.date.split("T")[0];
    newObject.edited = element.modified;
    newObject.imgURL = element._embedded["wp:featuredmedia"]
      ? element._embedded["wp:featuredmedia"][0].media_details.sizes.full
          .source_url
      : "";
    newObject.alt = element._embedded["wp:featuredmedia"]
      ? element._embedded["wp:featuredmedia"][0].slug
      : "";

    newArr.push(newObject);
  });
  return newArr;
}

//I made this function for interaction design CA and reused it here. it validates
// the input on blur
export function validateInput(
  callback,
  domEl,
  errMessage,
  succMessage = ` <p class="success-message" ><i class="fa-regular fa-square-check";"></i> Done <p>`
) {
  const errorDiv = document.createElement("span");
  errorDiv.classList.add("error");
  domEl.insertAdjacentElement("afterEnd", errorDiv);
  domEl.addEventListener("blur", () => {
    errorDiv.innerHTML = callback(domEl.value) ? succMessage : errMessage;
    callback(domEl.value)
      ? (domEl.validated = true)
      : (domEl.validated = false);
  });
}
//checks if all forms have gotten through validation, needed this in addition to the other
// function to check before posting, if i didnt have this, the user needed to trigger the blur
// event manually before pressing the button.
export function isFormValidated(...domElements) {
  let allPassedValidation = 0;
  domElements.forEach((element) => {
    if (element.validated) {
      allPassedValidation++;
      element.style.border = "2px green solid";
    } else element.style.border = "2px red solid";
  });
  return allPassedValidation === domElements.length ? true : false;
}

//first domel = content, second = author, third subject will get the same prop name as the input name
export function postComment(postID, ...domElements) {
  document.querySelector(".spinner--two").style.display = "block";
  const content = domElements[0].value;
  const author_name = domElements[1].value;
  const post = postID;

  fetch("https://jarleblogg.no/wp-json/wp/v2/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, author_name, post }),
  })
    .then((res) => res.json())
    .then((data) => {
      data.message
        ? modalMessage(
            document.querySelector(".comments--container"),
            data.message,
            true
          )
        : renderComment(document.querySelector(".comments--container"), data);
      document.querySelector(".spinner--two").style.display = "none";
    })
    .catch((error) => {
      modalMessage(
        document.querySelector("main"),
        "there was an error, sorry for the inconvenience"
      );
    });
}

//checks if a modal with the given class exists, if not it creates one
//then sets the modals innerhtml to the  message passed as the second argument.
// third argument is that be able to change the styling based on the importance of the message
export function modalMessage(domEl, message, warning = false) {
  if (domEl.querySelector(".modal--function")) {
    domEl.querySelector(".modal--function").innerHTML = `<h3 class="${
      warning ? "modal--error" : "modal--success"
    }">${message}</h3>`;
    domEl.querySelector(".modal--function").style.display = "block";
  } else {
    domEl.innerHTML += `<div class="modal--function"> <h3 class="${
      warning ? "modal--error" : "modal--success"
    }">${message}</h3></div>`;
  }
  closeModal("modal--function");
}

//since i have so many modals, i made a function to close them
export function closeModal(modalClass) {
  document.addEventListener("click", (e) => {
    if (!document.querySelector(`.${modalClass}`).contains(e.target)) {
      document.querySelector(`.${modalClass}`).style.display = "none";
    }
  });
}

//post contact to wp
export function postToWP(e, id, modal, form, spinner) {
  e.preventDefault();
  const contactData = new FormData(document.querySelector(`.${form}`));
  document.querySelector(`.${spinner}`).style.display = "block";
  fetch(
    `https://jarleblogg.no/wp-json/contact-form-7/v1/contact-forms/${id}/feedback`,
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
      document.querySelector(`.${modal}`).style.display = "flex";
      document.querySelector(`.${spinner}`).style.display = "none";
      closeModal(`${modal}`);
    });
}

//function to render the newly posted comment to the dom without needing to
//use another get request.
export function renderComment(
  domEl,
  { author_name, author_avatar_urls, date, content }
) {
  domEl.contains(document.querySelector(".comment-placeholder"))
    ? (domEl.innerHTML = `<div class="blog--comment"> <div class="user-info">  <h3> <img class="comments--avatar" src="${
        author_avatar_urls[24]
      }" alt=""> ${author_name} <span class="comments--date">${date.replace(
        "-05T17",
        ""
      )}</span></h3></div> ${content.rendered} </div> `)
    : domEl.insertAdjacentHTML(
        "afterbegin",
        `<div class="blog--comment"> <div class="user-info">  <h3> <img class="comments--avatar" src="${
          author_avatar_urls[24]
        }" alt=""> ${author_name} <span class="comments--date">${date.replace(
          "-05T17",
          ""
        )}</span></h3></div> ${content.rendered} </div> `
      );
}
