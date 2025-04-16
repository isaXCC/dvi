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
        const button = this._scene.add.sprite(992, 32, 'fullscreen')
        .setInteractive({ useHandCursor: true }).setScrollFactor(0).setFrame(0);        
        
        // button on click event
        button.on('pointerdown', () => {
            if (!this._scene.scale.isFullscreen) {
                this._scene.scale.startFullscreen();
                button.setFrame(1);

                // game size is adjusted
                this.setGameSizeFullscreen();
            } else {
                this._scene.scale.stopFullscreen();
                button.setFrame(0);

                // game size is readjusted to original
                this.resetGameSize();
            }
        });
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
            juegoDiv.style.height = PARAMETERS.GAME.HEIGHT + 'px';  // original size
        }
    }
}