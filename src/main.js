import { Home } from "../node_modules/genie/src/components/home.js";
import { Select } from "../node_modules/genie/src/components/select.js";
import { Pause } from "../node_modules/genie/src/components/overlays/pause.js";
import { ClickProgressionGame } from "./components/click-progression-game.js";
import { Results } from "../node_modules/genie/src/components/results/results-screen.js";
import { eventBus } from "../node_modules/genie/src/core/event-bus.js";
import { startup } from "../node_modules/genie/src/core/startup.js";
import { settingsChannel } from "../node_modules/genie/src/core/settings.js";
import * as event from "../node_modules/genie/src/core/event-bus.js";

const settingsConfig = {
    pages: [
        {
            title: "Custom Settings",
            settings: [
                {
                    key: "custom1",
                    type: "toggle",
                    title: "Custom setting",
                    description: "Description of custom setting",
                },
            ],
        },
    ],
};

eventBus.subscribe({
    channel: settingsChannel,
    name: "custom1",
    callback: value => {
        console.log("Custom 1 setting changed to " + value); // eslint-disable-line no-console
    },
});

const screenConfig = {
    home: {
        scene: Home,
        routes: {
            next: "character-select",
        },
    },
    "character-select": {
        scene: Select,
        routes: {
            next: "level-select",
            home: "home",
        },
    },
    "level-select": {
        scene: Select,
        routes: {
            next: "game",
            home: "home",
        },
    },
    game: {
        scene: ClickProgressionGame,
        settings: {
            physics: {
                default: "arcade",
                arcade: {},
            },
        },
        routes: {
            next: "results",
            home: "home",
            restart: "game",
        },
    },
    results: {
        scene: Results,
        routes: {
            next: "home",
            game: "game",
            restart: "game",
            home: "home",
        },
    },
    // Overlays
    "how-to-play": {
        scene: Select,
        routes: {
            home: "home",
        },
    },
    pause: {
        scene: Pause,
        routes: {
            home: "home",
        },
    },
};

startup(screenConfig, settingsConfig);
