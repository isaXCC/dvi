import CONDITIONS from '../conditions.js';
import Room from '../room.js'
import HeartUp from '../../gameobjects/powerups/heartup.js';
import TripleShot from '../../gameobjects/powerups/tripleshot.js';
import SpeedBoost from '../../gameobjects/powerups/speedboost.js';

export default class DF_6 extends Room {

    constructor() {
        super('df_6');
    }

    create() {
        super.generateTiled('df_6'); 
        super.create();
        this.virgil = true;
        this.mfamily = true;
        this.mkid = true;
        this.bunny = true;

        CONDITIONS.DF.VIRGIL = true;
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
        if(CONDITIONS.DF.GENERATE){
            CONDITIONS.DF.GENERATE = false;
            if(CONDITIONS.DF.VIRGIL_G && this.virgil){
                this.virgil = false;
                this.powerups.addElement(new HeartUp(this.player, this, 64*3+32, 64*6+32));
            }
            if(CONDITIONS.DF.MICE_FAMILY_G && this.mfamily){
                this.mfamily = false;
                this.powerups.addElement(new HeartUp(this.player, this, 64*8+32, 64*7+32));
            }
            if(CONDITIONS.DF.MICE_KID_G && this.mkid){
                this.mkid = false;
                this.powerups.addElement(new HeartUp(this.player, this, 64*12+32, 64*5+32));
            }
            if(CONDITIONS.DF.BUNNY_G && this.bunny){
                this.bunny = false;
                this.powerups.addElement(new TripleShot(this.player, this, 64*7+32, 64*3+32));
            }
        }
    }

}