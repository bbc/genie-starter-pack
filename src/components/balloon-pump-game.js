import { Screen } from "../../node_modules/genie/src/core/screen.js";

export class BalloonPumpGame extends Screen {
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

        this.addBackground();
        this.createTimer(centerX);
        this.createGameFurniture(centerX, centerY);
        this.createBalloon(centerX, centerY);

        this.layoutFactory.addLayout(["home", "pause", "audioOff", "settings"]);
    }

    render() {
        if (this.timer.running) {
            this.timeLeftText.setText(this.getTimeLeftString());
        }
    }

    update() {
        if (this.balloonButton.width >= 240) {
            this.next({ transient: { resultsData: "Finished with " + this.getTimeLeft() + " seconds left!" } });
        } else if (this.balloonButton.width > 74 && this.balloonButton.height > 122) {
            this.balloonButton.width -= 1;
            this.balloonButton.height -= 1;
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
        this.timeLeftText = this.game.add.text(-340, 230, this.getTimeLeftString(), this.theme.timer.style);
        this.layoutFactory.addToBackground(this.timeLeftText);
        this.timer.start();
    }

    createGameFurniture() {
        const pumpSprite = this.game.add.sprite(-70, 190, this.keyLookup.pump);
        this.layoutFactory.addToBackground(pumpSprite);

        const text = this.game.add.text(0, -170, this.theme.text.content, this.theme.text.style);
        this.layoutFactory.addToBackground(text);
    }

    createBalloon() {
        this.balloonButton = this.game.add.button(-10, 110, this.keyLookup.balloon, this.balloonTapped, this, 2, 1, 0);
        this.balloonButton.width = 74;
        this.balloonButton.height = 122;
        this.layoutFactory.addToBackground(this.balloonButton);
        this.balloonButton.anchor.setTo(0.5, 1);
    }

    balloonTapped() {
        this.balloonButton.width += 20;
        this.balloonButton.height += 20;
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
