# Children's BBC - Genie Gameplay Component

* [How is Genie structured?](#how-is-genie-structured)
* [How do I use the core engines?](#how-do-i-use-the-core-engines)
* [What coding and test standards do I need to apply?](#what-coding-and-test-standards-do-i-need-to-apply)
* [How does my component plug into Genie?](#how-does-my-component-plug-into-genie)
* [How do I test my component in the Genie framework?](#how-do-i-test-my-component-in-the-genie-framework)
* [Are there any areas of existing Children’s game delivery standards I need to apply?](#are-there-any-areas-of-existing-children’s-game-delivery-standards-i-need-to-apply)
* [How do I get my build onto Children’s platforms?](#how-do-i-get-my-build-onto-children’s-platforms)
* [What acceptance tests will the BBC carry out?](#what-acceptance-tests-will-the-bbc-carry-out)
* [What documentation do I need to supply?](#what-documentation-do-i-need-to-supply)

## How is Genie structured?


## How do I use the core engines?


## What coding and test standards do I need to apply?


## How does my component plug into Genie?


## How do I test my component in the Genie framework?


## Are there any areas of existing Children’s game delivery standards I need to apply?


## How do I get my build onto Children’s platforms?
Every time a commit is made to the repository, our Jenkins job will build the game to our Children's Game Embed (CAGE) page. You will get email notifications with status reports on success/failure of any automated builds. In the event of a failure you should get an error report with debug information.

The CAGE URL will be in the following format (replace the parts in curly braces with your game information):

<pre>https://www.bbc.co.uk/cbeebies/embed/game/{game-id}?versionOverride={jenkins-build-number}&viewNonPublished=true</pre>

You can also replace the **{jenkins-build-number}** with the string `latest` to see the latest build.

## What acceptance tests will the BBC carry out?


## What documentation do I need to supply?
