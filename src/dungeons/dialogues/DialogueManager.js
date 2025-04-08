import conditions from '../conditions.js';

export default class DialogueManager {
    constructor(scene) {
        this.RoomScene = scene;
        this.current_dungeon = null;
        this.info = {}
    }

    async enterDialogue(nameNPC, key){
        await this.loadData(key);
        let path = this.decidePath(nameNPC);
        this.processData(nameNPC, path);
    }

    decidePath(nameNPC){
        let canMove = false;

        let next = this.info[nameNPC].last + 1;
        let cond = this.info[nameNPC].paths[next].cond.split(" ");
        if(cond[0] === 'base'){
            canMove = true;
        }
        else if (cond[0] === 'count'){
            let num =  Number(cond[2]);
            switch(cond[1]){
                case '>':
                    canMove = this.info[nameNPC].count > num;
                    break;
                case '>=':
                    canMove = this.info[nameNPC].count >= num;
                    break;
                case '<':
                    canMove = this.info[nameNPC].count < num;
                    break;
                case '<=':
                    canMove = this.info[nameNPC].count <= num;
                    break;
                case '!=':
                    canMove = this.info[nameNPC].count != num;
                    break;
                case '==':
                    canMove = this.info[nameNPC].count == num;
                    break;
            }
        }
        else{
            let dungeon = this.current_dungeon.toUpperCase();
            canMove = conditions[dungeon][cond[0]];
        }

        return canMove ? next : next - 1;
    }

    processData(nameNPC, path){
        this.info[nameNPC].last = path;

        this.RoomScene.scene.pause();

        let currentIndex = 0;

        const launchNext = () => {
            if (currentIndex >= this.info[nameNPC].paths[path].contents.length) {
                this.RoomScene.scene.resume(); // Resume room when done
                return;
            }

            // Launch dialogue and wait for it to finish
            this.RoomScene.scene.launch('dialogue', {
                parent: this.RoomScene,
                next: this.info[nameNPC].paths[path].contents[currentIndex].texto,
                choices: this.info[nameNPC].paths[path].contents[currentIndex].options || [],
                onComplete: (choice) => {
                    console.log("chose option " + choice)
                    currentIndex++;
                    launchNext(); // Launch next line
                }
            });
        };

        launchNext();
    }

    loadData(key){
        return new Promise((resolve, reject) => {
            let dungeon = key.slice(0, 2);
            if(this.current_dungeon !== dungeon){
                this.current_dungeon = dungeon;
                fetch('dvi/src/dungeons/dialogues/'+this.current_dungeon+'.csv')
                .then(res => res.text())
                .then(data => {
                    let i = 0;
                    let char = data[i];
                    let fields = [];
                    //LOAD FIELDS
                    while(char !== '\n'){
                        let str = '';
                        while(char !== ','){
                            if(char.charCodeAt(0) > 41)
                                str += char;
                            i++;
                            char = data[i];
                            if(char.charCodeAt(0) === 10)
                                break;
                        }
                        fields.push(str);
                        if(char === '\n')
                            break;
                        i++;
                        char = data[i];
                    }
                    i++;
                    char = data[i]
                    let current_npc;
                    let current_path;
                    let content = {};
                    let num_paths = 0;
                    let n;
                    //LOADS CONTENTS
                    //while(i < data.length){

                    //}
                    while(i < data.length){
                        for(n = 0; n < fields.length; n++){
                            let str = '';
                            while(char !== ','){
                                // double quotes
                                if(char.charCodeAt(0) === 34){
                                    i += 3;
                                    char = data[i];
                                    //colect everything except double quotes
                                    while(char.charCodeAt(0) !== 34){
                                        str += char;
                                        i++;
                                        char = data[i];
                                    }
                                    i += 2;
                                    char = data[i];
                                }
                                // anything but /r
                                else if(char.charCodeAt(0) != 13){
                                    str += char;
                                }
                                
                                i++;
                                char = data[i];

                                if(char.charCodeAt(0) === 10)
                                    break;
                            }
                            if(str !== ''){
                                switch(n){
                                    case 0:
                                        num_paths = 0;
                                        current_npc = str;
                                        this.info[str] = {last: -1, count: 0, paths:[]};
                                        break;
                                    case 1:
                                        current_path = num_paths;
                                        num_paths++;
                                        this.info[current_npc].paths.push({cond: str, contents: []});
                                        break;
                                    case 2:
                                        content['cmd'] = str;
                                        break;
                                    case 3:
                                        break;
                                    case 4:
                                        break;
                                    case 5:
                                        content['texto'] = str;
                                        break;
                                    case 6:
                                        content['options'] = []
                                        content['options'].push(str);
                                        break;
                                    case 7:
                                        content['options'].push(str);
                                        break;
                                    case 8:
                                        content['options'].push(str);
                                        break;
                                    case 9:
                                        break;
                                    default:
                                        content['options'].push(str);
                                        break;
                                }
                            }
        
                            if(char === '\n'){
                                this.info[current_npc].paths[current_path].contents.push(content);
                                content = {};
                                i++;
                                char = data[i];
                                break;
                            }
                                
                            i++;
                            char = data[i];
                        }
                    }
                    resolve();
                })
                .catch(err => reject(err));
            }
            else{
                resolve();
            }
        });
    }
}