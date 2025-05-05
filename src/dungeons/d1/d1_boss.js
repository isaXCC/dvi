import Room from '../room.js'
import Hoarder from '../../gameobjects/enemies/hoarder.js';
import PARAMETERS from '../../parameters.js';
import CONDITIONS from '../conditions.js';
import HeartUp from '../../gameobjects/powerups/heartup.js';
import Portal from '../../gameobjects/utils/portal.js';

export default class D1_BOSS extends Room {

    constructor() {
        super('d1_boss');
    }

    create() {
        super.generateTiled('d1_boss'); 
        super.create();
        this.enemies.addElement(new Hoarder(this, 
            PARAMETERS.GAME.WIDTH - PARAMETERS.GAME.WIDTH/8,
            PARAMETERS.GAME.HEIGHT/2));
        this.time.delayedCall(450, () => {
            if(!CONDITIONS.D1.FIGHT_BOSS){
                this.enterDialogue('d1_boss');
                CONDITIONS.D1.FIGHT_BOSS = true;
            }
        })
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
        if(CONDITIONS.D1.KILLED_BOSS && !CONDITIONS.D1.PORTAL_D2){
            this.portals.addElement(new Portal(this, 
                PARAMETERS.GAME.WIDTH/2 + PARAMETERS.PORTAL.GRID_OFFSET_X, 
                32*4 + PARAMETERS.PORTAL.GRID_OFFSET_Y,
                 'd2_1'));
            this.powerups.addElement(new HeartUp(this.player, this, PARAMETERS.GAME.WIDTH/2, PARAMETERS.GAME.HEIGHT/2));
            CONDITIONS.D1.PORTAL_D2 = true;
            // Make sure the player is in front of portal
            this.player.setDepth(500);
        }
    }

}