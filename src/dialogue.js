import PARAMETERS from "./parameters";

export default class Dialogue extends Phaser.Scene{
    // Only works in the first room for some reason
    constructor() {
        super({ key: 'dialogue' });

        // Box dimensions (covering bottom 33%)
        this.boxWidth = PARAMETERS.GAME.WIDTH - PARAMETERS.DIALOGUE.SCALE_X;
        this.boxHeight = PARAMETERS.GAME.HEIGHT * PARAMETERS.DIALOGUE.SCALE_Y;
        this.boxX = PARAMETERS.DIALOGUE.OFFSET_X;
        this.boxY = PARAMETERS.GAME.HEIGHT - this.boxHeight - PARAMETERS.DIALOGUE.OFFSET_Y;
        this.dialogueText = null;
        this.dialogueBox = null;
        this.parentScene = null;
        this.line = "Taka taka MABOI";
        console.log('Constructor Dialogue');
    }
    
    init(info) {
        console.log('Init Dialogue, parent key:' + info.parent.key);
        console.log('Init Dialogue, next:' + info.next);
        this.parentKey = info.parent.key;
        this.line = info.next;
    }
    
    create(){
        this.parentScene = this.scene.get(this.parentKey);
        // Creates the blackbox of dialogue
        this.createBox();
        // Creates the text used in dialogue
        this.createText();

        // If the player clicks, we get out of the dialogue
        this.input.on('pointerdown', () => {
            this.getOut();
        });
    }
    
    update(){
        
    }

    getOut(){
        console.log('Dialogue click');
        this.parentScene.input.enabled = true;
        this.dialogueText.destroy();
        this.dialogueBox.destroy();
        this.scene.resume(this.parentScene);
        this.scene.stop('dialogue');
    }

    createBox() {
        console.log('Ping createBox');
        // Create a graphics object for the dialogue box
        this.dialogueBox = this.parentScene.add.graphics();

        // Shadow effect (soft white edges)
        this.dialogueBox.fillStyle(0xffffff, 0.7);
        this.dialogueBox.fillRoundedRect(this.boxX - 5, this.boxY - 5, this.boxWidth + 10, this.boxHeight + 10, 10);

        // Main black box
        this.dialogueBox.fillStyle(0x000000, 0.9);
        this.dialogueBox.fillRoundedRect(this.boxX, this.boxY, this.boxWidth, this.boxHeight, 10);
    }

    createText(){
        console.log('Ping createText');
        this.dialogueText = this.parentScene.add.text(
            this.boxX + 20, 
            this.boxY + 20, 
            this.getNextLine(),
            {
                fontSize: "20px",
                fontFamily: "Comic Sans MS",
                color: "#ffffff",
                wordWrap: { width: this.boxWidth - 40, useAdvancedWrap: true }
            }
        );

    }

    getNextLine(){
        return this.line;
    }
}