import Enemy from "./enemy";
import PARAMETERS from "../../parameters.js";
import getNormDist from '../../utils/vector';

export default class Angel extends Enemy{
    
    constructor(scene, x, y) {
        super(scene, x, y, 'angel');

        this._life = PARAMETERS.ANGEL.LIFE;
        this._max_life = PARAMETERS.ANGEL.MAX_LIFE;
        this._speed = PARAMETERS.ANGEL.SPEED;
        this._damage = PARAMETERS.ANGEL.DAMAGE;
        this.body.setMaxVelocityX(200);
        this.body.setMaxVelocityY(200);

        // State machine
        this._isAttacking = false;
        this._isIdle = true;
        this._isMoving = false;
        this._called = false;
        
        this.generateRand();
        this.pos; // TMP

        // SPRITE CONFIG
        this.setSize(PARAMETERS.ANGEL.HITBOX_X, PARAMETERS.ANGEL.HITBOX_Y);
        this.setScale(PARAMETERS.ANGEL.SCALE_X, PARAMETERS.ANGEL.SCALE_Y);
        this.createAnims();
    }

    update() {
        if(this._isAlive){
            if(this._isIdle){
                if(this.active && this._isAlive && !this._called){
                    this._called = true;
                    this.generateRand(PARAMETERS.ANGEL.IDLE_RAND_LOW, PARAMETERS.ANGEL.IDLE_RAND_HIGH);
                    this.scene.time.delayedCall((PARAMETERS.ANGEL.IDLE_DURATION + this._rand), () => {
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
                    this.generateRand(PARAMETERS.ANGEL.MOVE_RAND_LOW, PARAMETERS.ANGEL.MOVE_RAND_HIGH);
                    this.scene.time.delayedCall((PARAMETERS.ANGEL.MOVE_DURATION + this._rand), () => {
                        this._isMoving = false;
                        this._isAttacking = true;
                        this._speed = this._speed + (PARAMETERS.ANGEL.ATK_SPEED*this._speedBoost);
                        this._called = false;
                    });
                }
            } 
            else if(this._isAttacking){
                this.attack();
                if(this.active && this._isAlive && !this._called){
                    this._called = true;
                    this.generateRand(PARAMETERS.ANGEL.ATK_RAND_LOW, PARAMETERS.ANGEL.ATK_RAND_HIGH);
                    this.scene.time.delayedCall((PARAMETERS.ANGEL.ATK_DURATION + this._rand), () => {
                        this._isAttacking = false;
                        this._isIdle = true;
                        this._speed = this._speed - (PARAMETERS.ANGEL.ATK_SPEED*this._speedBoost);
                        this._called = false;
                    });
                }
            }
            this.updateAnims();
        }
        else{
            this.scene.enemies.removeElement(this);
        }
    }

    move() {
        this.followPlayer();
    }

    attack(){
        if(!this._called){
            this.pos = getNormDist(this.x, this.y, this.scene.player.x, this.scene.player.y);
        }
        if(!this._touch_damage) this.body.setVelocity(this.pos.x_norm*this._speed, this.pos.y_norm*this._speed);
    }

    // ANIMATION SECTION
    updateAnims(){
        if(!this._isAttacking){
            if (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
                if (this.body.velocity.x > 0) {
                    this.play('walk_right', true);
                } else {
                    this.play('walk_left', true);
                }
            } else {
                if (this.body.velocity.y > 0) {
                    this.play('walk_down', true);
                } else {
                    this.play('walk_up', true);
                }
            }
        }
        else {
            if (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
                if (this.body.velocity.x > 0) {
                    this.play('atk_right', true);
                } else {
                    this.play('atk_left', true);
                }
            } else {
                if (this.body.velocity.y > 0) {
                    this.play('atk_down', true);
                } else {
                    this.play('atk_up', true);
                }
            }
        }
    }

    createAnims(){
        // creation of walk and attack animations 
        const walk_up = {
            key: 'walk_up',
            frames: this.scene.anims.generateFrameNames('angel', {prefix: "angel_walk_up_", end: 7}),
            frameRate: PARAMETERS.ANGEL.MOVE_FRAMERATE,
            repeat: -1
        };

        const walk_left = {
            key: 'walk_left',
            frames: this.scene.anims.generateFrameNames('angel', {prefix: "angel_walk_left_", end: 7}),
            frameRate: PARAMETERS.ANGEL.MOVE_FRAMERATE,
            repeat: -1
        };

        const walk_right = {
            key: 'walk_right',
            frames: this.scene.anims.generateFrameNames('angel', {prefix: "angel_walk_right_", end: 7}),
            frameRate: PARAMETERS.ANGEL.MOVE_FRAMERATE,
            repeat: -1
        };

        const walk_down = {
            key: 'walk_down',
            frames: this.scene.anims.generateFrameNames('angel', {prefix: "angel_walk_down_", end: 7}),
            frameRate: PARAMETERS.ANGEL.MOVE_FRAMERATE,
            repeat: -1
        };

        const atk_up = {
            key: 'atk_up',
            frames: this.scene.anims.generateFrameNames('angel', {prefix: "angel_atk_up_", end: 3}),
            frameRate: PARAMETERS.ANGEL.ATK_FRAMERATE,
            repeat: -1
        };

        const atk_left = {
            key: 'atk_left',
            frames: this.scene.anims.generateFrameNames('angel', {prefix: "angel_atk_left_", end: 3}),
            frameRate: PARAMETERS.ANGEL.ATK_FRAMERATE,
            repeat: -1
        };

        const atk_right = {
            key: 'atk_right',
            frames: this.scene.anims.generateFrameNames('angel', {prefix: "angel_atk_right_", end: 3}),
            frameRate: PARAMETERS.ANGEL.ATK_FRAMERATE,
            repeat: -1
        };

        const atk_down = {
            key: 'atk_down',
            frames: this.scene.anims.generateFrameNames('angel', {prefix: "angel_atk_down_", end: 3}),
            frameRate: PARAMETERS.ANGEL.ATK_FRAMERATE,
            repeat: -1
        };

        // creation of animations
        this.anims.create(walk_up);
        this.anims.create(walk_left);
        this.anims.create(walk_right);
        this.anims.create(walk_down);
        this.anims.create(atk_up);
        this.anims.create(atk_left);
        this.anims.create(atk_right);
        this.anims.create(atk_down);

    }

}