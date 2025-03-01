import Enemy from "./enemy";

export default class Ophanim extends Enemy{
    
    constructor(scene, x, y) {
        super(scene, x, y, 'ophanim');

        this._life = 3;
        this._speed = 10;
        this._shooting = false;
    }

    update() {
        if(this._isAlive){
            if(this._shooting){
                this._shooting = false;
                console.log('PEW')
            }
            else{
                this.move();
                this.scene.time.delayedCall(1500, () => {
                    if(this.active && this._isAlive){
                        this._shooting = true;
                    }
                });
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