# Children's BBC - Genie Theming

* [What is in and out of scope for theming?](#what-is-in-and-out-of-scope-for-theming)
* [Individual component theme specification](#individual-component-theme-specification)
* [What are the asset requirements?](#what-are-the-asset-requirements)
* [How do I test my theme?](#how-do-i-test-my-theme)
* [What are the applicable Children’s Games Standards that need to be followed?](#what-are-the-applicable-children’s-games-standards-that-need-to-be-followed)
* [How do I get my game onto Children’s platforms?](#how-do-i-get-my-game-onto-children’s-platforms)
* [How do I get my theme onto Children’s platforms?](#how-do-i-get-my-theme-onto-children’s-platforms)
* [What acceptance tests will the BBC carry out?](#what-acceptance-tests-will-the-bbc-carry-out)
* [How can I access support?](#how-can-i-access-support)

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

<pre>https://www.bbc.co.uk/cbeebies/embed/game/{game-id}?versionOverride={jenkins-build-number}&viewNonPublished=true</pre>

You can also replace the **{jenkins-build-number}** with the string `latest` to see the latest build.

## How do I get my theme onto Children’s platforms?


## What acceptance tests will the BBC carry out?


## How can I access support?
