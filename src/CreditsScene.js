import PARAMETERS from "./parameters";

export default class CreditsScene extends Phaser.Scene {
    constructor() { 
        super('credits_scene'); 
    }

    create() {
        // credit content
        const creditsText = `
CREDITS
————————————————————————————————————


GAME DIRECTION
——————————————————

Game Directors
—————————
Isabel Xian Cardoso Cerón
Juan Andrés Hibjan Cardona
Daniel Jiménez Caballero
Leonardo Prado de Souza

Creative Directors
—————————
Isabel Xian Cardoso Cerón
Leonardo Prado de Souza

Technical Directors
—————————
Juan Andrés Hibjan Cardona
Daniel Jiménez Caballero
Leonardo Prado de Souza

Desing Director
—————————
Leonardo Prado de Souza


PRODUCTION
——————————————————

Executive Producers
—————————
Isabel Xian Cardoso Cerón
Juan Andrés Hibjan Cardona
Daniel Jiménez Caballero
Leonardo Prado de Souza

Producers
—————————
Isabel Xian Cardoso Cerón
Juan Andrés Hibjan Cardona
Daniel Jiménez Caballero
Leonardo Prado de Souza

Project Managers
—————————
Isabel Xian Cardoso Cerón
Juan Andrés Hibjan Cardona
Daniel Jiménez Caballero
Leonardo Prado de Souza

Development Coordinators
—————————
Isabel Xian Cardoso Cerón
Juan Andrés Hibjan Cardona
Daniel Jiménez Caballero
Leonardo Prado de Souza


GAME DESIGN
——————————————————

Lead Game Designers
—————————
Juan Andrés Hibjan Cardona
Daniel Jiménez Caballero
Leonardo Prado de Souza

Systems Designers
—————————
Juan Andrés Hibjan Cardona
Daniel Jiménez Caballero
Leonardo Prado de Souza

Level Designers
—————————
Juan Andrés Hibjan Cardona
Daniel Jiménez Caballero
Leonardo Prado de Souza

Combat Designers
—————————
Juan Andrés Hibjan Cardona
Leonardo Prado de Souza

UX Designer
—————————
Daniel Jiménez Caballero


PROGRAMMING
——————————————————

Lead Programmers
—————————
Juan Andrés Hibjan Cardona
Daniel Jiménez Caballero
Leonardo Prado de Souza

Gameplay Programmers
—————————
Juan Andrés Hibjan Cardona
Daniel Jiménez Caballero
Leonardo Prado de Souza

AI Programmers
—————————
Juan Andrés Hibjan Cardona
Daniel Jiménez Caballero
Leonardo Prado de Souza

Physics Programmers
—————————
Juan Andrés Hibjan Cardona
Daniel Jiménez Caballero
Leonardo Prado de Souza

UI Programmers
—————————
Isabel Xian Cardoso Cerón
Daniel Jiménez Caballero

Optimization Engineers
—————————
Juan Andrés Hibjan Cardona
Daniel Jiménez Caballero
Leonardo Prado de Souza


ART
——————————————————

Art Director
—————————
Isabel Xian Cardoso Cerón

Lead Artist
—————————
Isabel Xian Cardoso Cerón

Concept Artist
—————————
Isabel Xian Cardoso Cerón

Character Artist
—————————
Isabel Xian Cardoso Cerón

Environment Artist
—————————
Isabel Xian Cardoso Cerón

Texture Artist
—————————
Isabel Xian Cardoso Cerón

Animator
—————————
Isabel Xian Cardoso Cerón

Technical Artist
—————————
Isabel Xian Cardoso Cerón

Lighting Artist
—————————
Isabel Xian Cardoso Cerón

UI/UX Artist
—————————
Isabel Xian Cardoso Cerón


AUDIO
——————————————————

Audio Directors
—————————
Juan Andrés Hibjan Cardona
Leonardo Prado de Souza

Sound Designers
—————————
Juan Andrés Hibjan Cardona
Daniel Jiménez Caballero
Leonardo Prado de Souza

Dialogue Editor
—————————
Juan Andrés Hibjan Cardona

Audio Programmers
—————————
Juan Andrés Hibjan Cardona
Daniel Jiménez Caballero
Leonardo Prado de Souza


NARRATIVE
——————————————————

Narrative Directors
—————————
Isabel Xian Cardoso Cerón
Juan Andrés Hibjan Cardona
Daniel Jiménez Caballero
Leonardo Prado de Souza

Lead Writers
—————————
Isabel Xian Cardoso Cerón
Juan Andrés Hibjan Cardona
Daniel Jiménez Caballero
Leonardo Prado de Souza


SPECIAL THANKS
————————————————————————————————————
Our teachers
Our beta testers
Our classmates
Our families
That random guy I asked once for directions
The cafeteria bartender
World-wide cats


© 2025 Phat Boi Games
        `;

        // multiline text
        const textObject = this.add.text(PARAMETERS.GAME.WIDTH/2, PARAMETERS.GAME.HEIGHT, creditsText.trim(), {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            align: 'center',
            lineSpacing: 10,
        }).setOrigin(0.5, 0);

        // scroll velocity
        this.tweens.add({
            targets: textObject,
            y: -textObject.height,
            ease: 'Linear',
            duration: 60000
        });

        this.time.delayedCall(62000, () => this.endCredits());
    }

    endCredits() {
        this.sound.stopAll();
        this.scene.start('start_menu'); // return to start screen
    }
}