const navBtnDOM = document.querySelector("#nav-btn");
const navLinksDOM = document.querySelector("#nav-link");
navBtnDOM.addEventListener("click", () =>
  navLinksDOM.classList.toggle("display-nav")
);
