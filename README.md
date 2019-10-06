# template

Application template

# Start application
1. build common package
  - cd common
  - yarn
  - yarn build
2. setup and start backend
  - cd ../server
  - yarn
  - yarn setup
  - \# edit configuration file .env (not required)
  - yarn start
3. setup and start frontend
  - cd ../client
  - yarn
  - yarn setup
  - \# edit configuration file .env (not required)
  - yarn start

Default user: admin password: admin

## Tech stack

### Development

**TypeScript** - a typed superset of JavaScript that compiles to plain JavaScript  
https://www.typescriptlang.org/

**Yarn** - dependency manager  
https://yarnpkg.com/lang/en/

**DevServer** - webpack internal web server to quickly develop an application  
https://webpack.js.org/configuration/dev-server/

**TSLint** - An extensible linter for the TypeScript language  
https://palantir.github.io/tslint/

EditorConfig - helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs  
https://editorconfig.org/

### Backend

**Express** - Node.js web application framework  
https://expressjs.com/

**TypeORM** - an ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8)  
https://typeorm.io

Winston - a logger for just about everything  
https://github.com/winstonjs/winston

sql.js - SQLite compiled to JavaScript through Emscripten  
https://github.com/kripken/sql.js/  

### Frontend

**React** - UI library  
https://reactjs.org/

**React Router** - a collection of navigational components that compose declaratively with your application  
https://reacttraining.com/react-router

**Redux** - state container  
https://redux.js.org/

React Redux - official React bindings for Redux  
https://react-redux.js.org/

**Redux-Saga** - make application side effects easier to manage, more efficient to execute, easy to test, and better at handling failures  
https://redux-saga.js.org/

**Reselect** - simple “selector” library for Redux (and others)  
https://github.com/reduxjs/reselect#installation

typesafe-actions - typesafe utilities for "action-creators" in Redux / Flux Architecture  
https://github.com/piotrwitek/typesafe-actions

Axios - promise based HTTP client for the browser and node.js  
https://github.com/axios/axios

**Material-UI** - React components that implement Google's Material Design  
https://material-ui.com/

**Recharts** - a composable charting library built on React components  
http://recharts.org/en-US

React-PDF - display PDFs in React app  
http://projects.wojtekmaj.pl/react-pdf/

Draft.js - Rich Text Editor framework for React  
https://draftjs.org/

React Google Maps - a set of React components wrapping the underlying Google Maps JavaScript API v3 instances  
https://tomchentw.github.io/react-google-maps/

React Big Calendar - an events calendar component built for React  
http://intljusticemission.github.io/react-big-calendar/examples/index.html

React Color - a collection of Color Pickers from Sketch, Photoshop, Chrome, Github, Twitter, Material Design & more  
http://casesandberg.github.io/react-color/

react-select - a flexible and beautiful Select Input control for ReactJS with multiselect, autocomplete, async and creatable support   
https://react-select.com/

react-mask - input masking component for React  
https://github.com/sanniassin/react-input-mask

react-sortable-hoc - a set of higher-order components to turn any list into an animated, accessible and touch-friendly sortable list  
https://clauderic.github.io/react-sortable-hoc/

react-text-mask - input mask for React, Angular, Ember, Vue, & plain JavaScript   
https://github.com/text-mask/text-mask/tree/master/react/#readme

Lodash - utility library delivering modularity, performance & extras  
https://lodash.com/

Loglevel - minimal lightweight simple logging  
https://github.com/pimterry/loglevel

classnames - a simple javascript utility for conditionally joining classNames together  
https://github.com/JedWatson/classnames

### QA

Jest - testing framework  
https://jestjs.io/en/  
Testing React Apps - https://jestjs.io/docs/en/tutorial-react

Postman - API Development Environment  
https://www.getpostman.com/

Storybook - the UI Development Environment  
https://storybook.js.org/

Cypress - end-to-end testing  
https://www.cypress.io/

### Build

**Create React App** - build CLI tool for React apps  
https://facebook.github.io/create-react-app/

Webpack - code and resource bundler  
https://webpack.js.org/

### Code style

JSDoc - a markup language used to annotate JavaScript source code files  
http://usejsdoc.org/

## Repository

**GitFlow**  
https://datasift.github.io/gitflow/IntroducingGitFlow.html

### Branches
```
/master                       - production (only merges from release or hotfixes)
/hotfix/<hotfixNumber>        - hotfixes for production
/develop                      - current development state
/release/<releaseVersion>     - feature freezed release code branch
/release/<releaseVersion>/<bugfixNumber>  - release bugfixes
/feature/<featureNumber>      - feature brunches
```

**Code style and small fixes (word misspell, etc) commits** can be done inside develop branch (to keep feature branch clean and make merge requests easier) and have to be in separate commits for each independent fixes (variable names, word misspell, file code style fix, etc). Instead of task name use marks like **[code style]** or **[misspell]** at the begging of a commit message and always add a **short description** what did you fix. Before push always check is code still compiled without errors.
