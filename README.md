# Children's BBC - Genie Starter Pack

* [What is Genie?](#what-is-genie)
* [How do I set up my local dev environment?](#how-do-i-set-up-my-local-dev-environment)
* [Developing a Gameplay Component](./docs/gameplay-component.md)
* [Creating a Theme](./docs/theming.md)
* [Genie Gel (“GELIE”) Documentation](#genie-gel-gelie-documentation)
* [How can I access support?](#how-can-i-access-support)

## What is Genie?

Genie is a modular framework designed to simplify the construction of children's games. It uses [Phaser 2 CE](https://phaser.io/), an HTML5 game engine.

Genie provides a set of reusable components common to BBC games such as a load screen, select screen, pause, how to play, as well as an implementation of the standard BBC Games GEL UI. This means game developers can focus on creating the gameplay component, as much of the logic surrounding the game has been provided.

## How do I set up my local dev environment?

A skeleton set-up has been included in this starter pack. To install, run `npm install` in the command line. This will pull in the Genie framework.

The game sequence can then be configured by editing: `src/main.js`. Require in the desired screens and order them in the `transitions` JSON object. The `nextScreenName` method returns a string to indicate the name of the next screen to transition to. As this is a function, conditional logic can be included here to move to a different screen depending on the game state (e.g. a "win" screen or a "fail" screen).

New screens (including the gameplay component) should be created in the `components` folder.

You can preview your game by bundling it through Webpack and running it in a development server using `npm start`. It can then be viewed in a browser at http://localhost:8080/ or at the local network address printed in the console. Changes to the source will trigger a rebuild and refresh the page on all devices currently viewing the page.

The qaMode query string may be added to the end to view the game in QA Mode. This gives additional console output, and if you press "q", you can see the layout overlay. http://localhost:8000/?qaMode=true.

To build your game using Webpack, use `npm run build`.

`npm run build-watch` runs the compiler and creates a bundle. This means you can view index.html in a browser without having to run a webserver. Changes to the source will trigger a rebuild.

## Genie Gel ("GELIE") Documentation


## How can I access support?

There is additional in-depth documentation in the docs folder of this respository and in the Genie Core repository. For further support contact the BBC Project Manager assigned to your game.
