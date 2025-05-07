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
        this._jumpscare_damage = PARAMETERS.PLAYER.JUMPSCARE_DAMAGE;
        this._take_damage_count = 1;
        this._last_damage_taken_reason = '';
        this._used_jumpscare = false;
        
        this._last_move = 'down'
        this._last_hitbox = { width: 25, height: 25, offsetX: 20, offsetY: 22 }; // player's current hitbox, made to optimize the hitbox changes

        // State machine variables
        this._playerStopped = false;
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
        this._input_enabled = true;
        this._w = this.scene.input.keyboard.addKey('W');
        this._a = this.scene.input.keyboard.addKey('A');
        this._s = this.scene.input.keyboard.addKey('S');
        this._d = this.scene.input.keyboard.addKey('D');
        this._r = this.scene.input.keyboard.addKey('R');
        this._e = this.scene.input.keyboard.addKey('E');
        this._q = this.scene.input.keyboard.addKey('Q');
        this._t = this.scene.input.keyboard.addKey('T'); // TMP
        this._m = this.scene.input.keyboard.addKey('M'); // DEBUG

        this._space = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        /* Phaser triggers the pointerdown event for any mouse click. 
         * The left mouse button is represented by button === 0 or pointer.leftButtonDown(): */

        this.scene.input.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                console.log('Left-click detected at:', pointer.x, pointer.y);
                if(!this._isShooting && !this._isJumpScare && !this._isDashing && this.onMap(pointer.x, pointer.y) && this._input_enabled){
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
     * updates player state and handles player movement
     * @override
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        // avoids playing the game between transitions
        if(!this._input_enabled) return;
        
        if(Phaser.Input.Keyboard.JustDown(this._m) && PARAMETERS.GAME.DEBUG){
            this.scene.menu();
        }
        
        // updates player
        this.updateState();

        // updates player animations
        this.updateAnims();
    }

    updateState(){
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
                this.updateStoppedAnim();
            }
        }
        else{
            // Stop current animation and set last movement sprite
            this.stopPlayer();
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
        this._playerStopped = false;
        if(this._w.isDown){
            y_orig -= 1;
            if(this._a.isDown){
                x_orig -= 1;
                this._last_move = 'upleft';
            }
            else if(this._d.isDown){
                x_orig += 1;
                this._last_move = 'upright';
            }
            else  this._last_move = 'up';
        }
        else if(this._s.isDown){
            y_orig += 1;
            if(this._a.isDown){
                x_orig -= 1;
                this._last_move = 'downleft';
            }
            else if(this._d.isDown){
                x_orig += 1;
                this._last_move = 'downright';
            }
            else this._last_move = 'down';
        }
        else if(this._a.isDown){
            x_orig -= 1;
            this._last_move = 'left';
        }
        else if(this._d.isDown){
            x_orig += 1;
            this._last_move = 'right';
        }
        else {
            this.stop();
            this._playerStopped = true;
        }

        if(!this._isDashing){
            let {x_norm, y_norm} = getNormDist(this.x, this.y, x_orig, y_orig);
            this.setVelocity(x_norm*this._speed, y_norm*this._speed);
        }
    }

    takeDamage(reason, isHole=false){
        if(this._life > 0 && !this._isInvulnerable){
            this._take_damage_count++;
            isHole ? this._last_damage_taken_reason = reason : this._last_damage_taken_reason = reason.texture.key;
            console.log('Reason of damage taken: ' + this._last_damage_taken_reason );

            this.resetPowerUp();
            this.scene.defaultPowerUpDisplay();
            this._isInvulnerable = true;
            this._life--;
            this.scene.sound.play('player_hurt', { volume: 10 });

            let time_tint = isHole ? PARAMETERS.HOLE.DURATION : 500;

            this.setTint(PARAMETERS.PLAYER.DAMAGE_TINT);
            this.scene.time.delayedCall(time_tint, () => {
                this.clearTint();
            });
            
            if(this._life <= 0){
                this._isAlive = false;
            }
            else if(!this._isFalling){
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
        this.takeDamage(PARAMETERS.SCENES.END.DEATH_REASON.HOLE, true);
    }

    jumpScare(){
        if((this._take_damage_count % (PARAMETERS.PLAYER.JUMPSCARE_COUNT + 1)) === 0 
        || this._take_damage_count > (PARAMETERS.PLAYER.JUMPSCARE_COUNT + 1)){
            this._isJumpScare = true;
            this._isInvulnerable = true;
            this.scene.enemies.takeDamage(this._jumpscare_damage);
            this.displayScratch();
            this.scene.cameras.main.shake(PARAMETERS.PLAYER.SHAKE_DURATION, PARAMETERS.PLAYER.SHAKE_INTENSITY);
            this.scene.time.delayedCall(PARAMETERS.PLAYER.JUMPSCARE_DURATION, () => {this._isJumpScare = false;});
            this.scene.time.delayedCall(PARAMETERS.PLAYER.JUMPSCARE_INVULNERABILITY_DURATION, () => {this._isInvulnerable = false;});
            this._take_damage_count = 1;
        }
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

    pickItem(powerup){
        this.scene.sound.play('powerup_pick', { volume: 0.5 });
        let tmp = this._pup;
        this._pup = powerup;
        //remove from scene
        this.scene.powerups.removeElement(powerup);
        this._pup.effect();
        this._pup = tmp;
    }

    resetPowerUp(){
        this._pup.removePowerUp();
    }

    removePowerUp(){
        this._pup = new PowerUp(this, this.scene);
    }

    // SETTERS AND GETTERS
    isInvulnerable(){ return this._isInvulnerable;}

    changeMaxLife(i){
        PARAMETERS.PLAYER.MAX_LIFE = this._max_life + i;
        PARAMETERS.PLAYER.LIFE = this._life + i;
        this._max_life = this._max_life + i;
        this._life = this._life + i;
    }

    changeMaxAmmo(i){
        PARAMETERS.PLAYER.MAX_AMMO = this._max_ammo + i;
        this._max_ammo = this._max_ammo + i;
        this._ammo = this._ammo + i;
    }

    // ANIMATIONS SECTION
    updateAnims(){
        if(this._isDashing) this.play(this.updateWalkAnim() /*changeeee*/, true);
        else if(this._isFalling) this.updateStoppedAnim();
        //else if(this._isShooting) this.play(this.updateShootAnim(), true);
        //else if(this._isReloading) anim = this.updateReloadAnim(); NON EXISTANT
        else if(this._playerStopped) this.updateStoppedAnim();
        else this.play(this.updateWalkAnim(), true);
    }

    updateDashAnim(){
        switch(this._last_move){
            case 'upleft':
                return 'up_left_dash';
            case 'upright':
                return 'up_right_dash';
            case 'up':
                return 'up_dash';
            case 'downleft':
                return 'down_left_dash';
            case 'downright':
                return 'down_right_dash';
            case 'down':
                return 'down_dash';
            case 'left':
                return 'left_dash';
            case 'right':
                return 'right_dash';
        }
    }

    updateShootAnim(){
        switch(this._last_move){
            case 'upleft':
                return 'up_left_atk';
            case 'upright':
                return 'up_right_atk';
            case 'up':
                return 'up_atk';
            case 'downleft':
                return 'down_left_atk';
            case 'downright':
                return 'down_right_atk';
            case 'down':
                return 'down_atk';
            case 'left':
                return 'left_atk';
            case 'right':
                return 'right_atk';
        }
    }

    updateStoppedAnim(){
        // when the player is still, the last direction stays (should be change if an idle animation is created)
        let frame;
        switch(this._last_move){
            case 'upleft':
                frame = 'walk_diagupleft';
                break;
            case 'upright':
                frame = 'walk_diagupright';
                break;
            case 'up':
                frame = 'walk_up';
                break;
            case 'downleft':
                frame = 'walk_diagdownleft';
                break;
            case 'downright':
                frame = 'walk_diagdownleft';
                break;
            case 'down':
                frame = 'walk_down';
                break;
            case 'left':
                frame = 'walk_left';
                break;
            case 'right':
                frame = 'walk_right';
                break;
        }
        this.setFrame('phatcat_'.concat(frame, '_1'));
    }

    updateWalkAnim(){
        switch(this._last_move){
            case 'upleft':
                return 'up_left_walk';
            case 'upright':
                return 'up_right_walk';
            case 'up':
                return 'up_walk';
            case 'downleft':
                return 'down_left_walk';
            case 'downright':
                return 'down_right_walk';
            case 'down':
                return 'down_walk';
            case 'left':
                return 'left_walk';
            case 'right':
                return 'right_walk';
        }
    }

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
            'up': { velocityX: 0, velocityY: -1 },
            'down': { velocityX: 0, velocityY: 1 },
            'left': { velocityX: -1, velocityY: 0 },
            'right': { velocityX: 1, velocityY: 0 },
            'upleft': { velocityX: -1, velocityY: -1 },
            'upright': { velocityX: 1, velocityY: -1 },
            'downleft': { velocityX: -1, velocityY: 1 },
            'downright': { velocityX: 1, velocityY: 1 }
        };
    
        return directionMap[this._last_move] || { velocityX: 0, velocityY: 0 };
    }

    onMap(x, y){
        return !(this.scene.fullscreen_button.getBounds().contains(x, y));
    }

    initFrame(){
        let x_ratio = this.x / PARAMETERS.GAME.WIDTH;
        let y_ratio = this.y / PARAMETERS.GAME.HEIGHT;
        console.log(this.x, this.y)
        console.log(PARAMETERS.GAME.WIDTH, PARAMETERS.GAME.HEIGHT)
        console.log(x_ratio, y_ratio)
        if(y_ratio < 0.5){
            this._last_move = 'down';
        }
        else{
            this._last_move = 'up';
        }
        this._last_move
    }

    displayScratch(){
        let count_meow = 0;
        for(let i = 0; i < PARAMETERS.PLAYER.NUM_SCRATCHES; i++){ 
            this.scene.time.delayedCall(50 + 100*i, () => {
                if(i % 5 == 0){
                    switch(count_meow % 3){
                        case 0:
                            this.scene.sound.play('cat_meow3', { volume: 0.75 });
                            break;
                        case 1:
                            this.scene.sound.play('cat_meow2', { volume: 0.5 });
                            break;
                        case 2:
                            this.scene.sound.play('cat_meow1', { volume: 0.5 });
                            break;
                    }
                    count_meow++;
                }
                else{
                    if(i % 2 == 0){
                        this.scene.sound.play('cat_ripping1', { volume: 0.5 });
                    }
                    else {
                        this.scene.sound.play('cat_ripping2', { volume: 0.5 });
                    }
                }
                //random between -350 and 350
                let rand_x = Math.floor(Math.random() * (400 - (-400) + 1)) + (-400);
                //random between -150 and 150
                let rand_y = Math.floor(Math.random() * (150 - (-150) + 1)) + (-150);
                let scratch1 = this.scene.add.image(PARAMETERS.GAME.WIDTH/2 + rand_x, PARAMETERS.GAME.HEIGHT/2 + rand_y, 'scratch'.concat(String(Math.floor(Math.random() * 3) + 2)));
                // 0 = 0º, 0.5 = 90º, 1 = 180º, 1.5 = 270º, 2 = 360º
                scratch1.rotation = Math.PI * Math.random() * 2;
                let dispear_time = Math.floor(Math.random() * (350 - 250 + 1)) + 250; 
                this.scene.time.delayedCall(dispear_time, () => {
                    scratch1.destroy();
                });
            });
        }
    }

    stopPlayer(){
        // stops player and shows correct sprite
        this.stop();
        this.updateStoppedAnim();
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
    }
}