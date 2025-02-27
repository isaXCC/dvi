import Player from "../player/player";

export default class Portal extends Phaser.GameObjects.Sprite{

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */

    constructor(scene, x, y, nextRoom) {
        super(scene, x, y, 'portal');

        this.activated = false;                // if a portal is activated, the player can interact with it

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();
    }

    // update
    update(){
        // checks if the portal should be activated or not
        this.activate();

    }

    // checks if the portal should be activated or not
    activate(){
        // calculates the distance between this portal and the player
        let dist;
        if(this.scene.player) dist = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);

        // if player is in range, the portal is activated
        if(dist < 100){
            this.activated = true;
            this.setTexture('activated_portal');
        } 
        else{ 
            this.activated = false;
            this.setTexture('portal');
        }
    }
    
    transitionRoom() {
        // console.log(this._nextRoom);
        this.scene.nextRoom();
    }
}
