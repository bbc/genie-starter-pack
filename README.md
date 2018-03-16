# Children's BBC - Genie Starter Pack

* [What is Genie?](#what-is-genie)
* [How do I set up my local dev environment?](#how-do-i-set-up-my-local-dev-environment)
* [What is in and out of scope for theming?](#what-is-in-and-out-of-scope-for-theming)
* [Individual component theme specification](#individual-component-theme-specification)
* [What are the asset requirements?](#what-are-the-asset-requirements)
* [How do I test my theme?](#how-do-i-test-my-theme)
* [What are the applicable Children’s Games Standards that need to be followed?](#what-are-the-applicable-children’s-games-standards-that-need-to-be-followed)
* [How do I get my game onto Children’s platforms?](#how-do-I-get-my-game-onto-children’s-platforms)
* [How do I get my theme onto Children’s platforms?](#how-do-I-get-my-theme-onto-children’s-platforms)
* [What acceptance tests will the BBC carry out?](#what-acceptance-tests-will-the-bbc-carry-out)
* [How can I access support?](#how-can-i-access-support)
* [Genie Gel (“GELIE”) Documentation](#genie-gel-gelie-documentation)

## What is Genie?

Genie is a modular framework to simplify the construction of children's games. It uses [Phaser](https://phaser.io/), a HTML5 game engine. 

Genie provides a set of reusable components common to BBC games such as a load screen, select screen, pause, how to play, GEL, etc. This means game developers can focus on creating the gameplay component, as much of the logic surrounding the game has been provided.

## How do I set up my local dev environment?

A skeleton set-up has been included in this starter pack. To install, run `npm install` in the command line. This will pull in the Genie framework.

The game sequence can then be configured by editing: `src/main.js`. Require in the desired screens and order them in the `transitions` JSON object. The `nextScreenName` method returns a string to indicate the name of the next screen to transition to. As this is a function, conditional logic can be included here to move to a different screen depending on the game state (e.g. a "win" screen or a "fail" screen).

New screens (including the gameplay component) should be created in the `components` folder.

You can view your game by running a simple HTTP server using Python: `python -m SimpleHTTPServer 8000`, and viewing it in a browser: http://localhost:8000/

The qaMode query string may be added to the end to view the game in QA Mode. This gives additional console output, and if you press "q", you can see the layout overlay. http://localhost:8000/?qaMode=true

## What is in and out of scope for theming?


## Individual component theme specification

This will vary for each gameplay component.

## What are the asset requirements?

This will also vary for each gameplay component.

## How do I test my theme?

## What are the applicable Children’s Games Standards that need to be followed?

## How do I get my game onto Children’s platforms?

Every time a commit is made to the repository, our Jenkins job will build the game to our Children's Game Embed (CAGE) page. You will get email notifications with status reports on success/failure of any automated builds. In the event of a failure you should get an error report with debug information.

The CAGE URL will be in the following format (replace the parts in curly braces with your game information):

https://www.bbc.co.uk/cbeebies/embed/game/{game-id}?versionOverride={jenkins-build-number}&viewNonPublished=true

## How do I get my theme onto Children’s platforms?

## What acceptance tests will the BBC carry out?

## How can I access support?

## Genie Gel ("GELIE") Documentation

