import CONDITIONS from "../../dungeons/conditions";
import PARAMETERS from "../../parameters";
import Enemy from "./enemy";
import LifeBar from "../../utils/LifeBar";

export default class RichMan extends Enemy{
        constructor(scene, x, y) {
        super(scene, x, y, 'richman');

        this._life = PARAMETERS.RICHMAN.LIFE;
        this._max_life = PARAMETERS.RICHMAN.MAX_LIFE;
        this._speed = PARAMETERS.RICHMAN.SPEED;
        this._damage = PARAMETERS.RICHMAN.DAMAGE;

        this.x = PARAMETERS.GAME.WIDTH - PARAMETERS.RICHMAN.MOVE_X;

        // State machine
        this._isAlive = true;
        this._isAttacking = false;
        this._called = false;
        this._isShifting = false;
        this._isSpawningHole = false;

        this._shiftPos = 1;

        this.lifeBar = new LifeBar(scene, 
            PARAMETERS.RICHMAN.LIFEBAR_X, 
            PARAMETERS.GAME.HEIGHT - PARAMETERS.RICHMAN.LIFEBAR_Y, 
            this._max_life, this._life); // Position relative to the Richman

        // SPRITE CONFIG
        this.setSize(PARAMETERS.RICHMAN.HITBOX_X, PARAMETERS.RICHMAN.HITBOX_Y);
        this.setScale(PARAMETERS.RICHMAN.SCALE_X, PARAMETERS.RICHMAN.SCALE_Y);
        this.setDepth(5);
    }

    update() {
        if(this._isAlive){
            this.lifeBar.setLife(this._life);
            if(this._life > this._max_life/3){
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
            CONDITIONS.D2.KILLED_BOSS = true;
            CONDITIONS.D2.FIGHT_BOSS = false;
        }
    }

    phase(ph){
        if(!this._called){
            this.shoot(ph);
        }
        if(!this._isShifting){
            this.shift(ph);
        }
        if(!this._isSpawningHole && ph == 2){
            this.hole();
        }
    }

    shoot(ph){
        this._called = true;
        this.scene.time.delayedCall(Phaser.Math.Between(PARAMETERS.RICHMAN.ATK_DURATION_HIGH, PARAMETERS.RICHMAN.ATK_DURATION_LOW),
            () => {
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
        this._isShifting = true;
        this.scene.time.delayedCall(
            Phaser.Math.Between(PARAMETERS.RICHMAN.MOVE_LOW/ph, PARAMETERS.RICHMAN.MOVE_HIGH/ph),
            () => {
            if (this.active && this.scene) {
                this._isShifting = false;
                switch(this._shiftPos){
                    case 0:
                        this.x = PARAMETERS.GAME.WIDTH/2;
                        this.y = PARAMETERS.GAME.HEIGHT - PARAMETERS.RICHMAN.MOVE_Y;
                        this._shiftPos = 1;
                        break;
                    case 1: 
                        this.x = PARAMETERS.GAME.WIDTH - PARAMETERS.RICHMAN.MOVE_X;
                        this.y = PARAMETERS.GAME.HEIGHT/2;
                        this.flipX = false;
                        this._shiftPos = 2;
                        break;
                    case 2: 
                        this.x = PARAMETERS.GAME.WIDTH/2;
                        this.y = PARAMETERS.RICHMAN.MOVE_Y;
                        this._shiftPos = 3;
                        break;
                    case 3:
                        this.x = PARAMETERS.RICHMAN.MOVE_X;
                        this.y = PARAMETERS.GAME.HEIGHT/2;
                        this.flipX = true;
                        this._shiftPos = 0;
                        break;
                }
            }
        });
    }

    hole(){
        let pattern = Phaser.Math.Between(0, 9);
        let current_hole, max_hole;
        switch(pattern){
            case 0:
            case 1:
            case 2:
            case 3:
            case 8:
            case 9:
                current_hole = 2;
                max_hole = 15;
                break;
            case 4:
            case 5:
            case 6:
            case 7:
                current_hole = 2;
                max_hole = 8;
                break;           
        }
        this.createHoles(current_hole, max_hole, pattern);
    }

    createHoles(current_hole, max_hole, pattern){
        this._isSpawningHole = true;
        if(current_hole < max_hole){
            this.scene.time.delayedCall(PARAMETERS.RICHMAN.HOLE_SPAWN, () => {
                    let hole_x;
                    let hole_y;
                    if (this.active && this.scene) {
                        switch(pattern){
                            case 0:
                                hole_x = current_hole*64;
                                for(let i = 0; i < 3; i++){
                                    this.scene.spawnHole(hole_x, ((i*2)+2)*64, true, PARAMETERS.RICHMAN.HOLE_DESTROY);
                                }   
                                this.createHoles(++current_hole, max_hole, pattern);
                                break;
                            case 1:
                                hole_x = current_hole*64;
                                for(let i = 0; i < 3; i++){
                                    this.scene.spawnHole(hole_x, ((i*2)+3)*64, true, PARAMETERS.RICHMAN.HOLE_DESTROY);
                                }   
                                this.createHoles(++current_hole, max_hole, pattern);
                                break;
                            case 2:
                                hole_x = (max_hole-1)*64;
                                for(let i = 0; i < 3; i++){
                                    this.scene.spawnHole(hole_x, ((i*2)+2)*64, true, PARAMETERS.RICHMAN.HOLE_DESTROY);
                                }  
                                this.createHoles(current_hole, --max_hole, pattern);
                                break;
                            case 3:
                                hole_x = (max_hole-1)*64;
                                for(let i = 0; i < 3; i++){
                                    this.scene.spawnHole(hole_x, ((i*2)+3)*64, true, PARAMETERS.RICHMAN.HOLE_DESTROY);
                                }  
                                this.createHoles(current_hole, --max_hole, pattern);
                                break;
                            case 4:
                                hole_y = current_hole*64;
                                for(let i = 0; i < 7; i++){
                                    this.scene.spawnHole(((i*2)+2)*64, hole_y, true, PARAMETERS.RICHMAN.HOLE_DESTROY);
                                }   
                                this.createHoles(++current_hole, max_hole, pattern);
                                break;
                            case 5:
                                hole_y = current_hole*64;
                                for(let i = 0; i < 6; i++){
                                    this.scene.spawnHole(((i*2)+3)*64, hole_y, true, PARAMETERS.RICHMAN.HOLE_DESTROY);
                                }   
                                this.createHoles(++current_hole, max_hole, pattern);
                                break;
                            case 6:
                                hole_y = (max_hole-1)*64;
                                for(let i = 0; i < 7; i++){
                                    this.scene.spawnHole(((i*2)+2)*64, hole_y, true, PARAMETERS.RICHMAN.HOLE_DESTROY);
                                }   
                                this.createHoles(current_hole, --max_hole, pattern);
                                break;
                            case 7:
                                hole_y = (max_hole-1)*64;
                                for(let i = 0; i < 6; i++){
                                    this.scene.spawnHole(((i*2)+3)*64, hole_y, true, PARAMETERS.RICHMAN.HOLE_DESTROY);
                                }   
                                this.createHoles(current_hole, --max_hole, pattern);
                                break;
                            case 8:
                                hole_x = current_hole*64;
                                for(let i = 0; i < 3; i++){
                                    this.scene.spawnHole(hole_x, (((i*2)+2)*64) + (current_hole%2)*64, true, PARAMETERS.RICHMAN.HOLE_DESTROY);
                                }   
                                this.createHoles(++current_hole, max_hole, pattern);
                                break;
                            case 9:
                                hole_x = (max_hole-1)*64;
                                for(let i = 0; i < 3; i++){
                                    this.scene.spawnHole(hole_x, ((i*2)+3)*64 - (max_hole%2)*64, true, PARAMETERS.RICHMAN.HOLE_DESTROY);
                                }   
                                this.createHoles(current_hole, --max_hole, pattern);
                                break;
                        }
                    }
            });
        }
        else this._isSpawningHole = false;
    }

    shootOne(x, y){
        this.playSound();
        this.scene.newEnemyBullet(x, y);
    }

    shootTwo(x, y){
        this.playSound();
        this.scene.newEnemyBullet(x, y - PARAMETERS.RICHMAN.HITBOX_Y/2);
        this.scene.time.delayedCall(PARAMETERS.RICHMAN.SHOOT_TWO_OFFSET, () => {
            this.scene.newEnemyBullet(x, y + PARAMETERS.RICHMAN.HITBOX_Y/2);
        });
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