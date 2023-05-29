fetch("product.json")
    .then((response) => response.json())
    .then((data) => {
        // Data is the parsed JSON object
        console.log(data);
    })
    .catch((error) => {
        console.error("Error:", error);
    });

// simple shorthand for query selectors
const element = (element) => document.querySelector(element);
const elements = (element) => document.querySelectorAll(element);

const Card = ({ title, image_source, rating }) => {
    return `
    <div class="menu__card">
        <img src="${image_source}" alt="${title}" class="menu__card-image">
        <p class="menu__card-name">${title}</p>
        <p class="menu__card-rating">${rating} stars</p>
    </div>
    `;
};

const pages = elements(".page");
const navLinks = elements(".nav-bar__link");

navLinks.forEach((link) =>
    link.addEventListener("click", () => {
        const pageToShow = link.getAttribute("data-page");

        pages.forEach((page) => {
            if (pageToShow !== page.getAttribute("id")) {
                page.classList.remove("show");
            } else {
                page.classList.add("show");
            }
        });
    })
);

let dark = true;
// Night Light
const sunIcon = element("#sun");
const sunOff = element("#sun-off");

sunIcon.addEventListener("click", () => {
    sunIcon.classList.add("hide");
    sunOff.classList.remove("hide");
    document.documentElement.classList[dark ? 'add' : 'remove']('dark')
    dark = !dark
});

sunOff.addEventListener("click", () => {
    sunOff.classList.add("hide");
    sunIcon.classList.remove("hide");
    document.documentElement.classList[dark ? 'add' : 'remove']('dark')
    dark = !dark
});
