const hamburgerBtn = document.getElementById("hamburger-icon");
const hamburgerMenu = document.getElementById("nav-links-wrapper");

hamburgerBtn.addEventListener("click", () => {
  hamburgerMenu.classList.toggle("is-open")
});

const desktopMediaQuery = window.matchMedia("(min-width: 64em)");

function handleDesktopChange(e) {
  if (e.matches) {
    hamburgerMenu.classList.remove("is-open");
  }
}

desktopMediaQuery.addEventListener("change", handleDesktopChange);
handleDesktopChange(desktopMediaQuery);
