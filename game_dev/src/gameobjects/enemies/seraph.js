import Enemy from "./enemy";

export default class Seraph extends Enemy{
    
    constructor(scene, x, y) {
        super(scene, x, y, 'seraph');

        this._life = 3;
        this._speed = 75;
    }

}