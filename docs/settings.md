# Settings

BBC platforms provide a centralised settings screen. You won't see the settings panel appear when running the game locally, but it will be there when the game is built on BBC servers.

## Global Settings

The GMI has the concept of Global Settings - these are settings that persist across all BBC games (i.e. if a user disables motion on one game, it remains disabled for all games). Our Global Settings are: **Audio**, **Subtitles** and **Motion**.

Audio and Motion are already configured in Genie by default, so you will be required to implement these in your game.

If you also want to add Subtitles you will need to pass it into the `settingsConfig` in `main.js` like so:

```javascript
const settingsConfig = {
    pages: [
        {
            title: "Global Settings",
            settings: [
                {
                    key: "subtitles",
                    type: "toggle",
                    title: "Subtitles",
                    description: "Turn off/on subtitles",
                },
            ],
        },
    ],
};
```

Please note that the `title` on this object must be `"Global Settings"` for it to be recognised.

## Custom Settings

Custom settings can be added by adding them to the `settingsConfig` in `main.js`. For example, this adds a colourblind mode setting:

```javascript
const settingsConfig = {
    pages: [
        {
            title: "Custom Settings",
            settings: [
                {
                    key: "colourblind",
                    type: "toggle",
                    title: "Colourblind mode",
                    description: "Turn off/on colour palette with increased contrast",
                },
            ],
        },
    ],
};
```

More than one page of custom settings may be given, and they can all be given titles of your choosing.


### Setting Changed Callback

To add a callback when a setting is changed, you can use the [signal bus subscription](./signal-bus.md#subscription-example) like so:

```javascript

signal.bus.subscribe({
    channel: "genie-settings",
    name: "setting-changed-colourblind", //suffix is the key given in settingsConfig object above
    callback: (data) => {
        if (data === true) {
            // handle colourblind mode on
        } else {
            // handle colourblind mode off
        }
    },
});

```

The signal `name` will always be `setting-changed-` followed by the name of your event. You can also add callbacks to the global settings by subscribing to the appropriate signal (e.g. `setting-changed-audio` or `setting-changed-motion`).

### Settings Closed Callback

To add a callback when the setting panel is closed, you can use subscribe to the `settings-closed` event:

```javascript

signal.bus.subscribe({
    channel: "genie-settings",
    name: "settings-closed",
    callback: () => {
        //do something when the settings is closed
    },
});

```
