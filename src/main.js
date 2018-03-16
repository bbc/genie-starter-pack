import { Home } from "../node_modules/genie/src/components/home.js";
import { Loadscreen } from "../node_modules/genie/src/components/loadscreen.js";
import { GameTest } from "../node_modules/genie/src/components/test-harness/test-screens/game.js";
import { ResultsTest } from "../node_modules/genie/src/components/test-harness/test-screens/results.js";
import { startup } from "../node_modules/genie/src/core/startup.js";

const transitions = [
    {
        name: "loadscreen",
        state: new Loadscreen(),
        nextScreenName: () => "home",
    },
    {
        name: "home",
        state: new Home(),
        nextScreenName: () => "game",
    },
    {
        name: "game",
        state: new GameTest(),
        nextScreenName: () => "results",
    },
    {
        name: "results",
        state: new ResultsTest(),
        nextScreenName: () => "home",
    },
];

startup(transitions);
