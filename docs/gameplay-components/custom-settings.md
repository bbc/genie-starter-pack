# Configuring Custom Settings

## How do I add custom settings to my game?

The setting config for the game can be found in `src/main.js`.

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
- `key` -> A key value used to identify the setting. 
- `type` -> Determines the format of the setting. For instance, a `toggle` setting can be toggled between `on` and `off`.
- `title` -> The name of the setting, as it will appear in CAGE.
- `description` -> A short description of what the setting does. This will appear under the settings title in CAGE.

## How do I access the value of a setting within the gameplay component?
Import Genie's settings module and then call its `getAllSettings()` function. Under the hood this will retrieve the settings from the GMI.

```javascript
// Import Genie's settings module
import { settings } from "../node_modules/genie/src/core/settings.js";

// Retrieve all the settings - under the hood this will call the GMI
const allSettings = settings.getAllSettings();

// You can then extract the settings values you need by their key
const audioSettingValue = allSettings.audio;

// Values for your custom settings will also be available
const customSettingOneValue = allSettings.custom1;
```

## How do I configure a callback for my setting?

In `src/main.js` add a call to subsribe the settings channel of the signal bus by calling `signal.bus.subscribe(subscription)` where `subscription` is an object with the following properties:
- `channel` -> This should be set to settingsChannel.  <!-- TODO: This shouldn't really be exposed in this case as all settings should use the settings channel  -->
- `name` -> This should correspond to the key of the setting that the callback is being set for.
- `callback` -> A callback function for the setting that will execute whenever the setting is changed by the player.

```javascript
signal.bus.subscribe({
    channel: settingsChannel,
    name: "custom1",
    callback: value => {
        console.log("Custom 1 setting changed to " + value);
    },
});
```