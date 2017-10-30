'use strict';

// Optimized window resize with throttle, from MDN
(function() {
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                // using the deprecated 'createEvent' due to IE11 limitations
                var event = document.createEvent("Event");
                event.initEvent(name, false, true); 
                obj.dispatchEvent(event);
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle("resize", "optimizedResize");
})();

var providedURL = "http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X"; 

// Simulates JQuery 'ready' event
document.addEventListener("DOMContentLoaded", function(event) {
    fetchData();
});

// Fetches the local JSON
function fetchDataFromJSON(event) {
    X(localJSONData);
}

// Fetches the JSONP from the provided server
function fetchData() {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.src = providedURL;
    document.body.appendChild(script);
}

// Handles the callback provided from the JSONP
function X(JSONPData) {
    console.log(["Fetched data:", JSONPData]);

    var referenceProduct, suggestionProducts;

    // Surrounding variable fetch with try catch to avoid using 'a && a.b'
    // or something like lodash.get
    try {
        referenceProduct = JSONPData.data.reference.item;
    } catch (error) {
        referenceProduct = null;
    }

    try {
        suggestionProducts = JSONPData.data.recommendation;
    } catch (error) {
        suggestionProducts = null;
    }

    createReferenceProduct(referenceProduct);
    createSuggestions(suggestionProducts);

    updateCarouselControls();
}

// Create a product card and adds it to the 'Reference product' container
function createReferenceProduct(product) {
    if (product) {
        // create a card for the reference product
        var responsive = true;
        var productCard = _createProductCard(product, responsive);
        
        var referenceProductDiv = document.getElementById("reference-product");
        
        // removes the previous product
        if (referenceProductDiv.hasChildNodes()) {
            referenceProductDiv.removeChild(referenceProductDiv.firstChild);
        }

        // adds the reference product to its container
        referenceProductDiv.appendChild(productCard);
    } else {
        console.warn("No reference product provided.");
    }
}

function createSuggestions(products) {
    if (products) {
        var productCards = products.map(function(prod) {
            return _createProductCard(prod);
        });

        var suggestionsDiv = document.getElementById("suggestion-products-list");
        var gutterWrapper;

        // remove old products
        while (suggestionsDiv.hasChildNodes()) {
            suggestionsDiv.removeChild(suggestionsDiv.firstChild);
        }

        // adds new products to the list
        productCards.forEach(function(card) {
            gutterWrapper = document.createElement("div");
            gutterWrapper.setAttribute("class", "product-wrapper-gutter");

            gutterWrapper.appendChild(card);
            suggestionsDiv.appendChild(gutterWrapper);
        });
    } else {
        console.warn("No suggestions provided.");
    }
}

function _createProductCard(product, responsive) {
    var card = document.createElement("a"),
        responsiveWrapper = document.createElement("div");

    if (responsive) {
        card.setAttribute("class", "product-wrapper flex-row flex-column-sm card-w-100 card-w-150-px-sm");
    } else {
        card.setAttribute("class", "product-wrapper flex-column");
    }
    card.setAttribute("id", "product-" + product.businessId);
    card.setAttribute("target", "_blank");
    card.setAttribute("rel", "noreferrer noopener");
    card.setAttribute("href", "http:" + product.detailUrl);

    responsiveWrapper.setAttribute("class", "responsive flex-column");

    if (product.imageName) {
        var imageWrapper = _createProductImage(product.imageName);
        card.appendChild(imageWrapper);
    }

    if (product.name) {
        var productName = _createProductName(product.name);
        (responsive ? responsiveWrapper : card).appendChild(productName);
    }

    if (product.oldPrice) {
        var productOldPrice = _createProductOldPrice(product.oldPrice);
        (responsive ? responsiveWrapper : card).appendChild(productOldPrice);
    }

    if (product.price) {
        var productPrice = _createProductPrice(product.price);
        (responsive ? responsiveWrapper : card).appendChild(productPrice);
    }

    if (product.productInfo && product.productInfo.paymentConditions) {
        var paymentConditions = _createProductPaymentConditions(product.productInfo.paymentConditions);
        (responsive ? responsiveWrapper : card).appendChild(paymentConditions);
    }

    if (responsive) {
        card.appendChild(responsiveWrapper);
    }

    return card;
}

function _createProductImage(imageName) {
    var imageWrapper = document.createElement("div");
    imageWrapper.setAttribute("class", "product-image-wrapper");

    var image = document.createElement("img");
    image.setAttribute("src", "http:" + imageName);
    image.setAttribute("class", "product-image");

    imageWrapper.appendChild(image);
    return imageWrapper;
}

function _createProductName(name) {
    var productName = document.createElement("span");
    productName.setAttribute("class", "product-name");
    productName.setAttribute("title", name);
    productName.innerHTML = name;
    return productName;
}

function _createProductOldPrice(oldPrice) {
    var productOldPrice = document.createElement("div");
    productOldPrice.setAttribute("class", "product-old-price");

    var descriptionOld = document.createElement("span");
    descriptionOld.setAttribute("class", "description");
    descriptionOld.innerHTML = "De:";

    var valueOld = document.createElement("span");
    valueOld.setAttribute("class", "value");
    valueOld.innerHTML = oldPrice;

    productOldPrice.appendChild(descriptionOld);
    productOldPrice.appendChild(valueOld);

    return productOldPrice;
}

function _createProductPrice(price) {
    var productPrice = document.createElement("div");
    productPrice.setAttribute("class", "product-price");

    var descriptionNew = document.createElement("span");
    descriptionNew.setAttribute("class", "description");
    descriptionNew.innerHTML = "Por:";

    var valueNew = document.createElement("span");
    valueNew.setAttribute("class", "value");
    valueNew.innerHTML = price;

    productPrice.appendChild(descriptionNew);
    productPrice.appendChild(valueNew);

    return productPrice;
}

function _createProductPaymentConditions(paymentConditions) {
    var paymentConditionsNode = document.createElement("div");
    paymentConditionsNode.setAttribute("class", "product-payment-options");

    var option = document.createElement("span");
    option.setAttribute("class", "option");
    option.innerHTML = paymentConditions;

    var details = document.createElement("span");
    details.setAttribute("class", "details");
    details.innerHTML = "sem juros";

    paymentConditionsNode.appendChild(option);
    paymentConditionsNode.appendChild(details);

    return paymentConditionsNode;
}

// showcase controller options
var scco = {
    containerWidth: 0, // area to render carousel
    listWidth: 0, // size of the scrollable list
    numCards: 0, // amount of products to list
    currentCard: 0,
    fullCardsPerPage: 0, // amount of cards that fit in the current container width
    hasMoreLeft: false, // if there are hidden elements to the left
    hasMoreRight: false, // if there are hidden elements to the right
    cardWidth: 170, // width of a product card
    containerPadding: 60, // amount of padding on both sides
};

// handle window resizes
window.addEventListener("optimizedResize", function() {
    updateCarouselControls();
});

function updateCarouselControls() {
    var listWrapperDiv = document.getElementById("suggestion-products");
    var listDiv = document.getElementById("suggestion-products-list");
    var firstCard = listDiv.firstChild;
    var lastCard = listDiv.lastChild;

    listDiv.style.marginLeft = "0px";
    scco.containerWidth = listWrapperDiv.offsetWidth;
    scco.listWidth = lastCard.getBoundingClientRect().left - firstCard.getBoundingClientRect().left + scco.cardWidth + scco.containerPadding;
    scco.numCards = listDiv.childNodes.length;
    scco.currentCard = 0;
    scco.fullCardsPerPage = Math.max(Math.floor((scco.containerWidth - scco.containerPadding) / scco.cardWidth), 1);

    updateBoundariesClasses();
}

function updateBoundariesClasses() {
    var listDiv = document.getElementById("suggestion-products-list"),
        prevBtnWrapper = document.getElementById("prev-button-wrapper"),
        nextBtnWrapper = document.getElementById("next-button-wrapper");

    var currentMargin = parseInt((listDiv.style.marginLeft || "0px").split("px")[0], 10);

    if (currentMargin < 0) {
        scco.hasMoreLeft = true;
        prevBtnWrapper.classList.add("has-more");
    } else {
        scco.hasMoreLeft = false;
        prevBtnWrapper.classList.remove("has-more");
    }

    if (Math.floor(scco.listWidth + currentMargin) > scco.containerWidth) {
        scco.hasMoreRight = true;
        nextBtnWrapper.classList.add("has-more");
    } else {
        scco.hasMoreRight = false;
        nextBtnWrapper.classList.remove("has-more");
    }
}

/* Showcase navigation */
// Navigates to the next page in the showcase
// it scrolls to the left the amount of elements that are visible on screen currently
// e.g.: if showing items 0 to 5 (6 elements), showld now show items 6 to 11 (6 elements)
// If the available item range is invalid, clamps to the maximum amount of items
function next(e) {
    if (scco.hasMoreRight) {

        var listDiv = document.getElementById("suggestion-products-list");
        // clamp card range index between current index and.length - visible cards
        scco.currentCard = Math.min(scco.currentCard + scco.fullCardsPerPage, scco.numCards - scco.fullCardsPerPage);

        var currentScrollPosition = -1 * scco.currentCard * scco.cardWidth; // how much the list was pushed to the right
        var maximalScrollPosition = -1 * (scco.listWidth - scco.containerWidth); // when the list is binded to the right
        listDiv.style.marginLeft = Math.max(currentScrollPosition, maximalScrollPosition) + "px";
        updateBoundariesClasses();
    }
}

// Navigates to the previous page in the showcase
// it scrolls to the right the amount of elements that are visible on screen currently
// e.g.: if showing items 4 to 9 (6 elements), showld now show items 0 to 5 (6 elements)
// If the available item range is invalid, clamps to the first item
function prev(e) {
    if (scco.hasMoreLeft) {
        var listDiv = document.getElementById("suggestion-products-list");

        // clamp card range index between 0 and.current index
        scco.currentCard = Math.max(scco.currentCard - scco.fullCardsPerPage, 0);

        // clamps the margin to 0px
        listDiv.style.marginLeft = Math.min((-1 * scco.currentCard * scco.cardWidth), 0) + "px";
        updateBoundariesClasses();
    }
}