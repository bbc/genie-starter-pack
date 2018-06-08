import { Home } from "../node_modules/genie/src/components/home.js";
import { Loadscreen } from "../node_modules/genie/src/components/loadscreen.js";
import { Select } from "../node_modules/genie/src/components/select.js";
import { ClickProgressionGame } from "./components/click-progression-game.js";
import { Results } from "../node_modules/genie/src/components/results.js";
import { startup } from "../node_modules/genie/src/core/startup.js";
import { settingsChannel } from "../node_modules/genie/src/core/settings.js";
import * as signal from "../node_modules/genie/src/core/signal-bus.js";

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

signal.bus.subscribe({
    channel: settingsChannel,
    name: "custom1",
    callback: value => {
        console.log("Custom 1 setting changed to " + value);
    },
});

const navigationConfig = goToScreen => {
    const goToHome = data => goToScreen("home", data);
    const goToCharacterSelect = data => goToScreen("characterSelect", data);
    const goToGame = data => goToScreen("game", data);
    const goToResults = data => goToScreen("results", data);

    return {
        loadscreen: {
            state: Loadscreen,
            routes: {
                next: goToHome,
            },
        },
        home: {
            state: Home,
            routes: {
                next: goToCharacterSelect,
            },
        },
        characterSelect: {
            state: Select,
            routes: {
                next: goToGame,
                home: goToHome,
                restart: goToHome,
            },
        },
        game: {
            state: ClickProgressionGame,
            routes: {
                next: goToResults,
                home: goToHome,
                restart: goToGame,
            },
        },
        results: {
            state: Results,
            routes: {
                next: goToHome,
                game: goToGame,
                restart: goToGame,
                home: goToHome,
            },
        },
    };
};

startup(settingsConfig, navigationConfig);
