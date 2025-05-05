import PARAMETERS from "./parameters";

export default class Menu extends Phaser.Scene {
    constructor() {
      super({ key: 'menu' });
    }
  
    create() {
      // Add title text with system font
      this.add.text(PARAMETERS.GAME.WIDTH/2, 20, 'Game Menu', { font: '32px Arial', fill: '#fff' }).setOrigin(0.5);
  
      // Create an array of available scenes
      this.sceneOptions = [ 'df_1', 'df_3', 'df_5', 'df_7', 'd1_mid', 'd1_8', 'd1_11', 'd1_boots', 'd1_pit',
                            'd1_boss', 'd2_1']; // Add your scene names here
      this.selectedIndex = 0;
  
      // Display the options with system font
      this.optionTexts = this.sceneOptions.map((scene, index) => {
        return this.add.text(PARAMETERS.GAME.WIDTH/2, 80 + index * 40, scene, { font: '24px Arial', fill: '#fff' }).setOrigin(0.5);
      });
  
      // Highlight the default selected option
      this.highlightSelection();
  
      // Set up input keys
      this.inputKeys = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        select: Phaser.Input.Keyboard.KeyCodes.ENTER,
        space: Phaser.Input.Keyboard.KeyCodes.SPACE
      });
    }
  
    update() {
      // Handle navigation
      if (Phaser.Input.Keyboard.JustDown(this.inputKeys.up)) {
        if (this.selectedIndex > 0) {
          this.selectedIndex--;
          this.highlightSelection();
        }
      } else if (Phaser.Input.Keyboard.JustDown(this.inputKeys.down)) {
        if (this.selectedIndex < this.sceneOptions.length - 1) {
          this.selectedIndex++;
          this.highlightSelection();
        }
      }
  
      // Handle selection
      if (Phaser.Input.Keyboard.JustDown(this.inputKeys.select) || Phaser.Input.Keyboard.JustDown(this.inputKeys.space)) {
        const selectedScene = this.sceneOptions[this.selectedIndex];
        this.scene.start(selectedScene); // Start the selected scene
      }
    }
  
    // Highlight the selected menu option
    highlightSelection() {
      this.optionTexts.forEach((text, index) => {
        text.setTint(index === this.selectedIndex ? 0xFFFF00 : 0xFFFFFF); // Change color for selected option
      });
    }
  }
  