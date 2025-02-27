import Phaser from 'phaser';
import get_norm_dist from '../../utils/vector';

//This class only serves as a template. Thus, it should never be instantiated
export default class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this._touch_damage = false;

        // Abstract properties -> Children must override
        this._life = null;
        this._speed = null;
    }

    update() {
        
    }

    follow_player(){
        if(!this._touch_damage){
            let {x_norm, y_norm} = get_norm_dist(this.x, this.y, this.scene.player.x, this.scene.player.y);
            this.body.setVelocity(x_norm*this._speed, y_norm*this._speed);

        }
    }
}