import Room from '../room.js'

export default class DP_0_TUTORIAL extends Phaser.Scene {

    constructor() {
        super('dp_0_tutorial');
    }

    create() {
        // The game stops
        this.scene.pause('dp_0');

        // 'Tutorial' text is shown
        this.introText = this.add.text(340, 300, "There was no time for a tutorial, so read this!!"
            + "\nOr skip it, it's your choice... (please don't)"
            + "\nW, A, S, D -> Explore the world!"
            + "\nLeft Click -> Throw hairballs :S"
            + "\nR -> Lick your own hair XD"
            + "\nSpace -> FASTER FASTER"
            + "\nQ -> MUUUCHHH FASTERRR (may not work)"
            + "\nE -> Just if you are sooo curious"
            + "\nPress 'P' to continue. If not, thanks for playing! (press it)", {
            fontSize: '22px',
            fill: '#fff',
            fontFamily: 'Arial',
            lineSpacing: 21
        }).setOrigin(0.5);
    
        // If a key is pressed, the game starts
        this.input.keyboard.once('keydown-P', () => {
            this.startGame();
        });
    }

    startGame() {
        // Deletes the text
        this.introText.destroy();

        // Resumes game
        this.scene.resume('dp_0');

        // Deletes this scene
        this.scene.stop();
    }

}