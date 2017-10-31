# chaordic_admission_test

Simple product's suggestion list component in pure JS for the admission test at Chaordic.
Project's idea is to render a showcase of several items provided in a JSONP using pure JS, HTML and CSS.

## Guidelines

As provided in the e-mail, application should follow some patterns to render the showcase, such as:

* Application should be created without using frameworks.
* HTML, CSS and overall code quality will be evaluated.
* User interaction elements will be evaluated (such as hovers, scrolls, links, etc...).
* The reference product should be rendered on the left side of the showcase.
* The suggestions should be rendered on the right side, in a carousel like format, including behavior for scrolling items in that list.

### Installing

Project can be run by opening the index.html file in a browser, or starting a small http server to serve the contents on a specific port.
I would recommend [http-server](https://www.npmjs.com/package/http-server), running:

```
npm install -g http-server
```

and then running:

```
http-server [folder] [options]
```

where [folder] defaults to ./ and options can be found in the aforementioned link.
Application is also on [this github pages link](https://raphalupi.github.io/chaordic_admission_test/).

### Troubleshooting

Since application is being served over HTTPS, the JSONP request made will **most** likely break due to security breach.
To overcome that, I've added the JSONP contents to the project and a button on page would fetch that data locally to the application.
*I know, not the best choice, but github pages is so easy to use...*

### Project Details

Results were achieved with pure Javascript, without using any lib that would improve workflow or facilitate some tasks.
Due to that, some adjustments were made so it would work correctly across multiple browsers:

* Some elements were rearranged on small screens (less than 425 pixels wide) to preserve navigation and readability in the showcase.
* Most of the CSS used for layout were based on Flexbox. I wasn't able to test on a updated Safari browser, but I've avoided using limited styles because of that.
* CSS variables were ditched due to the lack of support in IE, so to avoid IF-ing IE to fetch a different CSS, I've replaced variables with their values.

Regarding JavaScript:

* Used ES5 on purpose as to avoid using ES6 and Babel and break the 'workflow tools' principle.
* Even some ES6 sugars were avoided (such as arrow functions) since IE (for example) doesn't support them.
* Showcase navigation works with clicks on the left and right arrows.
* The amount of elements being scrolled matches the numer of elements being rendered fully on screen.
* Page resize updates the scroll behavior, as it may affect the amount of visible elements.
* Resizing screen scrolls back to the first element.

And that sums up what's on top of my head. We may discuss this in the future, hopefully :)

## Author

* **Raphael Lupchinski** - [LinkedIn](https://www.linkedin.com/in/rlupchinski/)
