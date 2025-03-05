import Enemy from "./enemy";

export default class Seraph extends Enemy {
    
    constructor(scene, x, y) {
        super(scene, x, y, 'seraph');

        this._max_life = 3;
        this._life = 3;
        this._speed = 75;

        this._can_heal = true;
        this._heal_amount = 1;
        this._heal_cooldown = 5;
    }

    update(){
        super.update();
        if(this._can_heal){
            this.healEnemies();
        }
        
    }

    healEnemies(){
        console.log('Seraph just gave +' + this._heal_amount + 'life to the enemies...')
        this.scene.enemies.getHealed(this._heal_amount);
        this._can_heal = false;
        this.scene.time.delayedCall(1000*this._heal_cooldown, () => this._can_heal = true);
    }

}