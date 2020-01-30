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

    create() {
        this.theme = this.context.config.theme[this.scene.key];

        this.addBackground();
        this.createTimer();
        const gameText = this.add.text(this.theme.text.position.x, this.theme.text.position.y, this.theme.text.content, this.theme.text.style);
        gameText.setOrigin(0.5);

        const character = this.transientData["character-select"];
        const level = this.transientData["level-select"];
        this.selectedGameButton = level.choice.title.match(/(\d+)/)[0];
        this.selectedGameCharacter = character.choice.title.match(/(\d+)/)[0];
        
        const buttonPos = this.theme.gameButton.position;
        const positions = [
            { x: buttonPos.x, y: buttonPos.y - 280 },
            { x: buttonPos.x + 210, y: buttonPos.y - 280 },
            { x: buttonPos.x - 210, y: buttonPos.y - 280 },
            { x: buttonPos.x, y: buttonPos.y - 140 },
            { x: buttonPos.x + 210, y: buttonPos.y - 140 },
            { x: buttonPos.x - 210, y: buttonPos.y - 140 },
        ]

        let buttonPosition = 0;
        buttonPosition = level.choice.title.match(/(\d+)/)[0];
        const buttonPositions = positions.slice(0, buttonPosition);

        this.gameButtons = buttonPositions.map(pos => this.createGameButton(pos.x, pos.y))

        this.setLayout(["pause"]);

        gmi.setGameData("characterSelected", this.transientData["character-select"]);
        console.log("Data saved to GMI:", gmi.getAllSettings().gameData); // eslint-disable-line no-console
        gmi.sendStatsEvent("level", "start", { source: level.choice.title });
    }

    update() {
        this.timeLeftText.setText(this.getTimeLeftString());
    }

    gameButtonClicked(button) {
        if ( button.getData("timesClicked") < 9 ) {
            button.data.values.timesClicked += 1;
            button.setTexture("game." + "game_button_" + this.selectedGameCharacter + "_" + button.getData("timesClicked"));
            this.input.setHitArea(button);
        }

        const complete = this.gameButtons.every(button => button.getData("timesClicked") >= 9 );

        if (complete) {
            const level = this.transientData["level-select"];
            const remaining = this.getTimeLeft();
            const numberOfEggs = level.choice.title.match(/(\d+)/)[0];
            gmi.sendStatsEvent("level", "complete", {metadata:`SCO=[${remaining}]~LVR=[WIN]~SRC=[0]`, source: level.choice.title});
            calculateAchievements(remaining);
            this.transientData.results = { remaining, numberOfEggs };
            this.navigation.next();
        }
    }

    gameLost() {
        const level = this.transientData["level-select"];
        const remaining = 0;
        gmi.sendStatsEvent("level", "complete", {metadata:`SCO=[0]~LVR=[LOSE]~SRC=[0]`, source: level.choice.title});
        this.transientData.results = { remaining, numberOfEggs };
        this.navigation.next();
    }

    addBackground() {
        return this.add.image(0, 0, "game.background");
    }

    createTimer() {
        this.timerEvent = this.scene.scene.time.addEvent({delay: 15000, callback: this.gameLost, callbackScope: this });
        const timerText = this.timeLeftText = this.add.text(this.theme.timer.position.x, this.theme.timer.position.y, this.getTimeLeftString(), this.theme.timer.style);
        timerText.setOrigin(0.5);   
    }


    createGameButton(x, y) {
        const buttonImage = "game." + "game_button_" + this.selectedGameCharacter + "_0";
        console.log("buttonImage", buttonImage);
        const gameButton = this.add.image(x, y, buttonImage);
        gameButton.setInteractive().on("pointerdown", () => this.gameButtonClicked(gameButton));
        gameButton.setData("timesClicked", 0);
        gameButton.setOrigin(0.5);

        return gameButton
    }



    getTimeLeft() {
        return Math.round((this.timerEvent.delay - this.timerEvent.elapsed) / 1000);
    }

    getTimeLeftString() {
        return formatTime(this.getTimeLeft());
    }
}
