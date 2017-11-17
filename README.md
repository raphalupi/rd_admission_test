# rd_admission_test
Admission test for Resultados Digitais company. Book search app made with React.js

## Guidelines

As provided in the e-mail, application should follow some patterns:

* Application should present clean and reusable code
* Be written in one of the specified frameworks (React.js chosen)
* Enables user to search for books, mark them as favorites and show its details
* Upon searching, the query terms should be highlighted in the results list
* Use Google Books API for searching
* Use good UI/UX patterns
* Have TDD/BDD oriented code, using tests like Jest
* No Backend! Its a SPA

### Installing

This code was developed using [Yarn](https://yarnpkg.com/pt-BR/) as its package manager. It can be installed with:
```
npm install -g yarn
```

After this, run:
```
yarn install
```
to download all project dependencies.

To run the project locally, you must install [Webpack](https://webpack.js.org/) with:
```
npm install -g webpack webpack-dev-server cross-env
```

Webpack will create the bundle.js file, Webpack-dev-server will create the development server to host the index file and Cross-env will make sure our CLI commands will run properly on all OS.

Now with Yarn installed, run:
```
yarn start
```
to have application running on localhost:8080

Application is also on [this github pages link](https://raphalupi.github.io/rd_admission_test/).

### Troubleshooting

In case I forgot to list a package that was not foind, please 'yarn add' it or 'npm install -g' it so the scriupts can run properly.

One issue I've encountered is with the total size of elements that are fetched on a search.
Upon searching, Google returns the selected page of books and an integer of how many are available.
What I saw is that this value changes when the page changes, leading to errors on the last page as it may not exist anymore.

### Project Details

For this project I focused mainly on getting a good stack to ensure the developemnt process ran smoothly. What I couldn't foresee is that it would take most of the available time to configre it all properly.

My initial idea was that by having a good stack I wouldn't need to worry much about doing the required HTTP requests, handling store changes in the components and get an overall very testable code.
This consumed around 16h to get done, dealing with issues on Windows for the CLI tasks, fixing issues to render SPAs on Github Pages and properly making React Router v4 work right (since I only had experience with it's v3).

In the stack I managed to add things like:
* [Redux](https://redux.js.org/) for store, actions and reducers handling
* [Babel](https://babeljs.io/) for ES6 transpiling
* [ESLint](https://eslint.org/) for code cleaness (can be run with 'yarn lint')
* [Bootstrap](https://react-bootstrap.github.io/) and [Tachyons](http://tachyons.io/) for styleguides

I did **NOT** add things to handle:
* Tests: Was planing os using [Jasmine](https://jasmine.github.io/) and using [Husky](https://github.com/typicode/husky) to hook the 'git push' process to test and linting, so as to ensure no syntax errors an 100% code coverage.
* [Storybook](https://github.com/storybooks): Since application corrently only renders the lists of searched books, I found it was too much effort to mock those simple components and ditched the storybook.
* Local storage management: This was required as a simple measure to handle the 'Favorites' feature. The plan was to store an array of books ids, and when loading the favorites page, fetch each individual book by its' ID and render the list. Adding or removing items from that list would modify the stored array.

Even as a simple application, I tried to maintain it responsive for small devices. works just fine listing books from large devices to small ones (such as the iPhone 5).

Regarind the routes, application was ineted for having a '/book/:id' route that would display book's detailed info as well as a '/favorites' to show the favorited books. Those were ditched due to time constraints.

Other information can be found throughout the code.

## Author

* **Raphael Lupchinski** - [LinkedIn](https://www.linkedin.com/in/rlupchinski/)
