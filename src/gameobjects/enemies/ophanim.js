import Enemy from "./enemy";

export default class Ophanim extends Enemy{
    
    constructor(scene, x, y) {
        super(scene, x, y, 'ophanim');

        this._max_life = 3;
        this._life = 3;
        this._speed = 25;
        this._shooting = false;
        this._moving = true;
        this._called = false;
    }

    update() {
        if(this._isAlive){
            // not stopping to move as it should
            if(this._moving){
                this.move();
            }
            if(this._shooting){
                this._shooting = false;
                this._called = false;
                this._moving = false;
                console.log('Enemy shoot the CAT');
                this.scene.sound.play('enemy_shoot', { volume: 6 });
                this.scene.newEnemyBullet(this.x, this.y);
                this.scene.time.delayedCall(1500, () => {
                    if(this.active && this._isAlive){
                        this._moving = true;
                    }
                });
            }
            else{
                if(!this._called){
                    this._called = true;
                    this._moving = false;
                    this.scene.time.delayedCall(5000, () => {
                        if(this.active && this._isAlive){
                            this._shooting = true;
                        }
                    });
                }
            }
        }
        else{
            this.scene.enemies.removeElement(this);
        }
    }

    shoot(x, y){
        console.log('Left-click detected at:', x, y);
        console.log('Bullets:', this._bullets);
        if(this._bullets > 0){
            this.scene.newBullet(this.x, this.y, x, y);
            // this.scene._bullets.pushback(new Bullet(this.scene, this.x, this.y, x, y));
            this.scene.sound.play('shootSound', { volume: 1 });
        }
    }

    move(){
        this.runFromPlayer();
    }
}