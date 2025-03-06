import Player from '../gameobjects/player/player.js';
import Angel from '../gameobjects/enemies/angel.js';
import Ophanim from '../gameobjects/enemies/ophanim.js';
import Seraph from '../gameobjects/enemies/seraph.js';
import Portal from '../gameobjects/utils/portal.js';
import Bullet from '../gameobjects/utils/bullet.js';
import NPC from '../gameobjects/utils/npc.js';
import EnemyGroup from '../gameobjects/groups/EnemyGroup.js';
import BulletGroup from '../gameobjects/groups/BulletGroup.js';
import Phaser from 'phaser';
import DefaultGroup from '../gameobjects/groups/DefaultGroup.js';
import PortalGroup from '../gameobjects/groups/PortalGroup.js';
import NPCGroup from '../gameobjects/groups/NPCGroup.js';
import PUPGroup from '../gameobjects/groups/PUPGroup.js';
import TripleShot from '../gameobjects/powerups/tripleshot.js';
import SpeedBoost from '../gameobjects/powerups/speedboost.js';

export default class Room extends Phaser.Scene {

    constructor(key) {
        super({ key: key });

        // information that will be passed between rooms
        this.player_state;
        this.nextLine = "Lalala ma lov"; // PROTOTYPE for Hito 1
    }

    // ROOM GENERATION AND TILED INTEGRATION

    create() {        
        // Add the colliders
        //this.physics.add.overlap(this.portals, this.player, (portal) => portal.transitionRoom(), null, this.scene);
       
        this.portals.addOverlap(this.player, this.portals.playerOverlap);
        this.bullets.addOverlap(this.enemies, this.bullets.enemyOverlap);
        this.bullets.addOverlap(this.player, this.bullets.playerOverlap);
        this.enemies.addCollision(this.player, this.enemies.playerCollision);
        this.npcs.addCollision(this.player, this.npcs.playerCollision);
        this.powerups.addOverlap(this.player, this.powerups.playerOverlap);

        // Add player info text in the top-left corner
        this.playerInfoText = this.add.text(10, 10, this.getPlayerInfo(), {
            fontSize: '16px',
            fill: '#fff',
            fontFamily: 'Comic Sans MS'
        });
    }

    update(){
        this.bullets.update();
        this.enemies.update();
        this.portals.update();
        this.npcs.update();
        // Update player info display
        this.playerInfoText.setText(this.getPlayerInfo());
        if(this.player._isAlive)
            this.player.update();    
        else {
            this.music.stop();
            this.gameOver();
        }
    }

    generateTiled(key){
        this.enemies = new EnemyGroup(this);
        this.bullets = new BulletGroup(this);
        this.portals = new PortalGroup(this);
        this.npcs = new NPCGroup(this);
        this.powerups = new PUPGroup(this);

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
                console.log('player_state.portal:' + this.player_state.portal);
                console.log('portal name:' + object.name);
                if(object.name === this.player_state.portal){
                    console.log('NEW POS');
                    this.player_state.x = object.x;
                    this.player_state.y = object.y;
                }
            }
        }
        for (const object of map.getObjectLayer('npcs').objects) {
            if (object.type === 'NPC') { 
                this.npcs.addElement(new NPC(this, object.x, object.y, object.name));
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
                    if(this.player_state.x !== undefined){
                        this.player.x = this.player_state.x;
                    }
                    if(this.player_state.y !== undefined){
                        this.player.y = this.player_state.y;
                    }
                }
            }
        }
        for (const object of map.getObjectLayer('powerups').objects) {
            if (object.type === 'SpeedBoost') { 
                this.powerups.addElement(new SpeedBoost(this.player, this, object.x, object.y));
            }
            if (object.type === 'TripleShot') { 
                this.powerups.addElement(new TripleShot(this.player, this, object.x, object.y));
            }
        }

        // Load gameobjects  
        this.physics.add.collider(this.player, onc);
        this.enemies.addCollision(onc);
        this.bullets.addCollision(onc, this.bullets.oncCollision);
        this.physics.add.collider(this.player, oic, (player) => player.fallHole(), null, this);
    }

    // ROOM STATE LOGIC AND METHODS

    enterDialogue(){
        this.scene.pause();
        this.scene.launch('dialogue', { parent: this.scene, next: this.nextLine }); 
        this.input.enabled = false;
    }

    nextRoom(room){
        this.music.stop();
        console.log('Player life before: ' + this.player._life);
        this.scene.start(room, {life: this.player._life, bullets: this.player._bullets, portal: this.scene.key});
    }

    gameOver(){
        this.scene.start('end');
    }

    // AUXILIARY METHODS

    getPlayerInfo() {
        return `HP: ${this.player._life}\nStamina: ${this.player._stamina}\nAmmo: ${this.player._bullets}/${this.player._max_ammo}\nPowerUp: `;
    }


    setPlayerInfo(player_state){
        console.log('ROOM: ' + player_state.portal);
        this.player_state = player_state;
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


}