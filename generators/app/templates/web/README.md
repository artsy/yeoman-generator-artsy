 <%= name %> 

## Meta

* __State:__ development
* __Demo:__ https://artsy.github.io/<%= name %>
* __CI:__ [![CircleCI](https://circleci.com/gh/artsy/<%= name %>.svg?style=shield)](https://circleci.com/gh/artsy/<%= name %>)
* __Point People:__ 

## Installation

```
$ git clone --recursive https://github.com/artsy/<%= name %>.git
$ cd <%= name %>
$ npm install -g yarn
$ yarn install
```

## Instructions

* Development of components happen in [storybooks](https://getstorybook.io):

        $ yarn storybook
        $ open http://localhost:9001/

* Run the tests:

        $ yarn test

* Run the tests continuously (or use `vscode-jest`):

        $ yarn test -- --watch

* After updating components, be sure to deploy a new demo (sharing is caring!):

        $ yarn deploy-storybook

* After updating a Relay query fragment, be sure to update the typings for it:

        $ yarn relay2ts

* When using new changes in metaphysics’ schema, be sure to update the local schema copy:

        $ yarn sync-schema
