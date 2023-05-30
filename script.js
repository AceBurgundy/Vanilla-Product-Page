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
    })
    .catch((error) => {
        console.error("Error:", error);
    });

//clicking a product
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("menu__card")) {
        const productId = e.target.getAttribute("data-id");
        showProductPage(productId);
    }
    e.stopPropagation(); // Stop event propagation
});

//switch pages
const pages = elements(".page");
const navLinks = elements(".nav-bar__link");

// Iterate over each nav link and attach a click event listener
navLinks.forEach(navLink => {
  navLink.addEventListener('click', () => {
    const dataPageValue = navLink.getAttribute('data-page');
    
    // Find the corresponding element with the data-page value as its ID
    const targetElement = document.getElementById(dataPageValue);

    // If the target element exists
    if (targetElement) {
      // Add the 'show' class to the target element
      targetElement.classList.add('show');
      
      // Remove the 'show' class from other sibling elements
      const siblings = Array.from(targetElement.parentElement.children);
      siblings.forEach(sibling => {
        if (sibling !== targetElement) {
          sibling.classList.remove('show');
        }
      });
    }
  });
});


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

const content = element("#content");

function showProductPage(product_id) {
    const existingProductPage = element("#product");
    if (existingProductPage) {
        existingProductPage.remove();
    }

    const product = fetchedProducts.find((product) => product.id == product_id);

    if (product) {
        content.innerHTML += Product(product);

        pages.forEach((page) => {
            if (page.getAttribute("id") !== "product") {
                page.classList.remove("show");
            } else {
                page.classList.add("show");
            }
        });
    }
}

const Product = (props) => {
    return `
        <div id="product">
            <div id="product-left">
                <div id="product-left__image">
                    <img id="product-left__image-thumbnail" src="${
                        props.thumbnail
                    }" alt="${props.title}">
                    <div id="product-left__images">
                        ${props.images.map((image, index) => {
                            return `<img src="${image}" alt="${index}" class="product-left__images-image">`;
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

// Event listener for closing the product page
document.addEventListener("click", (e) => {
    if (e.target.id === "product-right__close") {
        element("#product").remove()
    }
});
