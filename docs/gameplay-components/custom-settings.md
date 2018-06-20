# Configuring Custom Settings

## How do I add custom settings to my game?

The settings config for the game can be found in `src/main.js`.

```javascript
const settingsConfig = {
    pages: [
        {
            title: "Global Settings",
            settings: [
                {
                    key: "audio",
                    type: "toggle",
                    title: "Audio",
                    description: "Turn off/on sound and music",
                },
                {
                    key: "custom1",
                    type: "toggle",
                    title: "Custom 1",
                    description: "Switch custom message",
                },
            ],
        },
    ],
};
```

A new setting can be created by adding an additional object to the `settings` array and giving it the following properties:
- `key`: A key value used to identify the setting.
- `type`: Determines the format of the setting. Only `"toggle"` is supported currently.
- `title`: The name of the setting as it will appear in the settings dialog box.
- `description`: A short description of what the setting does. This will appear under the settings title in the settings dialog box.

## How do I access the value of a setting within the gameplay component?
Import Genie's settings module and then call its `getAllSettings()` function.

Example usage:

```javascript
import { settings } from "../node_modules/genie/src/core/settings.js";

const allSettings = settings.getAllSettings();
// => { audio: true, custom1: false, gameData: {} }

allSettings.audio;
// => true

allSettings.custom1;
// => false
```

## How do I configure a callback for my setting?

In `src/main.js` subscribe to the settings channel by calling `signal.bus.subscribe(subscription)` where `subscription` is an object with the following properties:
- `channel`: This should be set to settingsChannel which is imported at the top of `src/main.js`.
- `name`: This should correspond to the key of the setting that the callback is being set for.
- `callback`: A callback function that will execute whenever the setting is changed from the settings dialog box.

Example usage:

```javascript
signal.bus.subscribe({
    channel: settingsChannel,
    name: "custom1",
    callback: value => {
        console.log("Custom 1 setting changed to " + value);
    },
});
```
