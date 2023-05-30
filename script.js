// simple shorthand for query selectors
const element = (element) => document.querySelector(element);
const elements = (element) => document.querySelectorAll(element);

//show cards
const Card = ({ id, title, image_source, rating }) => {
    return `
    <div class="menu__card" data-id="${id}">
        <img src="${image_source}" alt="${title}" class="menu__card-image">
        <p class="menu__card-name">${title}</p>
        <p class="menu__card-rating">${rating} stars</p>
    </div>
    `;
};

const menu = element("#menu");
let fetchedProducts = [];

// fetch product data
fetch("product.json")
    .then((response) => response.json())
    .then((data) => {
        const products = data.products;
        fetchedProducts = products;

        for (let index = 0; index < 8; index++) {
            const product = products[index];

            if (index < 4) {
                element("#menu-products-top").innerHTML += Card({
                    id: product.id,
                    title: product.title,
                    image_source: product.thumbnail,
                    rating: product.rating,
                });
            } else {
                element("#menu-products-bottom").innerHTML += Card({
                    title: product.title,
                    image_source: product.thumbnail,
                    rating: product.rating,
                });
            }
        }

        // clicking a product
        [...elements(".menu__card")].forEach((card) => {
            card.addEventListener("click", (e) => {
                showProductPage(e.target.getAttribute("data-id"));
            });
        });
    })
    .catch((error) => {
        console.error("Error:", error);
    });

//switch pages
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
    document.documentElement.classList[dark ? "add" : "remove"]("dark");
    dark = !dark;
});

sunOff.addEventListener("click", () => {
    sunOff.classList.add("hide");
    sunIcon.classList.remove("hide");
    document.documentElement.classList[dark ? "add" : "remove"]("dark");
    dark = !dark;
});

const content = element("#content")

function showProductPage(product_id) {
    fetchedProducts.forEach((product) => {
        if (product.id == product_id) {
            content.innerHTML += Product(product);
            [...content.children].forEach(child => {
                if (child.getAttribute("id") != "product") {
                    child.classList.remove("show")
                } else {
                    child.classList.add("show")
                }
            })
            return;
        }
    });

    element("#product-right__close").addEventListener("click", () => {
        [...content.children].forEach(child => {
            if (child.getAttribute("id") != "menu") {
                child.classList.remove("show")
            } else {
                child.classList.add("show")
            }
        })
        element("#product").remove()
    });
}
const Product = (props) => {
    return `
        <div id="product" class="page">
            <div id="product-left">
                <div id="product-left__image">
                    <img id="product-left__image-thumbnail" src="${
                        props.thumbnail
                    }" alt="${props.title}">
                    <div id="product-left__images">
                        ${props.images.map((image, index) => {
                            `<img src="${image}" alt="${index}" class="product-left__images-image">`;
                        })}
                    </div>
                </div>
            </div>
            <div id="product-right">
                <div id="product-right__close">close</div>
                <p id="product-right__title">${props.title}</p>
                <p id="product-right__brand">${props.brand}</p>
                <p id="product-right__description">${props.description}</p>
                <p id="product-right__category">${props.category}</p>
                <p id="product-right__price">$${props.price}</p>
            </div>
        </div>
    `;
};
