export const username = "jarlehtollaksen2@live.no";
export const password = `5PWI pcln 2hoE 1Tid H0Nn UfOl`;
export const baseURL = "https://jarleblogg.no/wp-json/wp/v2/posts/";

/*Blog post content */
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

//I made this function for interaction design CA and reused it here.
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
      console.log(data),
        renderComment(document.querySelector(".comments--container"), data);
    });
}

//modal

export function closeModal(modalClass) {
  document.addEventListener("click", (e) => {
    if (!document.querySelector(`.${modalClass}`).contains(e.target)) {
      document.querySelector(`.${modalClass}`).style.display = "none";
    }
  });
}

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
