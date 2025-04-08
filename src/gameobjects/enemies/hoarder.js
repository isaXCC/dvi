import Enemy from "./enemy";
import PARAMETERS from "../../parameters.js";
import LifeBar from '../../utils/LifeBar';
import CONDITIONS from "../../dungeons/conditions.js";

export default class Hoarder extends Enemy{
    
    constructor(scene, x, y) {
        super(scene, x, y, 'hoarder');

        this._life = PARAMETERS.HOARDER.LIFE;
        this._max_life = PARAMETERS.HOARDER.MAX_LIFE;
        this._speed = PARAMETERS.HOARDER.SPEED;
        this._damage = PARAMETERS.HOARDER.DAMAGE;

        this.x = PARAMETERS.GAME.WIDTH - PARAMETERS.HOARDER.MOVE_X;

        // State machine
        this._isAttacking = false;
        this._isMoving = true;
        this._called = false;
        this._shift = false;
        this._hole = false;

        this.lifeBar = new LifeBar(scene, 
            PARAMETERS.HOARDER.LIFEBAR_X, 
            PARAMETERS.GAME.HEIGHT - PARAMETERS.HOARDER.LIFEBAR_Y, 
            this._max_life, this._life); // Position relative to the Hoarder

        // SPRITE CONFIG
        this.setSize(PARAMETERS.HOARDER.HITBOX_X, PARAMETERS.HOARDER.HITBOX_Y);
        this.setScale(PARAMETERS.HOARDER.SCALE_X, PARAMETERS.HOARDER.SCALE_Y);
    }

    update() {
        if(this._isAlive){
            this.lifeBar.setLife(this._life);
            if(this._life > (this._max_life/3)*2){
                this.phase(1);
            }
            else if(this._life > (this._max_life/3)){
                this.phase(2);
            }
            else{
                this.phase(3);
            }
        }
        else{
            this.lifeBar.destroy(); 
            this.scene.enemies.removeElement(this);
            CONDITIONS.D1.KILLED_BOSS = true;
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
        if(!this._hole){
            this.hole();
        }
    }

    shoot(ph){
        this._called = true;
        this.scene.time.delayedCall(PARAMETERS.HOARDER.ATK_DURATION, () => {
            if (this.active && this.scene) {
                this._called = false;
                switch(ph){
                    case 1:
                        this.shootOne(this.x, this.y);
                        break;
                    case 2:
                        this.shootTwo(this.x, this.y);
                        break;
                    case 3:
                        this.shootThree(this.x, this.y);
                        break;
                }
            }
        });
    }

    shift(ph){
        this._shift = true;
        this.scene.time.delayedCall(
            Phaser.Math.Between(PARAMETERS.HOARDER.MOVE_LOW, PARAMETERS.HOARDER.MOVE_HIGH),
            () => {
            if (this.active && this.scene) {
                this._shift = false;
                if(this.x === PARAMETERS.HOARDER.MOVE_X){
                    this.x = PARAMETERS.GAME.WIDTH - PARAMETERS.HOARDER.MOVE_X;
                    this.flipX = false;
                }
                else if (this.x === PARAMETERS.GAME.WIDTH - PARAMETERS.HOARDER.MOVE_X) {
                    this.x = PARAMETERS.HOARDER.MOVE_X;
                    this.flipX = true;
                }
                if(ph >= 2) {
                    console.log("ping");
                    this.y = Phaser.Math.Between(PARAMETERS.HOARDER.OFFSET_Y, PARAMETERS.GAME.HEIGHT - PARAMETERS.HOARDER.OFFSET_Y)
                }
            }
        });
    }

    hole(){
        this._hole = true;
        this.scene.time.delayedCall(
            Phaser.Math.Between(PARAMETERS.HOARDER.MOVE_LOW, PARAMETERS.HOARDER.MOVE_HIGH),
            () => {
                if (this.active && this.scene) {
                    this._hole = false;
                    let hole_x = Phaser.Math.Between(3, 12)*64;
                    let hole_y = Phaser.Math.Between(1, 7)*64;
                    this.scene.spawnHole(hole_x, hole_y);
                }
        });
    }

    move() {
        if(this.y <= PARAMETERS.HOARDER.OFFSET_Y){
            this._speed *= -1;
            this.y += 2;
        }
        else if(this.y >= PARAMETERS.GAME.HEIGHT - PARAMETERS.HOARDER.OFFSET_Y){
            this._speed *= -1;
            this.y -= 2;
        }
        this.body.setVelocity(0, this._speed); 
    }

    shootOne(x, y){
        this.scene.sound.play('enemy_shoot', { volume: 6 });
        this.scene.newEnemyForwardBullet(x, y);
    }

    shootTwo(x, y){
        this.scene.newEnemyForwardBullet(x, y - PARAMETERS.HOARDER.HITBOX_Y/2);
        this.scene.newEnemyForwardBullet(x, y + PARAMETERS.HOARDER.HITBOX_Y/2);
    }

    shootThree(x, y){
        this.scene.newEnemyForwardBullet(x, y - PARAMETERS.HOARDER.HITBOX_Y/2);
        this.scene.newEnemyForwardBullet(x, y);
        this.scene.newEnemyForwardBullet(x, y + PARAMETERS.HOARDER.HITBOX_Y/2);
    }

    takeDamage(amount=1){
        if(this._life > 0){
            this._life -= amount;
            this.scene.sound.play('enemy_hurt', { volume: 3 });
            this.setAlpha(this._life/this._max_life);
            if(this._life <= 0){
                this._isAlive = false;
            }
        }
    }
}