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

        // State machine
        this._isIdle = true;
        this._isAttacking = false;
        this._isMoving = false;
        this._called = false;

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
                this.faseOne();
            }
            else if(this._life > (this._max_life/3)){
                this.faseTwo();
            }
            else{
                this.faseThree();
            }
        }
        else{
            this.lifeBar.destroy(); 
            this.scene.enemies.removeElement(this);
            CONDITIONS.D1.KILLED_BOSS = true;
        }
    }
    faseOne(){
        if(this._isIdle){
            if(this.active && this._isAlive && !this._called){
                this._called = true;
                this.scene.time.delayedCall(PARAMETERS.OPHANIM.IDLE_DURATION, () => {
                    this._isIdle = false;
                    this._isMoving = true;
                    this._called = false;
                });
            }
        }
        else if(this._isMoving){
            this.move();
            if(this.active && this._isAlive && !this._called){
                this._called = true;
                this.scene.time.delayedCall(PARAMETERS.OPHANIM.MOVE_DURATION, () => {
                    this._isMoving = false;
                    this._isAttacking = true;
                    // this._speed = PARAMETERS.OPHANIM.ATK_SPEED;
                    this._called = false;
                });
            }
        } 
        else if(this._isAttacking){
            if(this.active && this._isAlive && !this._called){
                this.shoot(this.x, this.y);
                this._called = true;
                this.scene.time.delayedCall(PARAMETERS.OPHANIM.ATK_DURATION, () => {
                    this._isAttacking = false;
                    this._isIdle = true;
                    // this._speed = PARAMETERS.OPHANIM.ATK_SPEED;
                    this._called = false;
                });
            }
        }
    }
    faseTwo(){
        if(this._isIdle){
            if(this.active && this._isAlive && !this._called){
                this._called = true;
                this.scene.time.delayedCall(PARAMETERS.OPHANIM.IDLE_DURATION, () => {
                    this._isIdle = false;
                    this._isMoving = true;
                    this._called = false;
                });
            }
        }
        else if(this._isMoving){
            this.move();
            if(this.active && this._isAlive && !this._called){
                this._called = true;
                this.scene.time.delayedCall(PARAMETERS.OPHANIM.MOVE_DURATION, () => {
                    this._isMoving = false;
                    this._isAttacking = true;
                    // this._speed = PARAMETERS.OPHANIM.ATK_SPEED;
                    this._called = false;
                });
            }
        } 
        else if(this._isAttacking){
            if(this.active && this._isAlive && !this._called){
                this.shootTwo(this.x, this.y);
                this._called = true;
                this.scene.time.delayedCall(PARAMETERS.OPHANIM.ATK_DURATION, () => {
                    this._isAttacking = false;
                    this._isIdle = true;
                    // this._speed = PARAMETERS.OPHANIM.ATK_SPEED;
                    this._called = false;
                });
            }
        }
    }
    faseThree(){
        if(this._isIdle){
            if(this.active && this._isAlive && !this._called){
                this._called = true;
                this.scene.time.delayedCall(PARAMETERS.OPHANIM.IDLE_DURATION, () => {
                    this._isIdle = false;
                    this._isMoving = true;
                    this._called = false;
                });
            }
        }
        else if(this._isMoving){
            this.move();
            if(this.active && this._isAlive && !this._called){
                this._called = true;
                this.scene.time.delayedCall(PARAMETERS.OPHANIM.MOVE_DURATION, () => {
                    this._isMoving = false;
                    this._isAttacking = true;
                    // this._speed = PARAMETERS.OPHANIM.ATK_SPEED;
                    this._called = false;
                });
            }
        } 
        else if(this._isAttacking){
            if(this.active && this._isAlive && !this._called){
                this.shootThree(this.x, this.y);
                this._called = true;
                this.scene.time.delayedCall(PARAMETERS.OPHANIM.ATK_DURATION, () => {
                    this._isAttacking = false;
                    this._isIdle = true;
                    // this._speed = PARAMETERS.OPHANIM.ATK_SPEED;
                    this._called = false;
                });
            }
        }
    }

    shoot(x, y){
        this.scene.sound.play('enemy_shoot', { volume: 6 });
        this.scene.newEnemyBullet(x, y);
    }

    shootTwo(x, y){
        this.scene.newEnemyBullet(x, y - PARAMETERS.HOARDER.HITBOX_Y/3);
        this.scene.newEnemyBullet(x, y + PARAMETERS.HOARDER.HITBOX_Y/3);
    }

    shootThree(x, y){
        this.scene.newEnemyBullet(x, y - PARAMETERS.HOARDER.HITBOX_Y/3);
        this.scene.newEnemyBullet(x, y);
        this.scene.newEnemyBullet(x, y + PARAMETERS.HOARDER.HITBOX_Y/3);
    }

    move(){
        this.runFromPlayer();
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