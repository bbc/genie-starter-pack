# Children's BBC - Genie Theming

* [What is in and out of scope for theming?](#what-is-in-and-out-of-scope-for-theming)
* [Individual component theme specification](#individual-component-theme-specification)
* [What are the asset requirements?](#what-are-the-asset-requirements)
* [How do I test my theme?](#how-do-i-test-my-theme)
* [What are the applicable Children’s Games Standards that need to be followed?](#what-are-the-applicable-children’s-games-standards-that-need-to-be-followed)
* [How do I get my game onto Children’s platforms?](#how-do-i-get-my-game-onto-children’s-platforms)
* [How do I get my theme onto Children’s platforms?](#how-do-i-get-my-theme-onto-children’s-platforms)
* [What acceptance tests will the BBC carry out?](#what-acceptance-tests-will-the-bbc-carry-out)

## What is a theme?

A theme is a set of assets that give a Genie component a certain look and feel, and can be swapped out to 'reskin' the components. For example, a 'Danger Mouse' or a 'Worst Witch' theme could be applied to the same game to change the branding.
 
## What is in and out of scope for theming?

Audio, Animations, Sprites, Graphics and Fonts are in scope for theming. Alterations to the code other than configuration changes in JSON files to support new assets are currently out of scope.

## How does theming work?

At this stage, theming is currently undertaken mostly by performing a straight swap on assets, replacing images / audio / sprites like for like in order to create the desired theme. Additional configuration of screens and assets is done by modifying JSON files. There will be a 'default' theme for components that can be used as a template.

## How do I test my theme?

To quickly view a specific theme, you can launch it using the querystring 'theme': http://localhost:8080/?theme=themeName, replacing themeName with the name of your theme.

## Individual component theme specification

This will vary for each gameplay component.

## What are the asset requirements?

This will also vary for each gameplay component.

## How do I get my theme onto Children’s platforms?

Check out the component repo and add your theme in a directory, basing the theme's structure on the existing default theme. Push to the remote repository and the BBC team will create an entry on our iSite CMS which will allow the theme to be viewed on a BBC url hosted in our CAGE platform.