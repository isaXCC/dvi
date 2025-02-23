import Player from '../gameobjects/player/player.js';
import Angel from '../gameobjects/enemies/angel.js';
import Ophanim from '../gameobjects/enemies/ophanim.js';
import Seraph from '../gameobjects/enemies/seraph.js';
import Portal from '../gameobjects/utils/portal.js';
import Bullet from '../gameobjects/utils/bullet.js'
import Phaser from 'phaser';

export default class Room extends Phaser.Scene {

    constructor(key) {
        super({ key: key });
        // Load gameobjects
        this.enemies = [];
        this.portals = [];
        this.bullets = [];
    }
    
    create() {        
        // Add the colliders
        // HOW ITS USING this.player ???
        this.physics.add.overlap(this.portals, this.player, this.portals.at(0).transitionRoom, null, this.scene);
        this.player.enableCollision(this.enemies);

        // Add player info text in the top-left corner
        this.playerInfoText = this.add.text(10, 10, this.getPlayerInfo(), {
            fontSize: '16px',
            fill: '#fff',
            fontFamily: 'Comic Sans MS'
        });
    }

    update(){
        // Object for each array TODO
        this.bullets.forEach(bullet => bullet.update());
        this.enemies.forEach(enemy => enemy.update());
        // Update player info display
        this.playerInfoText.setText(this.getPlayerInfo());
        if(this.player._isAlive)
            this.player.update();    
        else
            this.gameOver();
    }

    newBullet(origX, origY, destX, destY){
        this.bullets.push(new Bullet(this, origX, origY, destX, destY));
    }

    nextRoom(){
        // console.log('Room ' + nextRoom);
        // this.actScene.start(nextRoom);
    }

    gameOver(){
        this.scene.start('end');
    }

    getPlayerInfo() {
        return `HP: ${this.player._life}\nStamina: ${this.player._stamina}\nAmmo: ${this.player._bullets}/${this.player._max_ammo}`;
    }
}