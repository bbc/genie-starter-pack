import { Screen } from "../../node_modules/genie/src/core/screen.js";
import { gmi } from "../../node_modules/genie/src/core/gmi/gmi.js";


export class ClickProgressionGame extends Screen {
    constructor() {
        super();
    }

    create() {
        const centerX = this.game.world.centerX;
        const centerY = this.game.world.centerY;
        this.theme = this.context.config.theme[this.game.state.current];
        this.selectedGameButton = this.transientData.characterSelected;
        this.timesButtonClicked = 0;

        this.addBackground();
        this.createTimer(centerX);
        this.createTitleText(centerX, centerY);
        this.createGameButton(centerX, centerY);

        this.scene.addLayout(["pause"]);

        gmi.setGameData("characterSelected", this.transientData.characterSelected);
        //console.log("Data saved to GMI:", gmi.getAllSettings().gameData); // eslint-disable-line no-console
        gmi.sendStatsEvent("level", "start", {metadata:`SRC=[0]`});
    }

    render() {
        if (this.timer.running) {
            this.timeLeftText.setText(this.getTimeLeftString());
        }
    }

    gameLost() {
        gmi.sendStatsEvent("level", "complete", {metadata:`SCO=[0]~LVR=[LOSE]~SRC=[0]`});
        this.navigation.next({
            results: "You scored 0, game over - You lost!",
            characterSelected: this.transientData.characterSelected,
        });
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

    createGameButton() {
        const buttonPos = this.theme.gameButton.position;
        const buttonImage = "game." + "game_button_" + this.selectedGameButton + "_0";
        this.gameButton = this.game.add.button(buttonPos.x, buttonPos.y, buttonImage, this.gameButtonClicked, this, 2, 1, 0);
        this.scene.addToBackground(this.gameButton);
        this.gameButton.anchor.setTo(this.theme.gameButton.anchor.x, this.theme.gameButton.anchor.y);
    }

    gameButtonClicked() {
        this.timesButtonClicked += 1;
        if (this.timesButtonClicked === 10) {
            const remaining = this.getTimeLeft();
            gmi.sendStatsEvent("level", "complete", {metadata:`SCO=[${remaining}]~LVR=[WIN]~SRC=[0]`});
            this.calculateAchievements(remaining);
            this.navigation.next({
                results: "Finished with " + remaining + " seconds left!",
                characterSelected: this.transientData.characterSelected,
            });
        } else {
            this.gameButton.loadTexture("game." + "game_button_" + this.selectedGameButton + "_" + this.timesButtonClicked, 0);
        }
    }

    getTimeLeft() {
        return Math.round((this.timerEvent.delay - this.timer.ms) / 1000);
    }

    calculateAchievements(remaining) {
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
        var gameData = gmi.getAllSettings().gameData;
        if (!gameData.timesCracked) {
            gmi.setGameData("timesCracked", 0);
        }
        var timesCracked = gameData.timesCracked;
        timesCracked = timesCracked + 1;
        gmi.setGameData("timesCracked", timesCracked);
        gmi.achievements.set({key: "many_wins", progress: timesCracked}); 
    }

    getTimeLeftString() {
        return this.formatTime(this.getTimeLeft());
    }

    formatTime(secs) {
        const minutes = 0 + Math.floor(secs / 60);
        const seconds = 0 + (secs - minutes * 60);
        return "Time left " + this.zeroPad(minutes) + ":" + this.zeroPad(seconds);
    }

    zeroPad(numberToPad) {
        const zero = 2 - numberToPad.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + numberToPad;
    }
}
