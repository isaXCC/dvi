import getNormDist from "../../utils/vector";

export default class Bullet extends Phaser.Physics.Arcade.Sprite {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} origX Coordenada X
     * @param {number} origY Coordenada Y
     * @param {number} destX Coordenada X
     * @param {number} destY Coordenada Y
     */

    constructor(scene, origX, origY, destX, destY, enemyBullet, playerBulletSprite='bullet') {
        let sprite = enemyBullet ? 'fireball' : playerBulletSprite;
        super(scene, origX, origY, sprite);
        this.rotation = Phaser.Math.Angle.Between(destX, destY, this.x, this.y) + 1.5708;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setDepth(5);
        this._damage = 1;

        let {x_norm, y_norm} = getNormDist(origX, origY, destX, destY);
        this.v_x = x_norm*300;
        this.v_y = y_norm*300;

        console.log('Enemy Bullet: ' + enemyBullet);
        this._enemyBullet = enemyBullet;
        console.log('_Enemy Bullet: ' + this._enemyBullet);
        
        // Set the collision system
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.scene.physics.world.on('worldbounds', this.worldBoundsHandler, this);
    }
    
    update(){
        this.setVelocity(this.v_x, this.v_y);
        // console.log('Bullet flying!');
    }

    worldBoundsHandler(body) {
        if (body.gameObject === this) {
            console.log('Object out of bounds!');
            // Destroy or handle the object as needed
            this.scene.bullets.removeElement(this);
        }
    }

    getDamage(){
        return this._damage;
    }

}
