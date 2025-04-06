import PARAMETERS from "../../parameters";
import Enemy from "./enemy";

export default class Seraph extends Enemy {
    
    constructor(scene, x, y) {
        super(scene, x, y, 'seraph');

        this._max_life = PARAMETERS.SERAPH.MAX_LIFE;
        this._life = PARAMETERS.SERAPH.LIFE;
        this._speed = PARAMETERS.SERAPH.SPEED;
        this._can_heal = true;
        this._isAttacking = false;
        this._heal_amount = PARAMETERS.SERAPH.SUP_EFFECT;

        // Patrol area
        this.patrolArea = {
            x1: x - Phaser.Math.Between(PARAMETERS.SERAPH.PATROL_LOW, PARAMETERS.SERAPH.PATROL_HIGH),
            y1: y - Phaser.Math.Between(PARAMETERS.SERAPH.PATROL_LOW, PARAMETERS.SERAPH.PATROL_HIGH),
            x2: x + Phaser.Math.Between(PARAMETERS.SERAPH.PATROL_LOW, PARAMETERS.SERAPH.PATROL_HIGH),
            y2: y + Phaser.Math.Between(PARAMETERS.SERAPH.PATROL_LOW, PARAMETERS.SERAPH.PATROL_HIGH)
        };

        // Direction state (vx, vy) — either 1 or -1
        this.direction = { x: 1, y: 1 };

        // SPRITE CONFIG
        this.setSize(PARAMETERS.SERAPH.HITBOX_X, PARAMETERS.SERAPH.HITBOX_Y);
        this.setScale(PARAMETERS.SERAPH.SCALE_X, PARAMETERS.SERAPH.SCALE_Y);
        this.createAnims();

    }

    update(){
        super.update();
        if(this._can_heal){
            this.healEnemies();
        }
        this.updateAnims();
    }

    move() {
        // Move based on current direction
        this.x += this._speed * this.direction.x;
        this.y += this._speed * this.direction.y;
    
        // Bounce off patrol area edges
        if (this.x <= this.patrolArea.x1 || this.x >= this.patrolArea.x2) {
            this.direction.x *= -1;
        }
        if (this.y <= this.patrolArea.y1 || this.y >= this.patrolArea.y2) {
            this.direction.y *= -1;
        }
    }

    healEnemies(){
        console.log('Seraph just gave +' + this._heal_amount + 'life to the enemies...')
        this._isAttacking = true;
        this.scene.enemies.getHealed(this._heal_amount);
        this._can_heal = false;
        this.scene.time.delayedCall(PARAMETERS.SERAPH.SUP_DURATION, () => {
            this._isAttacking = false;
        });
        this.scene.time.delayedCall(PARAMETERS.SERAPH.SUP_RECOVER, () => {
            this._can_heal = true;
        });
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
                    this.play('eff_right', true);
                } else {
                    this.play('eff_left', true);
                }
            } else {
                if (this.body.velocity.y > 0) {
                    this.play('eff_down', true);
                } else {
                    this.play('eff_up', true);
                }
            }
        }
    }

    createAnims(){
        // creation of walk and attack animations 
        const walk_up = {
            key: 'walk_up',
            frames: this.scene.anims.generateFrameNames('seraph', {prefix: "seraph_walk_up_", end: 1}),
            frameRate: PARAMETERS.ANGEL.MOVE_FRAMERATE,
            repeat: -1
        };

        const walk_left = {
            key: 'walk_left',
            frames: this.scene.anims.generateFrameNames('seraph', {prefix: "seraph_walk_left_", end: 1}),
            frameRate: PARAMETERS.ANGEL.MOVE_FRAMERATE,
            repeat: -1
        };

        const walk_right = {
            key: 'walk_right',
            frames: this.scene.anims.generateFrameNames('seraph', {prefix: "seraph_walk_right_", end: 1}),
            frameRate: PARAMETERS.ANGEL.MOVE_FRAMERATE,
            repeat: -1
        };

        const walk_down = {
            key: 'walk_down',
            frames: this.scene.anims.generateFrameNames('seraph', {prefix: "seraph_walk_down_", end: 1}),
            frameRate: PARAMETERS.ANGEL.MOVE_FRAMERATE,
            repeat: -1
        };

        const eff_up = {
            key: 'eff_up',
            frames: this.scene.anims.generateFrameNames('seraph', {prefix: "seraph_walk_eff_up_", end: 3}),
            frameRate: PARAMETERS.ANGEL.ATK_FRAMERATE,
            repeat: -1
        };

        const eff_left = {
            key: 'eff_left',
            frames: this.scene.anims.generateFrameNames('seraph', {prefix: "seraph_walk_eff_left_", end: 3}),
            frameRate: PARAMETERS.ANGEL.ATK_FRAMERATE,
            repeat: -1
        };

        const eff_right = {
            key: 'eff_right',
            frames: this.scene.anims.generateFrameNames('seraph', {prefix: "seraph_walk_eff_right_", end: 3}),
            frameRate: PARAMETERS.ANGEL.ATK_FRAMERATE,
            repeat: -1
        };

        const eff_down = {
            key: 'eff_down',
            frames: this.scene.anims.generateFrameNames('seraph', {prefix: "seraph_walk_eff_down_", end: 3}),
            frameRate: PARAMETERS.ANGEL.ATK_FRAMERATE,
            repeat: -1
        };

        // creation of animations
        this.anims.create(walk_up);
        this.anims.create(walk_left);
        this.anims.create(walk_right);
        this.anims.create(walk_down);
        this.anims.create(eff_up);
        this.anims.create(eff_left);
        this.anims.create(eff_right);
        this.anims.create(eff_down);
    }

}