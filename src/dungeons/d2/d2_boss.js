import CONDITIONS from '../conditions.js';
import PARAMETERS from '../../parameters.js';
import HeartUp from '../../gameobjects/powerups/heartup.js';
import Portal from '../../gameobjects/utils/portal.js';
import RichMan from '../../gameobjects/enemies/richman.js';
import Room from '../room.js'

export default class D2_BOSS extends Room {

    constructor() {
        super('d2_boss');
    }

    create() {
        super.generateTiled('d2_boss'); 
        super.create();
        this.enemies.addElement(new RichMan(this, 
            PARAMETERS.GAME.WIDTH - PARAMETERS.GAME.WIDTH/8,
            PARAMETERS.GAME.HEIGHT/2));
        this.time.delayedCall(450, () => {
            if(!CONDITIONS.D2.FIGHT_BOSS){
                this.enterDialogue('d2_boss');
                CONDITIONS.D2.FIGHT_BOSS = true;
            }
        })
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
        if(CONDITIONS.D2.KILLED_BOSS && !CONDITIONS.D2.PORTAL_D3){
            this.portals.addElement(new Portal(this, 
                PARAMETERS.GAME.WIDTH/2 + PARAMETERS.PORTAL.GRID_OFFSET_X, 
                32*4 + PARAMETERS.PORTAL.GRID_OFFSET_Y,
                 'df_1'));
            this.powerups.addElement(new HeartUp(this.player, this, PARAMETERS.GAME.WIDTH/2, PARAMETERS.GAME.HEIGHT/2));
            CONDITIONS.D2.PORTAL_D3 = true;
            this.player.setDepth(500);
        }
    }
}