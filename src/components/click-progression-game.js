import { Screen } from "../../node_modules/genie/src/core/screen.js";

export class ClickProgressionGame extends Screen {
    constructor() {
        super();
    }

    preload() {
        this.keyLookup = this.layoutFactory.keyLookups[this.game.state.current];
    }

    create() {
        const centerX = this.game.world.centerX;
        const centerY = this.game.world.centerY;
        this.theme = this.context.config.theme[this.game.state.current];
        this.selectedGameButton = this.context.inState.transient["game-button-select"];
        this.timesButtonClicked = 0;

        this.addBackground();
        this.createTimer(centerX);
        this.createTitleText(centerX, centerY);
        this.createGameButton(centerX, centerY);

        this.layoutFactory.addLayout(["home", "pause", "audioOff", "settings"]);

    }

    render() {
        if (this.timer.running) {
            this.timeLeftText.setText(this.getTimeLeftString());
        }
    }

    gameLost() {
        this.next({ transient: { resultsData: "Game over - You lost!" } });
    }

    addBackground() {
        const backgroundImage = this.game.add.image(0, 0, this.keyLookup.background);
        return this.layoutFactory.addToBackground(backgroundImage);
    }

    createTimer() {
        this.timer = this.game.time.create();
        this.timerEvent = this.timer.add(Phaser.Timer.SECOND * 15, this.gameLost, this);
        this.timeLeftText = this.game.add.text(this.theme.timer.position.x, this.theme.timer.position.y, this.getTimeLeftString(), this.theme.timer.style);
        this.layoutFactory.addToBackground(this.timeLeftText);
        this.timer.start();
    }

    createTitleText() {
        const text = this.game.add.text(this.theme.text.position.x, this.theme.text.position.y, this.theme.text.content, this.theme.text.style);
        this.layoutFactory.addToBackground(text);
    }

    createGameButton() {
        const buttonPos = this.theme.gameButton.position;
        const buttonImage = this.keyLookup["game_button_" + this.selectedGameButton +"_0"];
        this.gameButton = this.game.add.button(buttonPos.x, buttonPos.y, buttonImage, this.gameButtonClicked, this, 2, 1, 0);
        this.layoutFactory.addToBackground(this.gameButton);
        this.gameButton.anchor.setTo(this.theme.gameButton.anchor.x, this.theme.gameButton.anchor.y);
    }

    gameButtonClicked() {
        this.timesButtonClicked += 1;
        if (this.timesButtonClicked === 10) {
            this.next({ transient: { resultsData: "Finished with " + this.getTimeLeft() + " seconds left!" } });
        } else {
            this.gameButton.loadTexture(this.keyLookup["game_button_" + this.selectedGameButton +"_" + this.timesButtonClicked], 0);
        }
    }

    getTimeLeft() {
        return Math.round((this.timerEvent.delay - this.timer.ms) / 1000);
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
