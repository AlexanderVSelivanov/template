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

Express  
TypeORM  
Winston  
sql.js  

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

react-select

react-mask

react-sortable-hoc

react-text-mask

Lodash - utility library delivering modularity, performance & extras
https://lodash.com/

Loglevel - minimal lightweight simple logging
https://github.com/pimterry/loglevel

classnames


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
/master           - production (only merges from release or hotfixes)
/hotfix/<hotfixNumber>        - hotfixes for production
/develop          - current development state
/release/<releaseVersion>     - feature freezed release code branch
/release/<releaseVersion>/<bugfixNumber>  - release bugfixes
/feature/<featureNumber>      - feature brunches
```

**Code style and small fixes (word misspell, etc) commits** can be done inside develop branch (to keep feature branch clean and make merge requests easier) and have to be in separate commits for each independent fixes (variable names, word misspell, file code style fix, etc). Instead of task name use marks like **[code style]** or **[misspell]** at the begging of a commit message and always add a **short description** what did you fix. Before push always check is code still compiled without errors.
