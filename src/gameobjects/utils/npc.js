import Player from "../player/player";

export default class NPC extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, sprite) {
        super(scene, x, y, 'npcs');
        this.nameNPC = sprite;
        this.scene = scene;
        this.createAnims();
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this._dialoguePending = true;
    }

    update(){
        if(this._dialoguePending){
            this.play(this.nameNPC, true);
        }
        else{
            this.setFrame(this.nameNPC.concat('_0'));
            this.stop();
        }
    }

    createAnims(){
        const virgil = {
            key: 'virgil',
            frames: this.scene.anims.generateFrameNames('npcs', {prefix: "virgil_", end: 1}),
            frameRate: 8,
            repeat: -1
        };
        const mice_incomplete = {
            key: 'mice_incomplete',
            frames: this.scene.anims.generateFrameNames('npcs', {prefix: "mice_incomplete_", end: 1}),
            frameRate: 4,
            repeat: -1
        };

        this.anims.create(virgil);
        this.anims.create(mice_incomplete);
    }
}