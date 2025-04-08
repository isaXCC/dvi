export default class AllEnemiesKilledCondition {

    constructor(scene){
        this.scene = scene;
    }

    condition(){
        return this.scene.enemies.isEmpty();
    }
}