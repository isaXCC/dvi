import Enemy from "./enemy";

export default class Angel extends Enemy{
    
    constructor(scene, x, y) {
        super(scene, x, y, 'angel');

        this._life = 6;
        this._speed = 125;
    }

    update(){
        if(this.active){
            super.update();
            this.follow_player();
        }
    }

}