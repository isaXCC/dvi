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

        // State machine
        this._isIdle = true;
        this._isAttacking = false;
        this._isMoving = false;
        this._called = false;
        this.pos; // TMP

        this.createAnims();
    }

    update() {
        if(this._isAlive){
            // wathis.setFrame('angel_walk_down_0');
            if(this._isIdle){
                console.log('Angel is Idle');
                if(this.active && this._isAlive && !this._called){
                    this._called = true;
                    this.scene.time.delayedCall(PARAMETERS.ANGEL.IDLE_DURATION, () => {
                        this._isIdle = false;
                        this._isMoving = true;
                        this._called = false;
                    });
                }
            }
            else if(this._isMoving){
                console.log('Angel is Moving');
                this.move();
                if(this.active && this._isAlive && !this._called){
                    this._called = true;
                    this.scene.time.delayedCall(PARAMETERS.ANGEL.MOVE_DURATION, () => {
                        this._isMoving = false;
                        this._isAttacking = true;
                        this._speed = this._speed + PARAMETERS.ANGEL.ATK_SPEED;
                        this._called = false;
                    });
                }
            } 
            else if(this._isAttacking){
                console.log('Angel is Attacking');
                // It goes by if the player moves
                this.play('atk_down', true);
                this.attack();
                if(this.active && this._isAlive && !this._called){
                    this._called = true;
                    this.scene.time.delayedCall(PARAMETERS.ANGEL.ATK_DURATION, () => {
                        this._isAttacking = false;
                        this._isIdle = true;
                        this._speed = this._speed - PARAMETERS.ANGEL.ATK_SPEED;
                        this._called = false;
                    });
                }
            }
        }
    }

    move() {
        this.followPlayer();
    }

    attack(){
        if(!this._called){
            this.pos = getNormDist(this.x, this.y, this.scene.player.x, this.scene.player.y);
        }
        this.body.setVelocity(this.pos.x_norm*this._speed, this.pos.y_norm*this._speed);
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
            frames: this.scene.anims.generateFrameNames('angel', {prefix: "angel_atk_up_", end: 4}),
            frameRate: PARAMETERS.ANGEL.ATK_FRAMERATE,
            repeat: -1
        };

        const atk_left = {
            key: 'atk_left',
            frames: this.scene.anims.generateFrameNames('angel', {prefix: "angel_atk_left_", end: 4}),
            frameRate: PARAMETERS.ANGEL.ATK_FRAMERATE,
            repeat: -1
        };

        const atk_right = {
            key: 'atk_right',
            frames: this.scene.anims.generateFrameNames('angel', {prefix: "angel_atk_right_", end: 4}),
            frameRate: PARAMETERS.ANGEL.ATK_FRAMERATE,
            repeat: -1
        };

        const atk_down = {
            key: 'atk_down',
            frames: this.scene.anims.generateFrameNames('angel', {prefix: "angel_atk_down_", end: 4}),
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