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
        // this.physics.add.overlap(this.portals, this.player, this.portals.at(0).transitionRoom, null, this.scene);
        this.physics.add.overlap(this.portals, this.player, (portal) => portal.transitionRoom(), null, this.scene);
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

    nextRoom(room){
        this.music.stop();
        this.scene.start(room);
    }

    gameOver(){
        this.scene.start('end');
    }

    getPlayerInfo() {
        return `HP: ${this.player._life}\nStamina: ${this.player._stamina}\nAmmo: ${this.player._bullets}/${this.player._max_ammo}`;
    }

    generateTiled(key){
        // Tiled creation of map, tiles and different layers
        var map = this.make.tilemap({key: key});
        var tiles = map.addTilesetImage('room_tileset', 'room_tiles');
        map.createLayer('background', tiles, 0, 0);
        var onc = map.createLayer('onc', tiles, 0, 0);
        onc.setCollisionByExclusion([-1], true);
        var oic = map.createLayer('oic', tiles, 0, 0);
        oic.setCollisionByExclusion([-1], true);
        
        // Tiled creation of each object
        for (const object of map.getObjectLayer('enemies').objects) {
            if (object.type === 'Angel') {
                this.enemies.push(new Angel(this, object.x, object.y));
            }
            if (object.type === 'Ophanim') {
                this.enemies.push(new Ophanim(this, object.x, object.y));
            }
            if (object.type === 'Seraph') {
                this.enemies.push(new Seraph(this, object.x, object.y));
            }
        }
        for (const object of map.getObjectLayer('portals').objects) {
            if (object.type === 'Portal') { 
                this.portals.push(new Portal(this, object.x, object.y, object.name));
            }
        }
        for (const object of map.getObjectLayer('player').objects) {
            if (object.type === 'Player') { 
                this.player = new Player(this, object.x, object.y);
            }
        }
        // Load gameobjects  
        this.physics.add.collider(this.player, onc);
        this.physics.add.collider(this.enemies, onc);
        // this.physics.add.collider(this.player, oic);
        this.physics.add.collider(this.player, oic, (player) => player.fallHole(), null, this);
    }
}