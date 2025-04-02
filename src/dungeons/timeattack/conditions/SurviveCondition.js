export default class SurviveCondition {

    constructor(scene, count){
        this.scene = scene;
        this.count = count;

        this.timer = this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.count--;
            },
            callbackScope: this,
            loop: true
        });
    }

    condition(){
        return this.count === 0;
    }
}