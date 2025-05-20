import Player from "../player/player";

export default class Portal extends Phaser.Physics.Arcade.Sprite {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */

    constructor(scene, x, y, nextRoom) {
        super(scene, x, y, 'portal');
        this._nextRoom = nextRoom;
        this.isActivated = false;
        this.isBlocked = false;
        this._x = x;
        this._y = y;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();
    }

    update(){

    }

    transitionRoom(){
        console.log("Transition Room " + this._nextRoom);
        this.scene.nextRoom(this._nextRoom);
    }
}