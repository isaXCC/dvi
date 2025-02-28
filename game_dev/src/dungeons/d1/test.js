import Player from '../../gameobjects/player/player.js';
import Angel from '../../gameobjects/enemies/angel.js';
import Ophanim from '../../gameobjects/enemies/ophanim.js';
import Seraph from '../../gameobjects/enemies/seraph.js';
import Portal from '../../gameobjects/utils/portal.js';
import Bullet from '../../gameobjects/utils/bullet.js'
import Room from '../room.js'
import Phaser from 'phaser';

export default class test extends Room {

    constructor() {
        super('test');
    }

    create() {
        // Tiled creation of map, tiles and different layers
        var map = this.make.tilemap({key: 'test'});
        var tiles = map.addTilesetImage('room_tileset', 'room_tiles');
        map.createLayer('background', tiles, 0, 0);
        var onc = map.createLayer('onc', tiles, 0, 0);
        onc.setCollisionByExclusion([-1], true);
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
         
        super.create();

        // Play the music
        this.music = this.sound.add('backgroundMusic', { loop: true, volume: 0.2 });
        this.music.play();
    }

    init(pl) {
        //this.player._life = pl;
    }

    update(){
        super.update();
    }

}