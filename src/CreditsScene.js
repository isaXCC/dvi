import PARAMETERS from "./parameters";

export default class CreditsScene extends Phaser.Scene {
    constructor() { 
        super('credits_scene'); 
    }

    create() {
        // credit content
        const creditsText = `
CREDITS
————————————
Programming   ·  Bla
Art           ·  Bla
Music         ·  Bla

Special Thanks
————————
Our beta testers

© 2025 Phat Boi Games
        `;

        // multiline text
        const textObject = this.add.text(PARAMETERS.GAME.WIDTH/2, PARAMETERS.GAME.HEIGHT, creditsText.trim(), {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            align: 'center',
            lineSpacing: 10,
        }).setOrigin(0.5, 0);

        // scroll velocity
        this.tweens.add({
            targets: textObject,
            y: -textObject.height,
            ease: 'Linear',
            duration: 20000
        });

        this.time.delayedCall(10000, () => this.endCredits());
    }

    endCredits() {
        this.sound.stopAll();
        this.scene.start('start_menu'); // return to start screen
    }
}