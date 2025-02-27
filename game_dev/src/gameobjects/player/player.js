import Phaser from 'phaser';
import Bullet from '../utils/bullet.js';
import get_norm_dist from '../../utils/vector.js'

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
        this._stamina = 3;
        this._bullets = 7;
        this._max_ammo = 7;
        this._speed = 300;
        this._isAlive = true;
        this._invulnerable = false;
        this._last_move = 'phatcat_walk_up_';    // player's last move, initialized for the first update

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // Queremos que el jugador no se salga de los límites del mundo
        this.setCollideWorldBounds(true);
        this.setSize(38, 38); // to readjust player's hitbox

        // Creamos los keystrokes
        this._w = this.scene.input.keyboard.addKey('W');
        this._a = this.scene.input.keyboard.addKey('A');
        this._s = this.scene.input.keyboard.addKey('S');
        this._d = this.scene.input.keyboard.addKey('D');
        this._r = this.scene.input.keyboard.addKey('R');
        this._e = this.scene.input.keyboard.addKey('E');
        this._q = this.scene.input.keyboard.addKey('Q');
        this._space = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        /* Phaser triggers the pointerdown event for any mouse click. 
         * The left mouse button is represented by button === 0 or pointer.leftButtonDown(): */

        this.scene.input.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                console.log('Left-click detected at:', pointer.x, pointer.y);
                this.shoot(pointer.x, pointer.y);
            }
        });

        // sprites

        // generation of walk sprites
        this.generate_walk_sprites();

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

        if(Phaser.Input.Keyboard.JustDown(this._r)){
            console.log('Reloading...');
            this.reload();
        }

        if(Phaser.Input.Keyboard.JustDown(this._space)){ this.dash(); }

        // player's movement
        if(this._w.isDown){
            this.body.setVelocityY(-this._speed);
            if(this._a.isDown){
                this.body.setVelocityX(-this._speed);
                this.play('up_left_walk', true);
                this._last_move = 'phatcat_walk_diagupleft_';
            }
            else if(this._d.isDown){
                this.body.setVelocityX(this._speed);
                this.play('up_right_walk', true);
                this._last_move = 'phatcat_walk_diagupright_';
            }
            else{
                this.play('up_walk', true);
                this._last_move = 'phatcat_walk_up_';
            } 
        }
        else if(this._s.isDown){
            this.body.setVelocityY(this._speed);
            if(this._a.isDown){
                this.body.setVelocityX(-this._speed);
                this.play('down_left_walk', true);
                this._last_move = 'phatcat_walk_diagdownleft_';
            }
            else if(this._d.isDown){
                this.body.setVelocityX(this._speed);
                this.play('down_right_walk', true);
                this._last_move = 'phatcat_walk_diagdownright_';
            }
            else{
                this.play('down_walk', true);
                this._last_move = 'phatcat_walk_down_';
            } 
        }
        else if(this._a.isDown){
            this.body.setVelocityX(-this._speed);
            this.play('left_walk', true);
            this._last_move = 'phatcat_walk_left_';
        }
        else if(this._d.isDown){
            this.body.setVelocityX(this._speed);
            this.play('right_walk', true);
            this._last_move = 'phatcat_walk_right_';
        }
        else {
            this.stop();

            // when the player is still, the last direction stays (should be change if an idle animation is created)
            this.setFrame(this._last_move.concat('1'));
        }
    }

   update(){
        if(this._life <= 0){
            this._isAlive = false;
        }
   }

   shoot(x, y){
        console.log('Left-click detected at:', x, y);
        console.log('Bullets:', this._bullets);
        if(this._bullets>0){
            this.scene.newBullet(this.x, this.y, x, y);
            // this.scene._bullets.pushback(new Bullet(this.scene, this.x, this.y, x, y));
            this.scene.sound.play('shootSound', { volume: 1 });
            this._bullets--;
        }
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

    enableCollision(enemies) {
        this.scene.physics.add.overlap(this, this.scene.enemies, this.enemy_touch_damage, null, this);
    }

    enemy_touch_damage(player, enemy) {
        if(enemy.active){
            if (this._invulnerable) return;
    
            console.log('touch damage');
    
            this._invulnerable = true;
            this._life--;
            console.log(this._life);
    
            enemy._touch_damage = true;
            let rate = 500;
            let {x_norm, y_norm} = get_norm_dist(this.x, this.y, enemy.x, enemy.y);
            enemy.body.setVelocity(x_norm*rate, y_norm*rate);
    
            this.scene.time.delayedCall(50, () => {
                if(enemy.active){
                    enemy._touch_damage = false;
                    enemy.body.setVelocity(0, 0); // Stop enemy movement
                }
            });
    
            this.scene.time.delayedCall(1000, () => {
                this._invulnerable = false;
            });
        }
    }

    generate_walk_sprites(){
        // generation of sprites, there are 8, one for each direction
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

        // creation of sprites
        this.scene.anims.create(left_walk);
        this.scene.anims.create(up_walk);
        this.scene.anims.create(right_walk);
        this.scene.anims.create(down_walk);
        this.scene.anims.create(up_right_walk);
        this.scene.anims.create(up_left_walk);
        this.scene.anims.create(down_right_walk);
        this.scene.anims.create(down_left_walk);
    }
}
