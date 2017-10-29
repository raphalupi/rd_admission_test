'use strict';

var providedURL = "http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X"; 
var providedURLHTTPS = "https://roberval.chaordicsystems.com/challenge/challenge.json?callback=X";

// Simulates JQuery 'ready' event
document.addEventListener("DOMContentLoaded", function(event) {
    fetchData(providedURL);
    fetchData(providedURLHTTPS);
});

// Fetches the JSONP from the provided server
function fetchData(url) {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.src = url;
    document.body.appendChild(script);
}

// Handles the callback provided from the JSONP
function X(JSONPData) {
    console.log(JSONPData);

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
}

// Create a product card and adds it to the 'Reference product' container
function createReferenceProduct(product) {
    if (product) {
        // create a card for the reference product
        var productCard = _createProductCard(product);
        
        // adds the reference product to its container
        document.getElementById('reference-product').appendChild(productCard);
    } else {
        console.warn('No reference product provided.');
    }
}

function createSuggestions(products) {
    console.log(products);

    if (products) {
        var productCards = products.map(function(prod) {
            return _createProductCard(prod);
        });

        var suggestionsDiv = document.getElementById('suggestion-products-list');
        var gutterWrapper;

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
    console.log(['createProductCard :: creating card for product:', product]);

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

/* Showcase navigation */
function next() {

}

function prev() {

}