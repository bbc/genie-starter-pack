import { Home } from "../node_modules/genie/src/components/home.js";
import { Select } from "../node_modules/genie/src/components/select/select-screen.js";
import { HowToPlay } from "../node_modules/genie/src/components/how-to-play.js";
import { Pause } from "../node_modules/genie/src/components/overlays/pause.js";
import { Game } from "../node_modules/genie/src/components/game.js"; // Change this to "./components/game.js" to point at the placeholder game file.
import { Results } from "../node_modules/genie/src/components/results/results-screen.js";
import { startup } from "../node_modules/genie/src/core/startup.js";
import { settingsChannel } from "../node_modules/genie/src/core/settings.js";
import { eventBus } from "../node_modules/genie/src/core/event-bus.js";
import "../node_modules/genie/lib/SpinePlugin.js"; //CAN BE REMOVED IF NOT USING SPINE

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
        console.log("Custom 1 setting changed to " + value);
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
        scene: Game,
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
            continue: "level-select",
            restart: "game",
            home: "home",
        },
    },
    // Overlays
    "how-to-play": {
        scene: HowToPlay,
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
