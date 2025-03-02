import Player from "../player/player";

export default class NPC extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, sprite) {
        super(scene, x, y, 'npcs');
        this.nameNPC = sprite;
        this.scene = scene;
        this.createAnims();
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    update(){
        // this.play(virgil);
    }

    createAnims(){
        const virgil = {
            key: 'virgil',
            frames: this.scene.anims.generateFrameNames('npcs', {prefix: "virgil_", end: 1}),
            frameRate: 2,
            repeat: -1
        };

        this.anims.create(virgil);
    }
}