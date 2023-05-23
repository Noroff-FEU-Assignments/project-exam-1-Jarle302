const textPieces = document.querySelectorAll(".observed");
const options = { threshold: 1 };
const observer = new IntersectionObserver((entries, options) =>
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("isObserved");
    } else {
      entry.target.classList.remove("isObserved");
    }
  })
);

textPieces.forEach((p) => observer.observe(p));
