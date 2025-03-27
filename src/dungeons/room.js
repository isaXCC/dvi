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
import GhostHitbox from '../gameobjects/utils/ghosthitbox.js';
import Hole from '../gameobjects/utils/hole.js';
import HoleGroup from '../gameobjects/groups/HoleGroup.js';
import Fire from '../gameobjects/utils/fire.js';
import FireGroup from '../gameobjects/groups/FireGroup.js';
import PARAMETERS from '../parameters.js';

export default class Room extends Phaser.Scene {

    constructor(key) {
        super({ key: key });

        // information that will be passed between rooms
        this.player_state;
        this.nextLine = "Lalala ma lov"; // PROTOTYPE for Hito 1
        this.powerup_image;
    }

    init(player_state) {
        if(player_state !== undefined){
            this.setPlayerInfo(player_state);
        }
    }

    // ROOM GENERATION AND TILED INTEGRATION

    create() {        
        // Add the colliders
        this.bullets.addOverlap(this.enemies, this.bullets.enemyOverlap);
        this.bullets.addOverlap(this.player, this.bullets.playerOverlap);
        this.enemies.addCollision(this.player, this.enemies.playerCollision);
        this.npcs.addCollision(this.player, this.npcs.playerCollision);
        this.powerups.addOverlap(this.player, this.powerups.playerOverlap);
        this.holes.addOverlap(this.player, this.holes.playerOverlap);
        this.fires.addOverlap(this.player, this.fires.playerOverlap);
        //maybe?
        //this.holes.addCollision(this.enemies); 

        // adds player info to the HUD
        this.createPlayerHUD();

        // Blocking context menu to open
        window.addEventListener('contextmenu', (event) => event.preventDefault());
    }

    // adds player info to the HUD
    createPlayerHUD(){
        // first creates the life
        this.hearts = [];
        let heart;
        let i = 0;
        for(i; i < Math.floor(this.player._max_life/2); i++){
            heart = this.add.sprite(20 + (i + 1)*12, 30, 'hearts').setFrame(2);  // creates the array of frames
            this.hearts.push(heart);
        }
        this.last_life = this.player._max_life;

        // then, the stamina bar
        this.stamina_bar = [];
        let stamina;
        for(i = 0; i < this.player._stamina; i++){
            stamina = this.add.sprite(10 + (i + 1)*32, 50, 'stamina').setFrame(1);  // creates the array of frames
            this.stamina_bar.push(stamina);
        }
        this.last_stamina = this.player._stamina;

        // lastly, the bullets 
        this.playerBulletsText = this.add.text(920, 548, `Bullets: ${this.player._bullets}/${this.player._max_ammo}`, {
            fontSize: '16px',
            fill: '#fff',
            fontFamily: 'Comic Sans MS'
        });
    }

    updatePlayerHUD(){

        // updates life
        if(this.player._life !== this.last_life){
            for (let i = 0; i < Math.floor(this.player._max_life/2); i++) {
                if (this.player._life >= (i + 1) * 2) {
                    this.hearts[i].setFrame(2); // full heart
                } else if (this.player._life === (i * 2) + 1) {
                    this.hearts[i].setFrame(1); // half heart
                } else {
                    this.hearts[i].setFrame(0); // lost heart
                }
            }
            this.last_life = this.player._life;
        }

        // updates stamina
        if(this.player._stamina !== this.last_stamina){
            for (let i = 0; i < this.stamina_bar.length; i++) {
                if (this.player._stamina >= (i + 1)) {
                    this.stamina_bar[i].setFrame(1); // full heart
                } else {
                    this.stamina_bar[i].setFrame(0); // lost heart
                }
            }
            this.last_stamina = this.player._stamina;
        }

        // updates bullets
        this.playerBulletsText.setText(`Bullets: ${this.player._bullets}/${this.player._max_ammo}`);
        //this.defaultPowerUpDisplay();
        // Blocking context menu to open
        window.addEventListener('contextmenu', (event) => event.preventDefault());
    }

    update(){
        this.bullets.update();
        this.enemies.update();
        this.portals.update();
        this.npcs.update();

        // Update player info display
        this.updatePlayerHUD();

        if(this.player._isAlive)
            this.player.update();    
        else {
            this.music.stop();
            this.gameOver();
        }

        // if the room is a time attack room, it gets updated
        if(this.time_attack_room !== null && this.time_attack_room !== undefined) this.time_attack_room.update();
    }

    generateTiled(key){
        this.enemies = new EnemyGroup(this);
        this.bullets = new BulletGroup(this);
        this.portals = new PortalGroup(this);
        this.npcs = new NPCGroup(this);
        this.powerups = new PUPGroup(this);
        this.holes = new HoleGroup(this);
        this.fires = new FireGroup(this);

        // Tiled creation of map, tiles and different layers
        var map = this.make.tilemap({key: key});
        var tiles = map.addTilesetImage('room_tileset', 'room_tiles');
        map.createLayer('background', tiles, 0, 0);
        var onc = map.createLayer('onc', tiles, 0, 0);
        onc.setCollisionByExclusion([-1], true);
        var oic = map.createLayer('oic', tiles, 0, 0);
        //oic.setCollisionByExclusion([-1], true);
        
        // Tiled creation of each object
        for (const object of map.getObjectLayer('holes').objects) {
            // GRID_OFFSET_Y necesary to make Tiled more managable
            this.holes.addElement(new Hole(this, object.x, object.y+PARAMETERS.HOLE.GRID_OFFSET_Y));
        }
        for (const object of map.getObjectLayer('fires').objects) {
            // GRID_OFFSET_Y necesary to make Tiled more managable
            this.fires.addElement(new Fire(this, object.x, object.y));
        }
        for (const object of map.getObjectLayer('portals').objects) {
            if (object.type === 'Portal') { 
                this.portals.addElement(new Portal(this, 
                    object.x + PARAMETERS.PORTAL.GRID_OFFSET_X, 
                    object.y + PARAMETERS.PORTAL.GRID_OFFSET_Y,
                     object.name));
                console.log('player_state.portal:' + this.player_state.portal);
                console.log('portal name:' + object.name);
                if(object.name === this.player_state.portal){
                    console.log('NEW POS');
                    this.player_state.x = object.x;
                    this.player_state.y = object.y;
                }
            }
        }
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
                    if(this.player_state.powerup !== undefined){
                        let pup = new this.player_state.powerup.constructor(this.player, this);
                        this.powerups.addElement(pup);
                        this.player._pup = pup;
                        if(pup.constructor.name === 'PowerUp'){
                            this.defaultPowerUpDisplay();
                        }
                        else{
                            this.newPowerUpDisplay(pup);
                        }
                        this.powerups.removeElement(pup);
                        this.player._pup.effect();
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

        //LALA

        // Load gameobjects  
        this.physics.add.collider(this.player, onc);
        this.enemies.addCollision(onc);
        this.bullets.addCollision(onc, this.bullets.oncCollision);
        //this.physics.add.collider(this.player, oic, (player) => player.fallHole(), null, this);
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
        this.scene.start(room, {life: this.player._life, bullets: this.player._bullets, portal: this.scene.key, powerup: this.player._pup});
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

    // creates the ghost hitbox to make interactions possible
    interact(player_x, player_y, player_hitbox){

        // destroy should be in room update(), but, for some reason, doesnt work properly
        if(this.ghost_hitbox !== undefined) this.ghost_hitbox.destroy();
        this.ghost_hitbox = new GhostHitbox(this, player_x, player_y, player_hitbox, this.player.getDirectionVector());

        // its overlaps are created. cannot be done in room create() because the ghost_hitbox object changes (and using a group doesnt make sense)
        this.portals.addOverlap(this.ghost_hitbox, this.portals.playerOverlap);
        this.npcs.addOverlap(this.ghost_hitbox, this.npcs.playerOverlap);
    }

    defaultPowerUpDisplay(){
        this.deletePreviousPowerUpImage();
        this.powerup_image = this.add.image(32, 556, null);
        this.powerup_image.setVisible(false);
    }

    newPowerUpDisplay(powerup){
        this.deletePreviousPowerUpImage();
        this.powerup_image = this.add.image(32, 556, powerup.sprite);
        this.powerup_image.setAlpha(0.75);
    }

    deletePreviousPowerUpImage(){
        if(this.powerup_image !== undefined){
            this.powerup_image.destroy();
        }
    }

    // to destroy the possible attack room
    destroyTimeAttackRoom(){
        this.time_attack_room = null;
    }

}