import Portal from "./portal"

export default class StrongBox extends Portal {

    constructor(scene, x, y, nextRoom) {
        super(scene, x, y, nextRoom);
        this.setTexture("strongBox_open");
    }

}