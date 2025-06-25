import Phaser from 'phaser'
import PARAMETERS from "./parameters.js";
import CONDITIONS from './dungeons/conditions.js';

/**
 * End scene. When the player loses all their lives.
 */
export default class End extends Phaser.Scene {

    /**
     * End constructor
     */
    constructor(reason) {
      super({ key: 'end' });
    }

    create(reason) {
        this._reason = reason;
        this._parameters = PARAMETERS.UI.END_SCENE;

        // death text
        this.create_death_text();

        // death reason text
        this.create_death_reason_text();

        // back to game text
        this.create_back_to_game_text();

        // listener to return to the game  
        this.input.keyboard.on('keydown-P', function (_event) {
            if(CONDITIONS.DF.FIGHT_BOSS){
                this.scene.start('df_boss', {life: PARAMETERS.PLAYER.MAX_LIFE});
            }
            else if(CONDITIONS.DF.INSIDE){
                this.scene.start('df_1', {life: PARAMETERS.PLAYER.MAX_LIFE});
            }
            else if(CONDITIONS.D2.FIGHT_BOSS){
                this.scene.start('d2_boss', {life: PARAMETERS.PLAYER.MAX_LIFE});
            }
            else if(CONDITIONS.D2.INSIDE){
                this.scene.start('d2_1', {life: PARAMETERS.PLAYER.MAX_LIFE});
            }
            else if(CONDITIONS.D1.FIGHT_BOSS){
              this.scene.start('d1_boss', {life: PARAMETERS.PLAYER.MAX_LIFE});
            }
            else{
              this.scene.start('d1_1', {life: PARAMETERS.PLAYER.MAX_LIFE});
            }
        }, this);
    }

    create_death_text(){
        // death text
        let dt = this._parameters.DEATH_TEXT;
        this.add.text(PARAMETERS.GAME.WIDTH/2  + dt.X1_OFFSET, PARAMETERS.GAME.HEIGHT/2 + dt.Y_OFFSET, dt.TEXT1,
            { fontFamily: 'font', fontSize: dt.FONT_SIZE})
            .setOrigin(0.5, 0.5)
            .setAlign('center');

        this.add.text(PARAMETERS.GAME.WIDTH/2 + dt.X2_OFFSET, PARAMETERS.GAME.HEIGHT/2 + dt.Y_OFFSET, dt.TEXT2,
            { fontFamily: 'font', fontSize: dt.FONT_SIZE, color: '#FF0000'})
            .setOrigin(0.5, 0.5)
            .setAlign('center');
    }

    create_death_reason_text(){
        // decides text based on reason
        let text = '';
        let dr = PARAMETERS.SCENES.END.DEATH_REASON;

        switch(this._reason){
            case dr.ANGEL:
                text = 'Should\'ve dodge THAT ANGEL';
                break;
            case dr.OPHANIM:
                text = 'Those big eyes... Attractive! BUT DON\'T TOUCH THEM';
                break;
            case dr.SERAPH:
                text = '... That was stupid. Seraph doesn\'t even move';
                break;
            case dr.SWORD:
                text = 'SPLITTED IN TWO, PERFECT FOR A MEAL :)';
                break;
            case dr.FIRE:
                text = 'THIS IS NOT FINE ANYMORE, YOUR TAIL\'S ON FIRE';
                break;
            case dr.FIREBALL:
                text = 'Developers don\'t recommend touching balls on fire';
                break;
            case dr.HOLE:
                text = 'wwuuuuuaaaaaaAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH';
                break;
            case dr.MOVING_FIRE:
                text = 'Now is proved! Fire DOES move faster than a cat! Thank you!!!' 
                break;
            case dr.HOARDER:
                text = 'HAHAHAHAHAHA!! Killing you this time felt better muehehe'; 
                break;
            case dr.RICHMAN:
                text = 'ROBOTO! BUY SHARES IN WHISKAS!';
                break;
        }

        // text is added
        this.add.text(PARAMETERS.GAME.WIDTH/2, PARAMETERS.GAME.HEIGHT/2, text,
            { fontFamily: 'font', fontSize: this._parameters.REASON_TEXT.FONT_SIZE})
            .setOrigin(0.5, 0.5)
            .setAlign('center');
    }

    create_back_to_game_text(){
        // text is added
        let btg = this._parameters.BACK_TO_GAME_TEXT;
        this.add.text(PARAMETERS.GAME.WIDTH/2, PARAMETERS.GAME.HEIGHT/2 + btg.Y_OFFSET, 'Press \'P\' to come back to the overworld.',
          { fontFamily: 'font', fontSize: btg.FONTSIZE})
          .setOrigin(0.5, 0.5)
          .setAlign('center');
    }
}