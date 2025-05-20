import Phaser from 'phaser';
import PARAMETERS from '../../parameters';
import SpeedBoost from "../../gameobjects/powerups/speedboost";
import TripleShot from "../../gameobjects/powerups/tripleshot";
import HeartUp from "../../gameobjects/powerups/heartup";
import CONDITIONS from '../conditions';


export default class TimeAttackRoom {
     /**
     * Time Attack Room constructor
     * @param {Phaser.Scene} scene Scene to which the Time Attack belongs
     * @param {number} count Timer count in seconds
     * @param {number} condition Condition which has to be completed in order to surpass the Time Attack
     * @param {number} benefit Benefit granted when the Time Attack is surpassed
     */
    constructor(scene, count, condition, benefit, x, y, room) {

        this.scene = scene;
        this.count = count;
        this.condition = condition;
        this._benefit = benefit;
        this._x = x;
        this._y = y;
        this._room = room;

        // timer text
        this.timerText = this.scene.add.text(PARAMETERS.GAME.WIDTH/2, 10, `${this.count}`, {
            fontSize: '42px',
            fill: '#f0f',
            fontFamily: 'Comic Sans MS',
            stroke: '#000000',  // Set outline color (black)
            strokeThickness: 4  // Set outline thickness
        });

        this.timer = this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.count--;
                switch(this.count % 3){
                    case 0:
                        this.scene.sound.play('clock1', { volume: 6 });
                        break;
                    case 1:
                        this.scene.sound.play('clock2', { volume: 6 });
                        break;
                    case 2:
                        this.scene.sound.play('clock3', { volume: 6 });
                        break;
                }
                this.timerText.setText(this.count);

                // the update could be done here, but it would look less exact (although it would be a little bit more efficient)
            },
            callbackScope: this,
            loop: true
        });
        
    }

    update(){
        // if the count gets to 0, this time attack room is destroyed
        if(this.count === 0) {
            this.scene.sound.play('time_attack_failed');
            this.destroy();
        }

        // if the condition is completed, the benefit is granted
        if(this.condition.condition()) {
            this.benefit();
            this.scene.sound.play('time_attack_succeded');
            this.destroy();
        }
    }
    benefit(){
        switch(this._benefit){
            case 'SpeedBoost':
                this.scene.powerups.addElement(new SpeedBoost(this.scene.player, this.scene, this._x, this._y));
                break;
            case 'TripleShot':
                this.scene.powerups.addElement(new TripleShot(this.scene.player, this.scene, this._x, this._y));
                break;
            case 'HeartUp':
                this.scene.powerups.addElement(new HeartUp(this.scene.player, this.scene, this._x, this._y));
                break;
            default:
                break;
        }
        switch(this._room){
            case 'd1_6':
                CONDITIONS.D1.TIMEATK1 = true;
                break;
            case 'd1_11':
                CONDITIONS.D1.TIMEATK2 = true;
                break;
            default:
                break;
        }
    }

    destroy(){
        this.scene.destroyTimeAttackRoom();
        this.scene.time.removeEvent(this.timer);
        this.timerText.destroy();
    }
}