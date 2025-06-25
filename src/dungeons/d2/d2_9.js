import Room from '../room.js'
import DummyAngel from '../../gameobjects/enemies/dummy_angel.js';
import Angel from '../../gameobjects/enemies/angel.js';
import Seraph from '../../gameobjects/enemies/seraph.js';
import Ophanim from '../../gameobjects/enemies/ophanim.js';
import Sword from '../../gameobjects/enemies/sword.js';
import BigShot from '../../gameobjects/powerups/bigshot.js';
import IceCube from '../../gameobjects/powerups/icecube.js';
import BowlingBall from '../../gameobjects/powerups/bowlingball.js';
import Chili from '../../gameobjects/powerups/chili.js';

export default class D2_9 extends Room {

    constructor() {
        super('d2_9');
    }

    create() {
        super.generateTiled('d2_9'); 
        super.create();

        this.powerups.addElement(new BigShot(this.player, this.player.scene, 300, 300));
        this.powerups.addElement(new IceCube(this.player, this.player.scene, 300, 360));
        this.enemies.addElement(new DummyAngel(this, 225, 160));
        this.enemies.addElement(new Sword(this, 825, 160));
        //this.enemies.addElement(new Ophanim(this, 825, 400));
    }

    init(player_state) {
        super.init(player_state);
    } 

    update(){
        super.update();
    }

}