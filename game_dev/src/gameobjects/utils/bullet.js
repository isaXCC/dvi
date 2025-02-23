export default class Bullet extends Phaser.GameObjects.Sprite{

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} origX Coordenada X
     * @param {number} origY Coordenada Y
     * @param {number} destX Coordenada X
     * @param {number} destY Coordenada Y
     */

    constructor(scene, origX, origY, destX, destY) {
        super(scene, origX, origY, 'bullet');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // Initialize the direction of the bullet
        this.setSpeed(origX, origY, destX, destY);

        // Set the collision system
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.scene.physics.world.on('worldbounds', this.handleWorldBounds, this);
        this.scene.physics.add.overlap(this, this.scene.enemies, this.enemyHit, null, this);
    }
    
    update(){
        // console.log('Bullet flying!');
    }
    
    setSpeed(origX, origY, destX, destY){
        const speed = 300;
        let dx = destX - origX;
        let dy = destY - origY;
        let length = Math.sqrt(dx * dx + dy * dy);
        if (length !== 0) {
            dx /= length;
            dy /= length;
        }
        this.body.setVelocity(dx * speed, dy * speed);
    }
    
    enemyHit(bullet, enemy) {
        console.log('Bullet hit an enemy!');
        this.scene.enemies.splice(this.scene.enemies.indexOf(enemy), 1);
        this.scene.bullets.splice(this.scene.bullets.indexOf(bullet), 1);
        enemy.destroy(); // Remove the enemy
        bullet.destroy(); // Remove the bullet
    }

    handleWorldBounds(body) {
        if (body.gameObject === this) {
            console.log('Object out of bounds!');
            // Destroy or handle the object as needed
            this.scene.bullets.splice(this.scene.bullets.indexOf(this), 1);
            this.destroy();
        }
    }
}
