import Phaser from 'phaser';
import Bullet from '../utils/bullet.js';
import getNormDist from '../../utils/vector.js'
import PowerUp from '../powerups/powerup.js';
import PARAMETERS from "../../parameters.js";
import TripleShot from '../powerups/tripleshot.js';
import SpeedBoost from '../powerups/speedboost.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        // Init attributes
        this._life = PARAMETERS.PLAYER.LIFE;
        this._max_life = PARAMETERS.PLAYER.MAX_LIFE;
        this._stamina = PARAMETERS.PLAYER.STAMINA;
        this._bullets = PARAMETERS.PLAYER.BULLETS;
        this._max_ammo = PARAMETERS.PLAYER.MAX_AMMO;
        this._speed = PARAMETERS.PLAYER.SPEED;
        this._jumpscare_damage = PARAMETERS.JUMPSCARE_DAMAGE;
        
        this._last_move = 'phatcat_walk_up_';    // player's last move, initialized for the first update
        this._last_hitbox = { width: 25, height: 25, offsetX: 20, offsetY: 22 }; // player's current hitbox, made to optimize the hitbox changes

        // State machine variables
        this._isDashing = false;
        this._isFalling = false;
        this._isAlive = true;
        this._isInvulnerable = false;
        this._isJumpScare = false;
        this._isShooting = false;
        this._isReloading = false;
        this._canDash = true;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // adjusting player hitbox/size
        this.setCollideWorldBounds(true);           // to avoid player getting out of the map
        this.setScale(58/38, 58/38);                // to rescale the player, the original size is about 38 x 38, now is about 58 x 58
        this.setSize(24, 25).setOffset(20, 22.5);   // first hitbox, corresponds to "up_walk"

        // Creation of keystrokes
        this._w = this.scene.input.keyboard.addKey('W');
        this._a = this.scene.input.keyboard.addKey('A');
        this._s = this.scene.input.keyboard.addKey('S');
        this._d = this.scene.input.keyboard.addKey('D');
        this._r = this.scene.input.keyboard.addKey('R');
        this._e = this.scene.input.keyboard.addKey('E');
        this._q = this.scene.input.keyboard.addKey('Q');
        this._t = this.scene.input.keyboard.addKey('T'); // TMP

        this._space = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        /* Phaser triggers the pointerdown event for any mouse click. 
         * The left mouse button is represented by button === 0 or pointer.leftButtonDown(): */

        this.scene.input.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                console.log('Left-click detected at:', pointer.x, pointer.y);
                if(!this._isShooting && !this._isJumpScare && !this._isDashing){
                    this.shoot(pointer.x, pointer.y);
                }
            }
            if (pointer.rightButtonDown()) {
                console.log("Right-click blocked!");
            }
        });

        // management of animations
        this.createAnims();

        this._pup = new PowerUp(this, this.scene);
    }

    /**
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * Como se puede ver, no se tratan las colisiones con las estrellas, ysa que estas colisiones 
     * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
     * @override
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        
        // Implicit State Machine
        if(!this._isFalling){

            if(!this._isDashing){
                this.body.setVelocityX(0);
                this.body.setVelocityY(0);
            }

            if(Phaser.Input.Keyboard.JustDown(this._q)){
                if(!this._isJumpScare){
                    console.log('JUMPSCARE BITCH');
                    this.jumpScare();
                }
            }
    
            if(Phaser.Input.Keyboard.JustDown(this._r)){
                if(!this._isReloading){
                    console.log('Reloading...');
                    this.reload();
                }
            }

            if(Phaser.Input.Keyboard.JustDown(this._space)){ 
                if(!this._isDashing && this._canDash){
                    console.log('Dashing...');
                    this.dash(); 
                }
            }
    
            // interacts with the enviroment
            if(Phaser.Input.Keyboard.JustDown(this._e)){
                console.log('Interacting with the enviroment...');
                this.interact();
            }
            
            if(!this._isReloading && !this._isJumpScare){
                this.move();
            }
            // If the player is either reloading or jumpscaring, he wont be able to move
            else{
                // Stop current animation and set last movement sprite
                this.stop();
                this.setFrame(this._last_move.concat('1'));
            }
        }
        else{
            // Stop current animation and set last movement sprite
            this.stop();
            this.setFrame(this._last_move.concat('1'));
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
        }
    }

    update(){
        if(this._life <= 0){
            this._isAlive = false;
        }
    }

    // PLAYER ACTIONS
    move(){
        // player's movement
        let x_orig = this.x, y_orig = this.y;
        let new_animation = 'up_walk';
        let player_stopped = false;
        if(this._w.isDown){
            y_orig -= 1;
            if(this._a.isDown){
                x_orig -= 1;
                new_animation = 'up_left_walk';
                this._last_move = 'phatcat_walk_diagupleft_';
            }
            else if(this._d.isDown){
                x_orig += 1;
                new_animation = 'up_right_walk';
                this._last_move = 'phatcat_walk_diagupright_';
            }
            else{
                new_animation = 'up_walk';
                this._last_move = 'phatcat_walk_up_';
            } 
        }
        else if(this._s.isDown){
            y_orig += 1;
            if(this._a.isDown){
                x_orig -= 1;
                new_animation = 'down_left_walk';
                this._last_move = 'phatcat_walk_diagdownleft_';
            }
            else if(this._d.isDown){
                x_orig += 1;
                new_animation = 'down_right_walk';
                this._last_move = 'phatcat_walk_diagdownright_';
            }
            else{
                new_animation = 'down_walk';
                this._last_move = 'phatcat_walk_down_';
            } 
        }
        else if(this._a.isDown){
            x_orig -= 1;
            new_animation = 'left_walk';
            this._last_move = 'phatcat_walk_left_';
        }
        else if(this._d.isDown){
            x_orig += 1;
            new_animation = 'right_walk';
            this._last_move = 'phatcat_walk_right_';
        }
        else {
            this.stop();
            player_stopped = true;
            // when the player is still, the last direction stays (should be change if an idle animation is created)
            this.setFrame(this._last_move.concat('1'));
        }

        let {x_norm, y_norm} = getNormDist(this.x, this.y, x_orig, y_orig);

        if(!this._isDashing){
            this.setVelocity(x_norm*this._speed, y_norm*this._speed);
        }

        // if player is not standing still, a new animation is played
        if(!player_stopped){ 
            this.play(new_animation, true);

            // forces the hitbox to update to the current animation
            // this.updateHitbox(this.anims.get(new_animation));
        }
    }

    takeDamage(){
        if(this._life > 0){
            this.resetPowerUp();
            this.scene.defaultPowerUpDisplay();
            this._isInvulnerable = true;
            this._life--;
            this.scene.sound.play('player_hurt', { volume: 10 });
            if(this._life <= 0){
                this._isAlive = false;
            }
            else{
                this.scene.time.delayedCall(500, () => {
                    this._isInvulnerable = false;
                });
            }
        }
    }

    shoot(x, y){
        if(!this._isFalling){
            console.log('Bullets:', this._bullets);
            if(this._bullets > 0){
                this._isShooting = true;
                this._pup.newBullet(this.x, this.y, x, y);
                this.scene.sound.play('shootSound', { volume: 1 });
                this._bullets--;
                this.scene.time.delayedCall(PARAMETERS.PLAYER.SHOOT_DURATION, () => this._isShooting = false);
            }
        }
    }

    newBullet(p_x, p_y, b_x, b_y){
        this.scene.newBullet(p_x, p_y, b_x, b_y);
    }

    reload(){
        this._isReloading = true;
        this._bullets = this._max_ammo;
        this.scene.sound.play('reloadSound', { volume: 3 });
        this.scene.time.delayedCall(PARAMETERS.PLAYER.RELOAD_DURATION, () => this._isReloading = false);
    }

    interact(){
        // calls scene to create the ghost hitbox and making interactions possible
        this.scene.interact(this.x, this.y, this._last_hitbox);
    }

    dash(){
        if (this._stamina > 0) {
            this._canDash = false;
            this._isDashing = true;  // Prevent multiple dashes
            this._stamina--;  // Reduce stamina
            let dashSpeed = PARAMETERS.PLAYER.DASH_SPEED;

            // Get player's current movement direction
            let velocityX = this.body.velocity.x;
            let velocityY = this.body.velocity.y;
    
            if (velocityX === 0 && velocityY === 0) {
                // If player is standing still, dash in the last move direction
                ({ velocityX, velocityY } = this.getDirectionVector());
            }
    
            // Normalize velocity to ensure constant dash speed
            let { x_norm, y_norm } = getNormDist(0, 0, velocityX, velocityY);

            this.setVelocity(x_norm * dashSpeed, y_norm * dashSpeed);
    
            this.scene.time.delayedCall(PARAMETERS.PLAYER.DASH_RECOVER, () => {
                this._canDash = true;
            });
            // Stop dash after duration
            this.scene.time.delayedCall(PARAMETERS.PLAYER.DASH_DURATION, () => {
                this._isDashing = false;
            });
            this.scene.time.delayedCall(PARAMETERS.PLAYER.STAMINA_RECOVER, () => {
                this._stamina++;
            });
        }
    }

    fallHole(){
        this.takeDamage();
    }

    jumpScare(){
        this._isJumpScare = true;
        this.scene.enemies.takeDamage(this._jumpscare_damage);
        this.scene.time.delayedCall(PARAMETERS.PLAYER.JUMPSCARE_DURATION, () => this._isJumpScare = false);
    }

    // POWERUP LOGIC
    pickPowerUp(powerup){
        this.scene.sound.play('powerup_pick', { volume: 0.5 });
        //exit function
        this._pup.removePowerUp();
        //save
        this._pup = powerup;
        //display
        this.scene.newPowerUpDisplay(powerup);
        //remove from scene
        this.scene.powerups.removeElement(powerup);
        //effects function
        this._pup.effect();
    }

    resetPowerUp(){
        this._pup.removePowerUp();
    }

    removePowerUp(){
        this._pup = new PowerUp(this, this.scene);
    }

    // SETTERS AND GETTERS
    isInvulnerable(){ return this._isInvulnerable || this._isDashing || this._isJumpScare;}


    // ANIMATIONS SECTION
    createAnims(){
        // creation of walk animations, there are 8, one for each direction
        const up_walk = {
            key: 'up_walk',
            frames: this.scene.anims.generateFrameNames('player', {prefix: "phatcat_walk_up_", end: 7}),
            frameRate: 8,
            repeat: -1
        };
        
        const right_walk = {
            key: 'right_walk',
            frames: this.scene.anims.generateFrameNames('player', {prefix: "phatcat_walk_right_", end: 7}),
            frameRate: 8,
            repeat: -1
        };
        
        const left_walk = {
            key: 'left_walk',
            frames: this.scene.anims.generateFrameNames('player', {prefix: "phatcat_walk_left_", end: 7}),
            frameRate: 8,
            repeat: -1
        };

        const down_walk = {
            key: 'down_walk',
            frames: this.scene.anims.generateFrameNames('player', {prefix: "phatcat_walk_down_", end: 7}),
            frameRate: 8,
            repeat: -1
        };

        const up_right_walk = {
            key: 'up_right_walk',
            frames: this.scene.anims.generateFrameNames('player', {prefix: "phatcat_walk_diagupright_", end: 7}),
            frameRate: 8,
            repeat: -1
        };

        const up_left_walk = {
            key: 'up_left_walk',
            frames: this.scene.anims.generateFrameNames('player', {prefix: "phatcat_walk_diagupleft_", end: 7}),
            frameRate: 8,
            repeat: -1
        };

        const down_right_walk = {
            key: 'down_right_walk',
            frames: this.scene.anims.generateFrameNames('player', {prefix: "phatcat_walk_diagdownright_", end: 7}),
            frameRate: 8,
            repeat: -1
        };

        const down_left_walk = {
            key: 'down_left_walk',
            frames: this.scene.anims.generateFrameNames('player', {prefix: "phatcat_walk_diagdownleft_", end: 7}),
            frameRate: 8,
            repeat: -1
        };

        const up_atk = {
            key: 'up_atk',
            frames: this.scene.anims.generateFrameNames('player', {prefix: "phatcat_atk_up_", end: 3}),
            frameRate: 4,
            repeat: -1
        };
        
        const right_atk = {
            key: 'right_atk',
            frames: this.scene.anims.generateFrameNames('player', {prefix: "phatcat_atk_right_", end: 3}),
            frameRate: 4,
            repeat: -1
        };
        
        const left_atk = {
            key: 'left_atk',
            frames: this.scene.anims.generateFrameNames('player', {prefix: "phatcat_atk_left_", end: 3}),
            frameRate: 4,
            repeat: -1
        };
        
        const down_atk = {
            key: 'down_atk',
            frames: this.scene.anims.generateFrameNames('player', {prefix: "phatcat_atk_down_", end: 3}),
            frameRate: 4,
            repeat: -1
        };

        const up_right_atk = {
            key: 'up_right_atk',
            frames: this.scene.anims.generateFrameNames('player', {prefix: "phatcat_atk_diagupright_", end: 3}),
            frameRate: 4,
            repeat: -1
        };

        const up_left_atk = {
            key: 'up_left_atk',
            frames: this.scene.anims.generateFrameNames('player', {prefix: "phatcat_atk_diagupleft_", end: 3}),
            frameRate: 4,
            repeat: -1
        };

        const down_right_atk = {
            key: 'down_right_atk',
            frames: this.scene.anims.generateFrameNames('player', {prefix: "phatcat_atk_diagdownright_", end: 3}),
            frameRate: 4,
            repeat: -1
        };

        const down_left_atk = {
            key: 'down_left_atk',
            frames: this.scene.anims.generateFrameNames('player', {prefix: "phatcat_atk_diagdownleft_", end: 3}),
            frameRate: 4,
            repeat: -1
        };

        // creation of animations
        // the player is a unique entity, so the animations are created on the sprite
        this.anims.create(left_walk);
        this.anims.create(up_walk);
        this.anims.create(right_walk);
        this.anims.create(down_walk);
        this.anims.create(up_right_walk);
        this.anims.create(up_left_walk);
        this.anims.create(down_right_walk);
        this.anims.create(down_left_walk);
        this.anims.create(left_atk);
        this.anims.create(up_atk);
        this.anims.create(right_atk);
        this.anims.create(down_atk);
        this.anims.create(up_right_atk);
        this.anims.create(up_left_atk);
        this.anims.create(down_right_atk);
        this.anims.create(down_left_atk);
    }

    // AUXILIARY FUNCIONS
    getDirectionVector() {
        let directionMap = {
            'phatcat_walk_up_': { velocityX: 0, velocityY: -1 },
            'phatcat_walk_down_': { velocityX: 0, velocityY: 1 },
            'phatcat_walk_left_': { velocityX: -1, velocityY: 0 },
            'phatcat_walk_right_': { velocityX: 1, velocityY: 0 },
            'phatcat_walk_diagupleft_': { velocityX: -1, velocityY: -1 },
            'phatcat_walk_diagupright_': { velocityX: 1, velocityY: -1 },
            'phatcat_walk_diagdownleft_': { velocityX: -1, velocityY: 1 },
            'phatcat_walk_diagdownright_': { velocityX: 1, velocityY: 1 }
        };
    
        return directionMap[this._last_move] || { velocityX: 0, velocityY: 0 };
    }

}
