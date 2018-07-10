# Select Screen

* [How do I add a select screen to the game?](#how-do-i-add-a-select-screen-to-the-game)
* [How do I add items to the select screen carousel?](#how-do-i-add-items-to-the-select-screen-carousel)
* [How does it find the location of my sprite assets?](#how-does-it-find-the-location-of-my-sprite-assets)

## How do I add a select screen to the game?
- In `src/main.js` import the Select screen:

```javascript
import { Select } from "../node_modules/genie/src/components/select.js";
```

- Then, in `src/main.js` add the select screen to the `transitions array`.

```javascript
const transitions = [
    ...
    {
        name: "home",
        state: new Home(),
        nextScreenName: () => "characterSelect",
    },
    {
        name: "characterSelect",
        state: new Select(),
        nextScreenName: () => "game",
    },
    ...
];
```

- When running the game, progressing from the home screen should now take the player to the character select screen.

## How do I add items to the select screen carousel?
- Locate the file `config.json` located inside `themes/your-theme/` (where `your-theme` is the name of your theme).
- Add a `"choices"` array to your select options and fill it with objects containing the keys `main` and `name`. These must be named the same as the key in your `asset-pack-master.json` file (see [below](#how-does-it-find-the-location-of-my-sprite-assets)).
    - `main`: This refers to the image of the thing the player is selecting. For example in a character select screen, this will be the character itself.
    - `name`: This refers to the image of the name of the thing the player is selecting. For example in a character select screen, it will simply be an image of the character's name.

```json
{
    "theme": {
        "characterSelect": {
            "choices": [
                {
                    "main": "dangermouse",
                    "name": "dangermouseName"
                },
                {
                    "main": "barney",
                    "name": "barneyName"
                }
            ]
        }
    }
}
```

## How does it find the location of my sprite assets?

- Locate the file `asset-pack-master.json` located inside `themes/your-theme/` (where `your-theme` is the name of your theme).
- Add your sprite locations and preferred key names to this file.

```json
{
    ...
    "characterSelect": [
        {
            "type": "image",
            "key": "dangermouse",
            "url": "options/dangermouse_sel.png"
        },
        {
            "type": "image",
            "key": "dangermouseName",
            "url": "options/dangermouse_sel_name.png"
        },
        {
            "type": "image",
            "key": "barney",
            "url": "options/barney_sel.png"
        },
        {
            "type": "image",
            "key": "barneyName",
            "url": "options/barney_sel_name.png"
        }
    ]
    ...
}
```

[More examples of asset packs in Phaser](https://github.com/photonstorm/phaser-examples/blob/master/examples/assets/asset-pack1.json)
