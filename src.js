'use strict';

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
    console.log(['Fetched data:', JSONPData]);

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
        var productCard = _createProductCard(product);
        
        var referenceProductDiv = document.getElementById('reference-product');
        
        // removes the previous product
        if (referenceProductDiv.hasChildNodes()) {
            referenceProductDiv.removeChild(referenceProductDiv.firstChild);
        }

        // adds the reference product to its container
        referenceProductDiv.appendChild(productCard);
    } else {
        console.warn('No reference product provided.');
    }
}

function createSuggestions(products) {
    if (products) {
        var productCards = products.map(function(prod) {
            return _createProductCard(prod);
        });

        var suggestionsDiv = document.getElementById('suggestion-products-list');
        var gutterWrapper;

        // remove old products
        while (suggestionsDiv.hasChildNodes()) {
            suggestionsDiv.removeChild(suggestionsDiv.firstChild);
        }

        // adds new products to the list
        productCards.forEach(function(card) {
            gutterWrapper = document.createElement('div');
            gutterWrapper.setAttribute("class", "product-wrapper-gutter");

            gutterWrapper.appendChild(card);
            suggestionsDiv.appendChild(gutterWrapper);
        });
    } else {
        console.warn('No suggestions provided.');
    }
}

function _createProductCard(product) {
    var card = document.createElement('a');
    card.setAttribute("class", "product-wrapper");
    card.setAttribute("id", "product-" + product.businessId);
    card.setAttribute("target", "_blank");
    card.setAttribute("rel", "noreferrer noopener");
    card.setAttribute("href", "http:" + product.detailUrl);

    if (product.imageName) {
        var imageWrapper = _createProductImage(product.imageName);
        card.appendChild(imageWrapper);
    }

    if (product.name) {
        var productName = _createProductName(product.name);
        card.appendChild(productName);
    }

    if (product.oldPrice) {
        var productOldPrice = _createProductOldPrice(product.oldPrice);
        card.appendChild(productOldPrice);
    }

    if (product.price) {
        var productPrice = _createProductPrice(product.price);
        card.appendChild(productPrice);
    }

    if (product.productInfo && product.productInfo.paymentConditions) {
        var paymentConditions = _createProductPaymentConditions(product.productInfo.paymentConditions);
        card.appendChild(paymentConditions);
    }

    return card;
}

function _createProductImage(imageName) {
    var imageWrapper = document.createElement('div');
    imageWrapper.setAttribute("class", "product-image-wrapper");

    var image = document.createElement('img');
    image.setAttribute("src", "http:" + imageName);
    image.setAttribute("class", "product-image");

    imageWrapper.appendChild(image);
    return imageWrapper;
}

function _createProductName(name) {
    var productName = document.createElement('span');
    productName.setAttribute("class", "product-name");
    productName.setAttribute("title", name);
    productName.innerHTML = name;
    return productName;
}

function _createProductOldPrice(oldPrice) {
    var productOldPrice = document.createElement('div');
    productOldPrice.setAttribute("class", "product-old-price");

    var descriptionOld = document.createElement('span');
    descriptionOld.setAttribute("class", "description");
    descriptionOld.innerHTML = 'De:';

    var valueOld = document.createElement('span');
    valueOld.setAttribute("class", "value");
    valueOld.innerHTML = oldPrice;

    productOldPrice.appendChild(descriptionOld);
    productOldPrice.appendChild(valueOld);

    return productOldPrice;
}

function _createProductPrice(price) {
    var productPrice = document.createElement('div');
    productPrice.setAttribute("class", "product-price");

    var descriptionNew = document.createElement('span');
    descriptionNew.setAttribute("class", "description");
    descriptionNew.innerHTML = 'Por:';

    var valueNew = document.createElement('span');
    valueNew.setAttribute("class", "value");
    valueNew.innerHTML = price;

    productPrice.appendChild(descriptionNew);
    productPrice.appendChild(valueNew);

    return productPrice;
}

function _createProductPaymentConditions(paymentConditions) {
    var paymentConditionsNode = document.createElement('div');
    paymentConditionsNode.setAttribute("class", "product-payment-options");

    var option = document.createElement('span');
    option.setAttribute("class", "option");
    option.innerHTML = paymentConditions;

    var details = document.createElement('span');
    details.setAttribute("class", "details");
    details.innerHTML = "sem juros";

    paymentConditionsNode.appendChild(option);
    paymentConditionsNode.appendChild(details);

    return paymentConditionsNode;
}

/* Showcase config */
// variables for carousel control
var containerWidth = 0,
    listWidth = 0,
    numCards = 0,
    cardWidth = 170,
    fullCardsPerPage = 0,
    currentCard = 0,
    hasMoreLeft = false,
    hasMoreRight = false;

function updateCarouselControls() {
    var listWrapperDiv = document.getElementById('suggestion-products');
    var listDiv = document.getElementById('suggestion-products-list');

    containerWidth = listWrapperDiv.offsetWidth;
    listWidth = listDiv.offsetWidth;
    numCards = listDiv.childNodes.length;
    fullCardsPerPage = Math.floor(containerWidth / cardWidth);

    console.log([containerWidth, listWidth, numCards, fullCardsPerPage]);
}

/* Showcase navigation */
function next(e) {
    var prevBtnWrapper = document.getElementById('prev-button-wrapper'),
        nextBtnWrapper = document.getElementById('next-button-wrapper'),
        listDiv = document.getElementById('suggestion-products-list');

    currentCard = Math.min(currentCard + 1, numCards - 1);

    listDiv.style.marginLeft = (-1 * currentCard * cardWidth) + "px";
}

function prev(e) {
    var prevBtnWrapper = document.getElementById('prev-button-wrapper'),
        nextBtnWrapper = document.getElementById('next-button-wrapper'),
        listDiv = document.getElementById('suggestion-products-list');

    currentCard = Math.max(currentCard - 1, 0);

    listDiv.style.marginLeft = (-1 * currentCard * cardWidth) + "px";
}