import Player from "../player/player";

export default class Block extends Phaser.Physics.Arcade.Sprite {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */

    constructor(scene, x, y, sprite = 'block') {
        super(scene, x, y, sprite);

        this._isAlive = true;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();
        this.body.setImmovable();
        this.body.pushable = false;

        this.setOrigin(0.5);
    }
    
    update(){
        this.rotation += 0.01;
    }
}