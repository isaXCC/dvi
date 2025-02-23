import Phaser from 'phaser';
import Bullet from '../utils/bullet.js';
import get_norm_dist from '../../utils/vector.js'

export default class Player extends Phaser.GameObjects.Sprite {

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
        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // Queremos que el jugador no se salga de los límites del mundo
        this.body.setCollideWorldBounds();

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

        if(this._w.isDown){
            this.body.setVelocityY(-this._speed);
            if(this._a.isDown){
                this.body.setVelocityX(-this._speed);
            }
            else if(this._d.isDown){
                this.body.setVelocityX(this._speed);
            }
        }
        else if(this._s.isDown){
            this.body.setVelocityY(this._speed);
            if(this._a.isDown){
                this.body.setVelocityX(-this._speed);
            }
            else if(this._d.isDown){
                this.body.setVelocityX(this._speed);
            }
        }
        else if(this._a.isDown){
            this.body.setVelocityX(-this._speed);
        }
        else if(this._d.isDown){
            this.body.setVelocityX(this._speed);
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
}
