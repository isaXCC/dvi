import Room from '../room.js'
import Devil from '../../gameobjects/enemies/devil.js';
import Portal from '../../gameobjects/utils/portal.js';
import PARAMETERS from '../../parameters.js';
import CONDITIONS from '../conditions.js';

export default class DF_7 extends Room {

    constructor() {
        super('df_7');
    }

    create() {
        super.generateTiled('df_7'); 
        super.create();
        this.enemies.addElement(new Devil(this, 
            PARAMETERS.GAME.WIDTH - PARAMETERS.GAME.WIDTH/8,
            PARAMETERS.GAME.HEIGHT/2));
        this.time.delayedCall(450, () => {
            if(!CONDITIONS.DF.FIGHT_BOSS){
                this.enterDialogue('df_7');
                CONDITIONS.DF.FIGHT_BOSS = true;
            }
        })
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
        if(CONDITIONS.DF.KILLED_BOSS && !CONDITIONS.DF.PORTAL_END){
            this.portals.addElement(new Portal(this, 
                PARAMETERS.GAME.WIDTH/2 + PARAMETERS.PORTAL.GRID_OFFSET_X, 
                32*4 + PARAMETERS.PORTAL.GRID_OFFSET_Y,
                 'credits_scene'));
            CONDITIONS.DF.PORTAL_END = true;
            this.player.setDepth(500);
        }
    }

}