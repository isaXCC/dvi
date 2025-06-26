import Player from "../player/player";
import CONDITIONS from "../../dungeons/conditions"

export default class NPC extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, sprite) {
        super(scene, x, y, 'npcs');
        this.nameNPC = sprite;
        if(this.nameNPC === "mice_incomplete" && CONDITIONS.D1.MICE_FAMILY){
            this.nameNPC = "mice_complete";
        }

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
        const mice_complete = {
            key: 'mice_complete',
            frames: this.scene.anims.generateFrameNames('npcs', {prefix: "mice_complete_", end: 1}),
            frameRate: 4,
            repeat: -1
        };
        const mice_kid = {
            key: 'mice_kid',
            frames: this.scene.anims.generateFrameNames('npcs', {prefix: "mice_kid_", end: 1}),
            frameRate: 4,
            repeat: -1
        };
        const bunny = {
            key: 'bunny',
            frames: this.scene.anims.generateFrameNames('npcs', {prefix: "bunny_", end: 1}),
            frameRate: 4,
            repeat: -1
        };
        const bunny1 = {
            key: 'bunny1',
            frames: this.scene.anims.generateFrameNames('npcs', {prefix: "bunny_", end: 1}),
            frameRate: 4,
            repeat: -1
        };
        const bunny2 = {
            key: 'bunny2',
            frames: this.scene.anims.generateFrameNames('npcs', {prefix: "bunny_", end: 1}),
            frameRate: 4,
            repeat: -1
        };const bunny3 = {
            key: 'bunny3',
            frames: this.scene.anims.generateFrameNames('npcs', {prefix: "bunny_", end: 1}),
            frameRate: 4,
            repeat: -1
        };const bunny4 = {
            key: 'bunny4',
            frames: this.scene.anims.generateFrameNames('npcs', {prefix: "bunny_", end: 1}),
            frameRate: 4,
            repeat: -1
        };
        this.anims.create(virgil);
        this.anims.create(mice_incomplete);
        this.anims.create(mice_complete);
        this.anims.create(mice_kid);
        this.anims.create(bunny);
        this.anims.create(bunny1);
        this.anims.create(bunny2);
        this.anims.create(bunny3);
        this.anims.create(bunny4);
    }
}