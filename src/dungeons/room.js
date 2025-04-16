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
import CONDITIONS from './conditions.js';
import MovingFireGroup from '../gameobjects/groups/MovingFireGroup.js';
import MovingFire from '../gameobjects/utils/movingfire.js';
import DialogueManager from './dialogues/DialogueManager.js';
import PlayerHUD from '../utils/ui/playerHUD.js';

export default class Room extends Phaser.Scene {

    constructor(key) {
        super({ key: key });

        // information that will be passed between rooms
        this.player_state;
        this.nextLine = "Lalala ma lov"; // PROTOTYPE for Hito 1
        this.powerup_image;
        this.key = key;
    }

    init(player_state) {
        this.dialogue_manager = new DialogueManager(this);
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
        this.movingFires.addOverlap(this.player);
        //maybe?
        //this.holes.addCollision(this.enemies); 

        // MUSIC SECTION
        // Background music is always playing
        if (!this.sound.get('backgroundMusic')) {
            this.music = this.sound.add('backgroundMusic', { loop: true, volume: 0.2 });
            this.music.play();
        } else {
            this.music = this.sound.get('backgroundMusic');
            if(!this.music.isPlaying) this.music.play();
        }

        // adds player info to the HUD
        this.createPlayerHUD();

        // Blocking context menu to open
        window.addEventListener('contextmenu', (event) => event.preventDefault());
    }

    update(){
        this.bullets.update();
        this.enemies.update();
        this.portals.update();
        this.npcs.update();
        this.fires.update();
        this.movingFires.update();
        this.fires.update();
        
        if(this.player._isAlive)
            this.player.update();    
        else {
            this.music.stop();
            this.gameOver();
        }

        // Update player info display
        this.updatePlayerHUD();
        
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
        this.movingFires = new MovingFireGroup();

        // Tiled creation of map, tiles and different layers
        var map = this.make.tilemap({key: key});
        var tiles = map.addTilesetImage('room_tileset', 'room_tiles');
        map.createLayer('background', tiles, 0, 0);
        map.createLayer('onn', tiles, 0, 0);
        var onc = map.createLayer('onc', tiles, 0, 0);
        onc.setCollisionByExclusion([-1], true);
        var oic = map.createLayer('oic', tiles, 0, 0);
        oic.setCollisionByExclusion([-1], true);
        
        // Tiled creation of each object
        for (const object of map.getObjectLayer('portals').objects) {
            if (object.type === 'Portal') { 
                this.portals.addElement(new Portal(this, 
                    object.x + PARAMETERS.PORTAL.GRID_OFFSET_X, 
                    object.y + PARAMETERS.PORTAL.GRID_OFFSET_Y,
                     object.name));
                if(object.name === this.player_state.portal){
                    console.log('NEW POS');
                    this.player_state.x = object.x;
                    this.player_state.y = object.y;
                }
            }
        }
        for (const object of map.getObjectLayer('holes').objects) {
            // GRID_OFFSET_Y necesary to make Tiled more managable
            this.holes.addElement(new Hole(this, object.x, object.y+PARAMETERS.HOLE.GRID_OFFSET_Y));
        }
        for (const object of map.getObjectLayer('fires').objects) {
            // GRID_OFFSET_Y necesary to make Tiled more managable
            this.fires.addElement(new Fire(this, 
                object.x + PARAMETERS.FIRE.GRID_OFFSET_X, 
                object.y + PARAMETERS.FIRE.GRID_OFFSET_Y));
        }
        for (const object of map.getObjectLayer('moving_fires').objects) {
            const c = {};
            if (object.properties) {
                object.properties.forEach(p => {
                    c[p.name] = p.value;
                });
            }
            // GRID_OFFSET_Y necesary to make Tiled more managable
            this.movingFires.addElement(new MovingFire(this, object.x + PARAMETERS.MOVING_FIRE.GRID_OFFSET_X, object.y, c.length, c.movement, c.fill, c.starts));
        }
        for (const object of map.getObjectLayer('enemies').objects) {
            if (object.type === 'Angel') {
                this.enemies.addElement(new Angel(this, object.x, object.y))
                console.log("X: " +object.x);
                console.log("Y: " +object.y);
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
                this.npcs.addElement(new NPC(this, object.x + PARAMETERS.NPC.GRID_OFFSET_X,
                                                 object.y + PARAMETERS.NPC.GRID_OFFSET_Y, object.name));
            }
        }
        for (const object of map.getObjectLayer('player').objects) {
            if (object.type === 'Player') { 
                this.player = new Player(this, object.x, object.y);
                if(this.player_state !== undefined){
                    if(this.player_state.max_life !== undefined){
                        console.log('Set max_life ' + this.player_state.life);
                        this.player._max_life = this.player_state.max_life;
                    }
                    if(this.player_state.life !== undefined){
                        console.log('Set life ' + this.player_state.life);
                        this.player._life = this.player_state.life;
                    }
                    if(this.player_state.max_ammo !== undefined){
                        console.log('Set max ammo ' + this.player_state.max_ammo);
                        this.player._max_ammo = this.player_state.max_ammo;
                    }
                    if(this.player_state.bullets !== undefined){
                        console.log('Set bullets ' + this.player_state.bullets);
                        this.player._bullets = this.player_state.bullets;
                    }
                    if(this.player_state.x !== undefined){
                        this.player.x = this.player_state.x + 32;
                    }
                    if(this.player_state.y !== undefined){
                        this.player.y = this.player_state.y - 48;
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
                    //this.player.initFrame();
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
        // OIC is useful for cage logic in d1_mid
        this.physics.add.collider(this.player, oic, null, null, this);
    }

    // ROOM STATE LOGIC AND METHOD

    enterDialogue(nameNPC){
        this.dialogue_manager.enterDialogue(nameNPC, this.key);
        this.input.enabled = false;
    }

    nextRoom(room){
        this.scene.start(room, {max_life: this.player._max_life, life: this.player._life,
             max_ammo: this.player._max_ammo, bullets: this.player._bullets, 
             portal: this.scene.key, powerup: this.player._pup});
    }

    spawnHole(x, y){
        this.holes.addElement(new Hole(this, x, y, true));
        this.player.setDepth(500);
    }

    gameOver(){
        this.scene.start('end');
    }

    menu(){
        this.scene.start('menu');
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

    newEnemyForwardBullet(origX, origY){
        this.bullets.addElement(new Bullet(this, origX, origY, this.player.x, origY, true));
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
    
    newPowerUpDisplay(powerup) {
        this.deletePreviousPowerUpImage();
        // Add the power-up image on top
        this.powerup_image = this.add.image(PARAMETERS.PLAYER_HUD.POWERUP_JUMPSCARE_CIRCLE_PROPERTIES.PUP_X, PARAMETERS.PLAYER_HUD.POWERUP_JUMPSCARE_CIRCLE_PROPERTIES.PUP_Y, powerup.sprite);
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

    // DISPLAY METHODS

    // adds player info to the HUD
    createPlayerHUD(){
        // creates player HUD
        this.playerHUD = new PlayerHUD(this);
    }

    updatePlayerHUD(){
        // updates player HUD
        this.playerHUD.update();

        // blocking context menu to open
        window.addEventListener('contextmenu', (event) => event.preventDefault());
    }

}