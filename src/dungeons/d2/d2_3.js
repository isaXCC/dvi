import Room from '../room.js'
import HeartUp from '../../gameobjects/powerups/heartup.js';
import TripleShot from '../../gameobjects/powerups/tripleshot.js';
import SpeedBoost from '../../gameobjects/powerups/speedboost.js';
import AmmoUp from '../../gameobjects/powerups/ammoup.js';

export default class D2_3 extends Room {

    constructor() {
        super('d2_3');
    }

    create() {
        super.generateTiled('d2_3'); 
        super.create();
        this.powerups.addElement(new HeartUp(this.player, this, 64*2 , 64*3));
        //this.powerups.addElement(new AmmoUp(this.player, this, 64*14 , 64*3));
        this.powerups.addElement(new TripleShot(this.player, this, 64*2 , 64*5));
        this.powerups.addElement(new SpeedBoost(this.player, this, 64*2 , 64*7));
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}