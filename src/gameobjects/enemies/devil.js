import Enemy from "./enemy";
import PARAMETERS from "../../parameters.js";
import LifeBar from '../../utils/LifeBar';
import CONDITIONS from "../../dungeons/conditions.js";

export default class Devil extends Enemy{
    
    constructor(scene, x, y) {
        super(scene, x, y, 'devil');

        this._life = PARAMETERS.DEVIL.LIFE;
        this._max_life = PARAMETERS.DEVIL.MAX_LIFE;
        this._speed = PARAMETERS.DEVIL.SPEED;
        this._damage = PARAMETERS.DEVIL.DAMAGE;

        this.setFrame(0);

        this.x = PARAMETERS.GAME.WIDTH - PARAMETERS.DEVIL.MOVE_X;

        // State machine
        this._isAttacking = false;
        this._isMoving = true;
        this._called = false;
        this._shift = false;
        this._enemy = false;

        this.lifeBar = new LifeBar(scene, 
            PARAMETERS.DEVIL.LIFEBAR_X, 
            PARAMETERS.GAME.HEIGHT - PARAMETERS.DEVIL.LIFEBAR_Y, 
            this._max_life, this._life); // Position relative to the Hoarder

        // SPRITE CONFIG
        this.setSize(PARAMETERS.DEVIL.HITBOX_X, PARAMETERS.DEVIL.HITBOX_Y);
        this.setScale(PARAMETERS.DEVIL.SCALE_X, PARAMETERS.DEVIL.SCALE_Y);

        this._currentEdge = 'top'; // start on the top edge
        this._edgeSpeed = PARAMETERS.DEVIL.SPEED;
        this.setPosition(PARAMETERS.DEVIL.MOVE_X, PARAMETERS.DEVIL.MOVE_X);

    }

    update() {
        if(this._isAlive){
            this.lifeBar.setLife(this._life);
            if(this._life > this._max_life/2){
                this.phase(1);
            }
            else{
                this.setFrame(1);
                this.phase(2);
            }
        }
        else{
            this.lifeBar.destroy(); 
            this.scene.enemies.removeElement(this);
            CONDITIONS.DF.KILLED_BOSS = true;
        }
    }
    phase(ph){
        this.move();
        if(!this._called){
            this.shoot(ph);
        }
        if(!this._shift){
            this.shift(ph);
        }
        if(!this._enemy){
            this.enemy();
        }
    }

    shoot(ph){
        this._called = true;
        this.scene.time.delayedCall(PARAMETERS.DEVIL.ATK_DURATION/ph, () => {
            if (this.active && this.scene) {
                this._called = false;
                switch(ph){
                    case 1:
                        this.shootOne(this.x, this.y);
                        break;
                    case 2:
                        this.shootTwo(this.x, this.y);
                        break;
                }
            }
        });
    }

    shift(ph){
        this._shift = true;
        this.scene.time.delayedCall(
            Phaser.Math.Between(PARAMETERS.DEVIL.MOVE_LOW, PARAMETERS.DEVIL.MOVE_HIGH),
            () => {
            if (this.active && this.scene) {
                this._shift = false;
                if(this.x === PARAMETERS.DEVIL.MOVE_X){
                    this.x = PARAMETERS.GAME.WIDTH - PARAMETERS.DEVIL.MOVE_X;
                    this.flipX = false;
                }
                else if (this.x === PARAMETERS.GAME.WIDTH - PARAMETERS.DEVIL.MOVE_X) {
                    this.x = PARAMETERS.DEVIL.MOVE_X;
                    this.flipX = true;
                }
                if(ph >= 2) {
                    this.y = Phaser.Math.Between(PARAMETERS.DEVIL.OFFSET_Y, PARAMETERS.GAME.HEIGHT - PARAMETERS.DEVIL.OFFSET_Y)
                }
            }
        });
    }

    enemy(){
        this._enemy = true;
        this.scene.time.delayedCall(
            Phaser.Math.Between(PARAMETERS.DEVIL.MOVE_LOW, PARAMETERS.DEVIL.MOVE_HIGH),
            () => {
                if (this.active && this.scene) {
                    this._enemy = false;
                    let enemy_x = Phaser.Math.Between(3, 12)*64;
                    let enemy_y = Phaser.Math.Between(2, 6)*64;
                    this.scene.spawnAngel(enemy_x, enemy_y);
                }
        });
    }

    move() {
        const margin = PARAMETERS.DEVIL.MOVE_X;
        const width = PARAMETERS.GAME.WIDTH;
        const height = PARAMETERS.GAME.HEIGHT;

        switch (this._currentEdge) {
            case 'top':
                this.body.setVelocity(this._edgeSpeed, 0);
                if (this.x >= width - margin) {
                    this.x = width - margin;
                    this._currentEdge = 'right';
                }
                break;
            case 'right':
                this.body.setVelocity(0, this._edgeSpeed);
                if (this.y >= height - margin) {
                    this.y = height - margin;
                    this._currentEdge = 'bottom';
                }
                break;
            case 'bottom':
                this.body.setVelocity(-this._edgeSpeed, 0);
                if (this.x <= margin) {
                    this.x = margin;
                    this._currentEdge = 'left';
                }
                break;
            case 'left':
                this.body.setVelocity(0, -this._edgeSpeed);
                if (this.y <= margin) {
                    this.y = margin;
                    this._currentEdge = 'top';
                }
                break;
        }
    }

    shootOne(x, y){
        this.playSound();
        this.scene.newEnemyBullet(x, y);
    }

    shootTwo(x, y){
        this.playSound();
        this.scene.newEnemyBullet(x, y - PARAMETERS.HOARDER.HITBOX_Y/2);
        this.scene.newEnemyBullet(x, y);
        this.scene.newEnemyBullet(x, y + PARAMETERS.HOARDER.HITBOX_Y/2);
    }

    takeDamage(amount=1){
        if(this._life > 0){
            this._life -= amount;
            this.scene.sound.play('enemy_hurt', { volume: 3 });
            if(this._life <= 0){
                this._isAlive = false;
            }
        }
    }

    playSound(){
        let rand = Math.random();

        if (rand < 0.5) {
            this.scene.sound.play('enemy_shoot', { volume: 3 }); 
        } 
        else {
            this.scene.sound.play('fire_shoot', { volume: 1.3 });
        } 
        
    }
}