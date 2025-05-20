import Enemy from "./enemy";
import PARAMETERS from "../../parameters.js";
import getNormDist from '../../utils/vector';

export default class Ophanim extends Enemy{
    
    constructor(scene, x, y) {
        super(scene, x, y, 'ophanim');

        this._life = PARAMETERS.OPHANIM.LIFE;
        this._max_life = PARAMETERS.OPHANIM.MAX_LIFE;
        this._speed = PARAMETERS.OPHANIM.SPEED;
        this._damage = PARAMETERS.OPHANIM.DAMAGE;

        // State machine
        this._isIdle = true;
        this._isAttacking = false;
        this._isMoving = false;
        this._isRandomlyMoving = false;
        this._isEscapingWall = false;
        this._called = false;

        this.generateRand();

        // SPRITE CONFIG
        this.setSize(PARAMETERS.OPHANIM.HITBOX_X, PARAMETERS.OPHANIM.HITBOX_Y);
        this.setScale(PARAMETERS.OPHANIM.SCALE_X, PARAMETERS.OPHANIM.SCALE_Y);
        this.createAnims();
    }

    update() {
        if(this._isAlive){
            if(this._isIdle){
                if(this.active && this._isAlive && !this._called){
                    this._called = true;
                    this.generateRand(PARAMETERS.OPHANIM.IDLE_RAND_LOW, PARAMETERS.OPHANIM.IDLE_RAND_HIGH);
                    this.scene.time.delayedCall(PARAMETERS.OPHANIM.IDLE_DURATION + this._rand, () => {
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
                    this.generateRand(PARAMETERS.OPHANIM.MOVE_RAND_LOW, PARAMETERS.OPHANIM.MOVE_RAND_HIGH);
                    this.scene.time.delayedCall(PARAMETERS.OPHANIM.MOVE_DURATION + this._rand, () => {
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
                    this.generateRand(PARAMETERS.OPHANIM.ATK_RAND_LOW, PARAMETERS.OPHANIM.ATK_RAND_HIGH);
                    this.scene.time.delayedCall(PARAMETERS.OPHANIM.ATK_DURATION + this._rand, () => {
                        this._isAttacking = false;
                        this._isIdle = true;
                        // this._speed = PARAMETERS.OPHANIM.ATK_SPEED;
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

    shoot(x, y){
        this.scene.sound.play('enemy_shoot', { volume: 0.8 });
        this.scene.newEnemyBullet(x, y);
    }

    // MOVEMENT SECTION
    move() {
        // if it is escaping from a wall, lets it do it
        if(this._isEscapingWall) return;

        // distance to player
        const distance = Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y);

        // if it is too close to a wall and to close to the player, it will randomly move away from
        if(/*(distance < PARAMETERS.OPHANIM.DANGER_ZONE) &&*/ this.closeToWall(this.x, this.y)) this.escapeWall();

        // if it is too far away from the player, it will follow it
        else if(distance > PARAMETERS.OPHANIM.FOLLOW_ZONE){ 
            this.followPlayer();
            this._isRandomlyMoving = false;
        }
        // if it is too near to the player, it will run from it
        else if (distance < PARAMETERS.OPHANIM.DANGER_ZONE) {
            this.runFromPlayer();
            this._isRandomlyMoving = false;
        }
        // if non of those, it will also move randomly
        else if (!this._isRandomlyMoving) this.randomMove();
    }

    randomMove() {
        // tries MAX_TRIES times to get a new pos that is not near the player or walls
        for (let i = 0; i < PARAMETERS.OPHANIM.RANDOM_MOVE_MAX_TRIES; i++) {
            // generates random angle and distance
            let angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
            let distance = Phaser.Math.Between(PARAMETERS.OPHANIM.RANDOM_MOVE_MIN_RADIUS, PARAMETERS.OPHANIM.RANDOM_NOVE_MAX_RADIUS);

            // generates coords
            let targetX = this.x + Math.cos(angle) * distance;
            let targetY = this.y + Math.sin(angle) * distance;
    
            // calculates distance to player from target pos
            let distanceToPlayer = Phaser.Math.Distance.Between(targetX, targetY, this.scene.player.x, this.scene.player.y);
    
            // if it is valid, moves there
            if ((distanceToPlayer > PARAMETERS.OPHANIM.DANGER_ZONE)) {
                let { x_norm, y_norm } = getNormDist(this.x, this.y, targetX, targetY);
                this.body.setVelocity(x_norm * this._speed, y_norm * this._speed);
                this._isRandomlyMoving = true;
                return;
            }
        }
    
        // if in those tries does not find a valid point, it stays still
        this.body.setVelocity(0, 0);
    }

    escapeWall(){
        this._isEscapingWall = true;
        this.followPlayer();
        this.scene.time.delayedCall(PARAMETERS.OPHANIM.ESCAPE_WALL_DURATION, () => this._isEscapingWall = false);
    }

    // ANIMATION SECTION
    updateAnims(){
        if(!this._isAttacking){
            if (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
                if (this.body.velocity.x > 0) {
                    this.play('walk_left', true);
                } else {
                    this.play('walk_right', true);
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
            if (Math.abs(this.body.velocity.x) < Math.abs(this.body.velocity.y)) {
                if (this.body.velocity.x > 0) {
                    this.play('atk_right', true);
                } else {
                    this.play('atk_left', true);
                }
            } else {
                if (this.body.velocity.y > 0) {
                    this.play('atk_up', true);
                } else {
                    this.play('atk_down', true);
                }
            }
        }
    }

    createAnims(){
        // creation of walk and attack animations 
        const walk_up = {
            key: 'walk_up',
            frames: this.scene.anims.generateFrameNames('ophanim', {prefix: "ophanim_walk_up_", end: 7}),
            frameRate: PARAMETERS.OPHANIM.MOVE_FRAMERATE,
            repeat: -1
        };

        const walk_left = {
            key: 'walk_left',
            frames: this.scene.anims.generateFrameNames('ophanim', {prefix: "ophanim_walk_left_", end: 7}),
            frameRate: PARAMETERS.OPHANIM.MOVE_FRAMERATE,
            repeat: -1
        };

        const walk_right = {
            key: 'walk_right',
            frames: this.scene.anims.generateFrameNames('ophanim', {prefix: "ophanim_walk_right_", end: 7}),
            frameRate: PARAMETERS.OPHANIM.MOVE_FRAMERATE,
            repeat: -1
        };

        const walk_down = {
            key: 'walk_down',
            frames: this.scene.anims.generateFrameNames('ophanim', {prefix: "ophanim_walk_down_", end: 7}),
            frameRate: PARAMETERS.OPHANIM.MOVE_FRAMERATE,
            repeat: -1
        };

        const atk_up = {
            key: 'atk_up',
            frames: this.scene.anims.generateFrameNames('ophanim', {prefix: "ophanim_atk_up_", end: 1}),
            frameRate: PARAMETERS.OPHANIM.ATK_FRAMERATE,
            repeat: -1
        };

        const atk_left = {
            key: 'atk_left',
            frames: this.scene.anims.generateFrameNames('ophanim', {prefix: "ophanim_atk_left_", end: 1}),
            frameRate: PARAMETERS.OPHANIM.ATK_FRAMERATE,
            repeat: -1
        };

        const atk_right = {
            key: 'atk_right',
            frames: this.scene.anims.generateFrameNames('ophanim', {prefix: "ophanim_atk_right_", end: 1}),
            frameRate: PARAMETERS.OPHANIM.ATK_FRAMERATE,
            repeat: -1
        };

        const atk_down = {
            key: 'atk_down',
            frames: this.scene.anims.generateFrameNames('ophanim', {prefix: "ophanim_atk_down_", end: 1}),
            frameRate: PARAMETERS.OPHANIM.ATK_FRAMERATE,
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