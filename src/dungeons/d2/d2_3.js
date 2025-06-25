import Room from '../room.js'
import CONDITIONS from '../conditions.js';
import BigShot from '../../gameobjects/powerups/bigshot.js';

export default class D2_3 extends Room {

    constructor() {
        super('d2_3');
        this.bunny = true;
    }

    create() {
        super.generateTiled('d2_3'); 
        super.create();

        CONDITIONS.D2.BUNNY_2 = true;
        this.events.on('shutdown', () => {
            console.log('Scene shut down');
            CONDITIONS.D2.BUNNY_2 = false;
        });

        if(!CONDITIONS.D2.STRONGBOX_OPEN){
            this.generateStrongBoxBlock();
        }

        if(CONDITIONS.D2.D2_4_KILLED && CONDITIONS.D2.D2_7_KILLED &&
            CONDITIONS.D2.D2_6_KILLED && CONDITIONS.D2.D2_10_KILLED){
            CONDITIONS.D2.ALL_KILLED = true;
        }

    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
        this.npcs;
        if(CONDITIONS.D2.STRONGBOX_OPEN){
           this.destroyStrongBoxBlock();
        }

        if(CONDITIONS.D2.STRONGBOX_OPEN && this.bunny){
            this.bunny=false;
            this.powerups.addElement(new BowlingBall(this.player, this.player.scene, 384, 384));
        }
    }

}