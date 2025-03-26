import Phaser from 'phaser';

export default class TimeAttackRoom {
     /**
     * Time Attack Room constructor
     * @param {Phaser.Scene} scene Scene to which the Time Attack belongs
     * @param {number} count Timer count in seconds
     * @param {number} condition Condition which has to be completed in order to surpass the Time Attack
     * @param {number} benefit Benefit granted when the Time Attack is surpassed
     */
    constructor(scene, count, condition, benefit) {

        this.scene = scene;
        this.count = count;
        this.condition = condition;
        this.benefit = benefit;

        // timer text
        this.timerText = this.scene.add.text(420, 250, `${this.count}`, {
            fontSize: '40px',
            fill: '#fff',
            fontFamily: 'Comic Sans MS'
        });

        this.timer = this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.count--;
                this.timerText.setText(this.count);
            },
            callbackScope: this,
            loop: true
        });
        
    }

    update(){
        if(this.condition()) this.scene.player.takeDamage();
    }
}