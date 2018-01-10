# Simple message broker library


## Development notes & methodology
Check the draw.io file simple-broker.xml


## Prerequisites
- Install node latest (>=8.9.4) version (via [node.js](https://nodejs.org/) or [nvm](https://github.com/creationix/nvm))
- The following dependencies must be installed:
   - jest: testing tool
   - jsdoc: documentation generation
   - envalid: configuration management tool
   - winston: logger
- To install dependencies, simply run `npm install` or `yarn` in the project root directory.


## Project structure
- config: project and components configuration. Based upon environment variables defined (define variable in the .env file or set them before executing node)
- doc: jsdoc generated documentation
- src: source code & test files
- vendor: external libraries
- index.js: application main file

## Running tests
```sh
npm run test
```


## Generating documentation
```sh
npm run docs
```


## Usage
Modify the `index.js` file to use the library.


## API
Check the generated doc in `doc/` folder.


### eventBus.on(action, handler)
This method register a new callback to the defined action.
- Each call to this function adds a new callback to the stack.
- There is currently no methods for resetting the callabck stack associated with an action.


### eventBus.emit(...actions, ...params)
This method trigger the callbacks associated with the actions passed as parameters.
- Actions and params value are mixed
- All actions must be defined before passing the parameters
- Every handler triggered will get the full list of params

