export default class Portal extends Phaser.GameObjects.Sprite{

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */

    constructor(scene, x, y, nextRoom) {
        super(scene, x, y, 'portal');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();
    }
    // lala
    update(){
        
    }
    
    transitionRoom() {
        // console.log(this._nextRoom);
        this.scene.nextRoom();
    }
}
