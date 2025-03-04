import Phaser from 'phaser';
import Bullet from '../utils/bullet.js';
import getNormDist from '../../utils/vector.js'
import PowerUp from '../powerups/powerup.js';
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
        this._life = 6;
        this._max_life = 6;
        this._stamina = 3;
        this._bullets = 7;
        this._max_ammo = 7;
        this._speed = 250;
        this._isAlive = true;
        this._invulnerable = false;
        this._last_move = 'phatcat_walk_up_';    // player's last move, initialized for the first update
        this._last_hitbox = { width: null, height: null, offsetX: null, offsetY: null }; // player's current hitbox, made to optimize the hitbox changes

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // adjusting player hitbox/size
        this.setCollideWorldBounds(true);           // to avoid player getting out of the map
        this.setScale(58/38, 58/38);                // to rescale the player, the original size is about 38 x 38, now is about 58 x 58
        this.setSize(24, 25).setOffset(20, 22.5);   // first hitbox, corresponds to "up_walk"

        // Creamos los keystrokes
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
                this.shoot(pointer.x, pointer.y);
            }
        });

        // management of animations
        this.manage_animations();

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

        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
        
        if(Phaser.Input.Keyboard.JustDown(this._q)){
            
        }

        if(Phaser.Input.Keyboard.JustDown(this._r)){
            console.log('Reloading...');
            this.reload();
        }

        if(Phaser.Input.Keyboard.JustDown(this._e)){
            console.log('Interacting with the enviroment...');

            // checks for possible interactable objects in range, and, if possible, interacts with them
            this.scene.check_interactable_objects();
        }

        if(Phaser.Input.Keyboard.JustDown(this._space)){ this.dash(); }

        let x_orig = this.x, y_orig = this.y;
        
        let new_animation = 'up_walk';
        let player_stopped = false;
        // player's movement
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
        this.setVelocity(x_norm*this._speed, y_norm*this._speed);

        // if player is not standing still, a new animation is played
        if(!player_stopped){ 
            this.play(new_animation, true);

            // forces the hitbox to update to the current animation
            this.updateHitbox(this.anims.get(new_animation));
        }
    }

    update(){
        if(this._life <= 0){
            this._isAlive = false;
        }
        // ????? idk, there should be a better option
        this.scene.check_portal_overlapping();
    }

    takeDamage(){
        if(this._life > 0){
            this._invulnerable = true;
            this._life--;
            this.scene.sound.play('player_hurt', { volume: 10 });
            if(this._life <= 0){
                this._isAlive = false;
            }
            else{
                this.scene.time.delayedCall(500, () => {
                    this._invulnerable = false;
                });
            }
        }
    }

   shoot(x, y){
        console.log('Left-click detected at:', x, y);
        console.log('Bullets:', this._bullets);
        if(this._bullets > 0){
            this._pup.newBullet(this.x, this.y, x, y);
            // this.scene.newBullet(this.x, this.y, x, y);
            // this.scene._bullets.pushback(new Bullet(this.scene, this.x, this.y, x, y));
            this.scene.sound.play('shootSound', { volume: 1 });
            this._bullets--;
        }
   }

    newBullet(p_x, p_y, b_x, b_y){
        this.scene.newBullet(p_x, p_y, b_x, b_y);
    }

    reload(){
        this._bullets = this._max_ammo;
        this.scene.sound.play('reloadSound', { volume: 3 });
    }

    dash(){
        if(this._stamina>0){
            console.log('Dash');
            // this.scene.sound.play('shootSound', { volume: 1 });
            this._stamina--;
        }
    }

    fallHole(){
        console.log('Fell');
        // this.scene.sound.play('shootSound', { volume: 1 });
    }

    manage_animations(){

        // creation of walk animations
        this.create_walk_animations();

        // creation of x animations...

    }

    create_walk_animations(){

        // creation of walk animations, there are 8, one for each direction
        const left_walk = {
            key: 'left_walk',
            frames: this.scene.anims.generateFrameNames('player', {prefix: "phatcat_walk_left_", end: 7}),
            frameRate: 8,
            repeat: -1
        };

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
    }

    updateHitbox(anim){
        //console.log(`Current animation: ${anim.key}`);
        
        // next hitbsdox to be displayed, linked to the frame of the animation
        let new_hitbox = { width: 0, height: 0, offsetX: 0, offsetY: 0 };

        // changing hitbox to each animation, making them fittable
        switch(anim.key){
            // walk sprites
            case 'left_walk':
                new_hitbox = { width: 25, height: 25, offsetX: 20, offsetY: 22.5 };
                break;
            case 'up_walk':
            case 'down_walk':
            case 'up_left_walk':
            case 'down_left_walk':
                new_hitbox = { width: 24, height: 25, offsetX: 20, offsetY: 22.5 };
                break;
            case 'right_walk':
                new_hitbox = { width: 25, height: 25, offsetX: 22.5, offsetY: 22.5 };
                break;
            case 'up_right_walk':
            case 'down_right_walk':
                new_hitbox = { width: 24.5, height: 25, offsetX: 17.5, offsetY: 22.5 };
                break;
            default:
                new_hitbox = { width: 24, height: 25, offsetX: 20, offsetY: 22.5 };
                break;

        }

        // hitbox is updated only if it has to change, for optimization reasons
        if (this._last_hitbox.width !== new_hitbox.width ||
            this._last_hitbox.height !== new_hitbox.height ||
            this._last_hitbox.offsetX !== new_hitbox.offsetX ||
            this._last_hitbox.offsetY !== new_hitbox.offsetY) {

            // hitbox is updated
            this.setSize(new_hitbox.width, new_hitbox.height);
            this.setOffset(new_hitbox.offsetX, new_hitbox.offsetY);
            //console.log('Hitbox changed!');

            // and now is saved as the last hitbox displayed
            this._last_hitbox = new_hitbox;
        }
    }

    pickPowerUp(powerup){
        this._pup.remove();
        this._pup = powerup;
        this._pup.effect();
        this.scene.powerups.removeElement(powerup);
    }

    resetPowerup(){
        this._pup = new PowerUp(this, this.scene);
    }
}
