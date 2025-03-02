import Player from '../gameobjects/player/player.js';
import Angel from '../gameobjects/enemies/angel.js';
import Ophanim from '../gameobjects/enemies/ophanim.js';
import Seraph from '../gameobjects/enemies/seraph.js';
import Portal from '../gameobjects/utils/portal.js';
import Bullet from '../gameobjects/utils/bullet.js'
import EnemyGroup from '../gameobjects/groups/EnemyGroup.js';
import BulletGroup from '../gameobjects/groups/BulletGroup.js';
import Phaser from 'phaser';
import DefaultGroup from '../gameobjects/groups/DefaultGroup.js';
import PortalGroup from '../gameobjects/groups/PortalGroup.js';

export default class Room extends Phaser.Scene {

    constructor(key) {
        super({ key: key });

        // information that will be passed between rooms
        this.player_state;
    }

    create() {        

        // Add the colliders
        //this.physics.add.overlap(this.portals, this.player, (portal) => portal.transitionRoom(), null, this.scene);
       
        this.portals.addOverlap(this.player, this.portals.playerOverlap);
        this.bullets.addOverlap(this.enemies, this.bullets.enemyOverlap);
        this.bullets.addOverlap(this.player, this.bullets.playerOverlap);
        this.enemies.addCollision(this.player, this.enemies.playerCollision);

        // Add player info text in the top-left corner
        this.playerInfoText = this.add.text(10, 10, this.getPlayerInfo(), {
            fontSize: '16px',
            fill: '#fff',
            fontFamily: 'Comic Sans MS'
        });
    }

    setPlayerInfo(player_state){
        console.log('Player life after: ' + player_state.life);
        this.player_state = player_state;
    }

    update(){
        this.bullets.update();
        this.enemies.update();
        this.portals.update();
        // Update player info display
        this.playerInfoText.setText(this.getPlayerInfo());
        if(this.player._isAlive)
            this.player.update();    
        else {
            this.music.stop();
            this.gameOver();
        }
    }

    newBullet(origX, origY, destX, destY){
        this.bullets.addElement(new Bullet(this, origX, origY, destX, destY, false));
    }

    newEnemyBullet(origX, origY){
        this.bullets.addElement(new Bullet(this, origX, origY, this.player.x, this.player.y, true));
    }

    // checks for possible interactable objects in range, and, if possible, interacts with them
    check_interactable_objects(){
        // first, it checks for portals
        this.portals.transitionRoom();
    }

    // ????? idk, there should be a better option
    check_portal_overlapping(){
        this.portals.deactivate();
    }

    nextRoom(room){
        this.music.stop();
        console.log('Player life before: ' + this.player._life);
        this.scene.start(room, {life: this.player._life, bullets: this.player._bullets});
    }

    gameOver(){
        this.scene.start('end');
    }

    getPlayerInfo() {
        return `HP: ${this.player._life}\nStamina: ${this.player._stamina}\nAmmo: ${this.player._bullets}/${this.player._max_ammo}`;
    }

    generateTiled(key){
        this.enemies = new EnemyGroup(this);
        this.bullets = new BulletGroup(this);
        this.portals = new PortalGroup(this);

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
                this.enemies.addElement(new Angel(this, object.x, object.y))
            }
            if (object.type === 'Ophanim') {
                this.enemies.addElement(new Ophanim(this, object.x, object.y))
            }
            if (object.type === 'Seraph') {
                this.enemies.addElement(new Seraph(this, object.x, object.y))
            }
        }
        for (const object of map.getObjectLayer('portals').objects) {
            if (object.type === 'Portal') { 
                this.portals.addElement(new Portal(this, object.x, object.y, object.name));
            }
        }
        for (const object of map.getObjectLayer('player').objects) {
            if (object.type === 'Player') { 
                this.player = new Player(this, object.x, object.y);
                if(this.player_state !== undefined){
                    if(this.player_state.life !== undefined){
                        console.log('Set life ' + this.player_state.life);
                        this.player._life = this.player_state.life;
                    }
                    if(this.player_state.bullets !== undefined){
                        console.log('Set bullets ' + this.player_state.bullets);
                        this.player._bullets = this.player_state.bullets;
                    }
                }
            }
        }
        // Load gameobjects  
        this.physics.add.collider(this.player, onc);
    
        this.enemies.addCollision(onc);
        this.bullets.addCollision(onc, this.bullets.oncCollision);
        this.physics.add.collider(this.player, oic, (player) => player.fallHole(), null, this);
    }
}