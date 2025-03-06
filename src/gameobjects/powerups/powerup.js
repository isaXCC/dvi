import Player from "../player/player.js";
import Phaser from 'phaser';

export default class PowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(player, scene, x=0, y=0, sprite=null) {
        super(scene, x, y, sprite);

        this.sprite = sprite;
        this.player = player;

        if(sprite !== null){
            this.scene.add.existing(this);
        }
    }

    newBullet(p_x, p_y, b_x, b_y){
        this.player.newBullet(p_x, p_y, b_x, b_y);
    }

    // TODO -> to specify the type of bullet
    bulletType(){}

    effect(){}

    remove(){}


}