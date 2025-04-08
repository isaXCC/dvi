import Enemy from "./enemy";
import PARAMETERS from "../../parameters.js";
import getNormDist from '../../utils/vector';
import CONDITIONS from "../../dungeons/conditions.js";

export default class DummyAngel extends Enemy{
    
    constructor(scene, x, y) {
        super(scene, x, y, 'angel');

        this._life = PARAMETERS.ANGEL.LIFE;
        this._max_life = PARAMETERS.ANGEL.MAX_LIFE;
        this._speed = PARAMETERS.ANGEL.SPEED;
        this._damage = PARAMETERS.ANGEL.DAMAGE;

        // State machine
        this._isAttacking = false;
        this._isIdle = true;
        this._isMoving = false;
        this._called = false;
        
        this._rand = Phaser.Math.Between(PARAMETERS.ANGEL.RAND_LOW, PARAMETERS.ANGEL.RAND_HIGH);
        this.pos; // TMP

        // SPRITE CONFIG
        this.setSize(PARAMETERS.ANGEL.HITBOX_X, PARAMETERS.ANGEL.HITBOX_Y);
        this.setScale(PARAMETERS.ANGEL.SCALE_X, PARAMETERS.ANGEL.SCALE_Y);
        this.createAnims();
        this.play('walk_down', true);
    }

    update() {
        if(this._isAlive){
            super.update();
        }
        else{
            CONDITIONS.D1.KILLED_ANGEL = true;
            this.scene.enemies.removeElement(this);
        }
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

    move() {
    }

    attack(){

    }

    // ANIMATION SECTION
    updateAnims(){

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