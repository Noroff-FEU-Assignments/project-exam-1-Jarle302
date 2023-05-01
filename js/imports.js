export const username = "jarlehtollaksen2@live.no";
export const password = `5PWI pcln 2hoE 1Tid H0Nn UfOl`;
export const baseURL = "https://jarleblogg.no/wp-json/wp/v2/posts/";
export function renderBlogPosts(
  { title, text, imgURL, date, modified, id },
  domEl,
  isBackgroundImg = false
) {
  domEl.innerHTML += `
   <a href="/html/blogDetails.html?id=${id}" class="slides" style="background-image:url( ${
    isBackgroundImg ? imgURL : ""
  }); background-position: center; background-size:cover;">
  ${
    !isBackgroundImg
      ? `<div class="img--container"><img src="${imgURL}" alt=""></div>`
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

    newArr.push(newObject);
  });
  return newArr;
}
