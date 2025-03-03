import Player from "../player/player.js";
import Phaser from 'phaser';

export default class PowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(player, scene, x, y, sprite=null) {
        super(scene, x, y, sprite);
        this.player = player;
    }

    newBullet(p_x, p_y, b_x, b_y){
        this.player.newBullet(p_x, p_y, b_x, b_y);
    }
}