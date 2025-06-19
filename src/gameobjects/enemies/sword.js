import Enemy from "./enemy";
import PARAMETERS from "../../parameters.js";
import getNormDist from "../../utils/vector";

export default class Sword extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'sword');

        this._life = PARAMETERS.SWORD.LIFE;
        this._max_life = PARAMETERS.SWORD.MAX_LIFE;
        this._speed = PARAMETERS.SWORD.SPEED;
        this._damage = PARAMETERS.SWORD.DAMAGE;

        this.setFrame(0);

        this._isIdle = true;
        this._isAiming = false;
        this._isAttacking = false;
        this._called = false;

        this.setSize(PARAMETERS.SWORD.HITBOX_X, PARAMETERS.SWORD.HITBOX_Y);
        this.setScale(PARAMETERS.SWORD.SCALE_X, PARAMETERS.SWORD.SCALE_Y);

    }

    update() {
        if (!this._isAlive) {
            this.scene.enemies.removeElement(this);
            return;
        }

        if (this._isIdle) {
            if (this.active && !this._called) {
                this._called = true;
                this.generateRand(PARAMETERS.SWORD.IDLE_RAND_LOW, PARAMETERS.SWORD.IDLE_RAND_HIGH);
                this.scene.time.delayedCall(PARAMETERS.SWORD.IDLE_DURATION + this._rand, () => {
                    this._isIdle = false;
                    this._isAiming = true;
                    this._called = false;
                });
            }
        } else if (this._isAiming) {
            this.aim();
            if (this.active && !this._called) {
                this._called = true;
                this.generateRand(PARAMETERS.SWORD.AIM_RAND_LOW, PARAMETERS.SWORD.AIM_RAND_HIGH);
                this.scene.time.delayedCall(PARAMETERS.SWORD.AIM_DURATION + this._rand, () => {
                    this._isAiming = false;
                    this._isAttacking = true;
                     // visual change while charging
                    this.setBlendMode(Phaser.BlendModes.ADD);
                        this.scene.time.delayedCall(PARAMETERS.SWORD.ATK_DURATION, () => {
                        this.setBlendMode(Phaser.BlendModes.NORMAL);
                    });

                    this._speed = this._speed +  (PARAMETERS.SWORD.ATK_SPEED * this._speedBoost);
                    this.attack()
                    this._called = false;
                });
            }
        } else if (this._isAttacking) {

            if (this.active && this._isAlive && !this._called) {
                this._called = true;
                this.generateRand(PARAMETERS.SWORD.ATK_RAND_LOW, PARAMETERS.SWORD.ATK_RAND_HIGH);
                this.scene.time.delayedCall(PARAMETERS.SWORD.ATK_DURATION + this._rand, () => {
                    this._isAttacking = false;
                    this._isIdle = true;
                    this.body.setVelocity(0, 0);
                    this._speed = this._speed - (PARAMETERS.SWORD.ATK_SPEED * this._speedBoost) ;
                    this._called = false;
                    this.setFrame(0);
                });

            }
        }
    }

    aim() {
        this.setFrame(1);

        this.pos = getNormDist(this.x, this.y, this.scene.player.x, this.scene.player.y);

        const dx = this.scene.player.x - this.x;
        const dy = this.scene.player.y - this.y;

        this.rotation = Math.atan2(dy, dx) + Phaser.Math.DegToRad(270);
    }

    attack() {
        // saves player position
        this.pos = getNormDist(this.x, this.y, this.scene.player.x, this.scene.player.y);

        if (!this._touch_damage) {
             this.body.setVelocity(this.pos.x_norm * this._speed, this.pos.y_norm * this._speed);
        }
    }

}
