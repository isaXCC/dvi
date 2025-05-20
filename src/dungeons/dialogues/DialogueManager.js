import CONDITIONS from '../conditions.js';

export default class DialogueManager {
    constructor(scene, info) {
        this.RoomScene = scene;
        if(info !== undefined){
            this.current_dungeon = info.current_dungeon;
            this.info = info.info;
        }
        else{
            this.current_dungeon = null;
            this.info = {}
        }
    }

    async enterDialogue(nameNPC, key){
        await this.loadData(key);
        let path = this.decidePath(nameNPC);
        this.processData(nameNPC, path);
    }

    getInfo(){
        return {info: this.info, current_dungeon: this.current_dungeon};
    }

    decidePath(nameNPC){
        
        let next = this.info[nameNPC].last + 1;
        let canMove = true;

        while(canMove && next < this.info[nameNPC].paths.length){
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
                canMove = CONDITIONS[dungeon][cond[0]];
            }
            if(canMove)
                next++;
            else
                next--;
        }

        if(next == this.info[nameNPC].paths.length)
            next--;

        return next;
    }

    processData(nameNPC, path){
        this.info[nameNPC].last = path;

        this.RoomScene.scene.pause();

        let currentIndex = 0;
        let next = -1;
        let check_point = -1;
        let choices_set = [];
        let passed_check;
        let should_store = false;

        const launchNext = () => {
            if (currentIndex >= this.info[nameNPC].paths[path].contents.length) {
                this.RoomScene.scene.resume(); // Resume room when done
                return;
            }

            let cmd = [];
            if('cmd' in this.info[nameNPC].paths[path].contents[currentIndex]){
                cmd = this.info[nameNPC].paths[path].contents[currentIndex].cmd.split("-");
            }
                
            switch(cmd[0]){
                case 'count':
                    switch(cmd[1]){
                        case 'plus':
                            this.info[nameNPC].count++;
                            break;
                        case 'minus':
                            this.info[nameNPC].count--;
                            break;
                        default:
                            this.info[nameNPC].count = Number(cmd[1]);
                            break;
                    }
                    break;
                case 'set':
                    check_point = currentIndex;
                    should_store = true;
                    break;
                case 'check':
                    let i = 0;
                    let different = false;
                    while(i < cmd[1].length && !different){
                        if(cmd[1][i] !== 'x'){
                            if(cmd[1][i] != choices_set[i]){
                                different = true;
                            }
                        }
                        i++;
                    }

                    choices_set = []
                    passed_check = !different;
                    
                    break;
                case 'toggle':
                    let dungeon = this.current_dungeon.toUpperCase();
                    CONDITIONS[dungeon][cmd[1]] = !CONDITIONS[dungeon][cmd[1]];
                    break;
            }

            // Launch dialogue and wait for it to finish
            this.RoomScene.scene.launch('dialogue', {
                parent: this.RoomScene,
                next: this.info[nameNPC].paths[path].contents[currentIndex].texto,
                choices: this.info[nameNPC].paths[path].contents[currentIndex].options || [],
                onComplete: (choice) => {
                    if(choice != undefined){
                        if(should_store){
                            choices_set.push(choice + 1);
                        }
                    }
                        

                    if(next !== -1){
                        currentIndex = next;
                        next = -1;
                    }
                    else{
                        if(cmd[0] === 'check'){
                            if(passed_check){
                                currentIndex = currentIndex + 2;
                                next = -1;
                            }
                            else{
                                currentIndex = currentIndex + 1;
                                next = check_point;
                            }
                        }
                        else{
                            if(choice != undefined){
                                let l = this.info[nameNPC].paths[path].contents[currentIndex].options.length;
                                currentIndex = currentIndex + 1 + choice;
                                next = currentIndex + l - choice;
                            }
                            else{
                                currentIndex = currentIndex + 1;
                                next = -1;
                            }
                        }
                    }

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
                console.log("LOADING CSV FOR DUNGEON: " + this.current_dungeon)
                //FOR LOCALHOST
                //fetch('dvi/'+this.current_dungeon+'.csv')
                //FOR GITHUB PAGES
                fetch('./' + this.current_dungeon + '.csv')
                .then(res => res.text())
                .then(data => {
                    let i = 0;
                    let char = data[i];
                    let fields = [];
                    //LOAD FIELDS
                    while(char.charCodeAt(0) !== 10){
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
                        if(char.charCodeAt(0) === 10)
                            break;
                        else{
                            i++;
                            char = data[i];
                        }
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
                                else if(char.charCodeAt(0) !== 13 && char.charCodeAt(0) !== 10){
                                    str += char;
                                }
                                
                                if(char.charCodeAt(0) === 10)
                                    break;
                                i++;
                                char = data[i];
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
                                        content['options'].push(str);
                                        break;
                                    default:
                                        break;
                                }
                            }
        
                            if(char.charCodeAt(0) === 10){
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