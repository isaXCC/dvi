import Enemy from "./enemy";

export default class Seraph extends Enemy{
    
    constructor(scene, x, y) {
        super(scene, x, y, 'seraph');

        this._life = 6;
        this._speed = 75;
    }

    update(){
        if(this.active){
            super.update();
        }
    }

}