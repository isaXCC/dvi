import SpeedBoost from "../../../gameobjects/powerups/speedboost";

export default class SpeedBoostPowerUpBenefit {

    constructor(scene){
        this.scene = scene;
    }

    benefit(){
        return this.scene.player.pickPowerUp(new SpeedBoost(this.scene.player, this.scene, 0, 0));
    }
}