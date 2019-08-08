import { Screen } from "../../node_modules/genie/src/core/screen.js";
import { gmi } from "../../node_modules/genie/src/core/gmi/gmi.js";

const calculateAchievements = remaining => {
    gmi.achievements.set({key: "first_win"});
    if (remaining >= 12) {
        gmi.achievements.set({key: "fast_12"});
    }
    if (remaining >= 10) {
        gmi.achievements.set({key: "fast_10"});
    }
    if (remaining >= 8) {
        gmi.achievements.set({key: "fast_8"});
    }
    if (remaining >= 6) {
        gmi.achievements.set({key: "fast_6"});
    }
    if (remaining >= 4) {
        gmi.achievements.set({key: "fast_4"});
    }
    const gameData = gmi.getAllSettings().gameData;
    if (!gameData.timesCracked) {
        gmi.setGameData("timesCracked", 0);
    }
    let timesCracked = gameData.timesCracked;
    timesCracked = timesCracked + 1;
    gmi.setGameData("timesCracked", timesCracked);
    gmi.achievements.set({key: "many_wins", progress: timesCracked});
    gmi.achievements.set({key: "many_wins_2", progress: timesCracked});
    gmi.achievements.set({key: "many_wins_3", progress: timesCracked});
}

const zeroPad = numberToPad => {
    const zero = 2 - numberToPad.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + numberToPad;
}

const formatTime = secs => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs - minutes * 60;
    return "Time left " + zeroPad(minutes) + ":" + zeroPad(seconds);
}

export class ClickProgressionGame extends Screen {
    constructor() {
        super();
    }

    create() {
        const centerX = this.game.world.centerX;
        const centerY = this.game.world.centerY;
        this.theme = this.context.config.theme[this.game.state.current];
        this.selectedGameButton = this.transientData["character-select"].index + 1;
        this.timesButtonClicked = 0;

        this.addBackground();
        this.createTimer(centerX);
        this.createTitleText(centerX, centerY);

        const level = this.transientData["level-select"];

        const buttonPos = this.theme.gameButton.position;
        const positions = [
            { x: buttonPos.x, y: buttonPos.y - 210 },
            { x: buttonPos.x + 210, y: buttonPos.y - 210 },
            { x: buttonPos.x - 210, y: buttonPos.y -210 },
            { x: buttonPos.x, y: buttonPos.y },
            { x: buttonPos.x + 210, y: buttonPos.y },
            { x: buttonPos.x - 210, y: buttonPos.y },
        ]

        const buttonPositions = positions.slice(0, level.index + 1);

        this.gameButtons = buttonPositions.map(pos => this.createGameButton(pos.x, pos.y))

        this.scene.addLayout(["pause"]);

        gmi.setGameData("characterSelected", this.transientData["character-select"]);
        console.log("Data saved to GMI:", gmi.getAllSettings().gameData); // eslint-disable-line no-console
        gmi.sendStatsEvent("level", "start", { source: level.choice.title });
    }

    render() {
        if (this.timer.running) {
            this.timeLeftText.setText(this.getTimeLeftString());
        }
    }

    gameButtonClicked(button) {
        if ( button.data.timesClicked < 9 ) {
            button.data.timesClicked += 1;
            button.loadTexture("game." + "game_button_" + this.selectedGameButton + "_" + button.data.timesClicked, 0);
        }

        const complete = this.gameButtons.every(button => button.data.timesClicked >= 9 );

        if (complete) {
            const level = this.transientData["level-select"];
            const remaining = this.getTimeLeft();
            gmi.sendStatsEvent("level", "complete", {metadata:`SCO=[${remaining}]~LVR=[WIN]~SRC=[0]`, source: level.choice.title});
            calculateAchievements(remaining);

            this.transientData.results = "Finished with " + remaining + " seconds left!";
            this.navigation.next();
        }
    }

    gameLost() {
        const level = this.transientData["level-select"];
        gmi.sendStatsEvent("level", "complete", {metadata:`SCO=[0]~LVR=[LOSE]~SRC=[0]`, source: level.choice.title});
        this.transientData.results = "You scored 0, game over - You lost!";
        this.navigation.next();
    }

    addBackground() {
        const backgroundImage = this.game.add.image(0, 0, "game.background");
        return this.scene.addToBackground(backgroundImage);
    }

    createTimer() {
        this.timer = this.game.time.create();
        this.timerEvent = this.timer.add(Phaser.Timer.SECOND * 15, this.gameLost, this);
        this.timeLeftText = this.game.add.text(this.theme.timer.position.x, this.theme.timer.position.y, this.getTimeLeftString(), this.theme.timer.style);
        this.scene.addToBackground(this.timeLeftText);
        this.timer.start();
    }

    createTitleText() {
        const text = this.game.add.text(this.theme.text.position.x, this.theme.text.position.y, this.theme.text.content, this.theme.text.style);
        this.scene.addToBackground(text);
    }

    createGameButton(x, y) {
        const buttonImage = "game." + "game_button_" + this.selectedGameButton + "_0";
        const gameButton = this.game.add.button(x, y, buttonImage, this.gameButtonClicked, this, 2, 1, 0)
        gameButton.data.timesClicked = 0


        this.scene.addToBackground(gameButton);
        gameButton.anchor.setTo(this.theme.gameButton.anchor.x, this.theme.gameButton.anchor.y);

        return gameButton
    }



    getTimeLeft() {
        return Math.round((this.timerEvent.delay - this.timer.ms) / 1000);
    }

    getTimeLeftString() {
        return formatTime(this.getTimeLeft());
    }
}
