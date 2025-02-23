import Enemy from "./enemy";

export default class Ophanim extends Enemy{
    
    constructor(scene, x, y) {
        super(scene, x, y, 'ophanim');

        this._life = 6;
        this._speed = 150;
    }

    update(){
        if(this.active){
            super.update();
            this.follow_player();
        }
    }

}