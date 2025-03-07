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

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();
    }

    // update
    update(){
        /* unused
        // checks if the portal should be activated or not
        this.activate();
        */
    }


    // checks if the portal should be activated or not/*
    /*activate()/*{
        /*unused
        // calculates the distance between this portal and the player
        let dist = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);

        // if player is in range, the portal is activated
        if(dist < 40){
            this.activated = true;
            this.setTexture('activated_portal');
        } 
        else{ 
            this.activated = false;
            this.setTexture('portal');
        }
       this.isActivated = true;
    }*/

    
    transitionRoom(){
        console.log("Transition Room " + this._nextRoom);
        this.scene.nextRoom(this._nextRoom);
    }
}