import Phaser from 'phaser';
import getNormDist from '../../utils/vector';

//This class only serves as a template. Thus, it should never be instantiated
export default class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this._touch_damage = false;

        // Abstract properties -> Children must override
        this._max_life = 3;
        this._life = 3;
        this._speed = 50;
        this._isAlive = true;
    }

    update() {
        if(this._isAlive){
            super.update();
            this.move();
        }
    }

    takeDamage(amount=1){
        if(this._life > 0){
            this._life -= amount;
            this.scene.sound.play('enemy_hurt', { volume: 3 });
            this.setAlpha(this._life/this._max_life);
            if(this._life <= 0){
                this._isAlive = false;
                this.scene.enemies.removeElement(this);
            }
        }
    }

    getHealed(amount=1){
        if(this._life < this._max_life){
            this._life += amount;
            this.setAlpha(this._life/this._max_life);
        }
    }

    move(){

    }

    followPlayer(){
        if(!this._touch_damage){
            let {x_norm, y_norm} = getNormDist(this.x, this.y, this.scene.player.x, this.scene.player.y);
            this.body.setVelocity(x_norm*this._speed, y_norm*this._speed);
        }
    }

    runFromPlayer(){
        if(!this._touch_damage){
            let {x_norm, y_norm} = getNormDist(this.x, this.y, this.scene.player.x, this.scene.player.y);
            this.body.setVelocity(-x_norm*this._speed, -y_norm*this._speed);
        }
    }
}