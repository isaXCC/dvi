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
        this.timerText = this.scene.add.text(130, 15, `${this.count}`, {
            fontSize: '40px',
            fill: '#f0f',
            fontFamily: 'Comic Sans MS'
        });

        this.timer = this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.count--;
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
            this.benefit.benefit();
            this.scene.sound.play('time_attack_succeded');
            this.destroy();
        }
    }

    destroy(){
        this.scene.destroyTimeAttackRoom();
        this.scene.time.removeEvent(this.timer);
        this.timerText.destroy();
    }
}