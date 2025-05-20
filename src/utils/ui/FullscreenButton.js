import PARAMETERS from "../../parameters";

export default class FullscreenButton extends Phaser.GameObjects.Sprite{
    
    /**
    * FullscreenButton constructor
    * @param {Phaser.Scene} scene HUD scene
    */

    constructor(scene) {
        super(scene);

        this._scene = scene;

        // the button is added
        this.button = this._scene.add.sprite(PARAMETERS.UI.FULLSCREEN_BUTTON.X, PARAMETERS.UI.FULLSCREEN_BUTTON.Y, 'fullscreen')
        .setInteractive({ useHandCursor: true }).setScrollFactor(0).setFrame(0);        
        
        // button on click event
        this.button.on('pointerdown', () => {
            if (!this._scene.scale.isFullscreen) {
                this._scene.scale.startFullscreen();
                this.button.setFrame(1);

                // game size is adjusted
                this.setGameSizeFullscreen();
            } else {
                this._scene.scale.stopFullscreen();
                this.button.setFrame(0);

                // game size is readjusted to original
                this.resetGameSize();
            }
        });
        
        // listener in case player presses ESC to exit fullscreen
        this._scene.scale.on('leavefullscreen', () => {
            this._scene.time.delayedCall(1, () => {
                this.resetGameSize();
                this.button.setFrame(0);
            })
        })

        // the scene gets a reference
        this._scene.fullscreen_button = this.button;
    }

    // adjusts game size to fullscreen
    setGameSizeFullscreen() {
        const juegoDiv = document.getElementById('game');
        if (juegoDiv) {
            juegoDiv.style.width = '100vw';  // fills screen width
            juegoDiv.style.height = '100vh'; // fills screen height
        }
    }

    // readjusts game size to return from fullscreen
    resetGameSize() {
        const juegoDiv = document.getElementById('game');
        if (juegoDiv) {
            juegoDiv.style.width = PARAMETERS.GAME.WIDTH + 'px';    // original size
            juegoDiv.style.height = PARAMETERS.GAME.HEIGHT-16 + 'px';  // original size
        }
    }
}