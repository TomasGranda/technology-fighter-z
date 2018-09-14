import { getClassByName } from "../getClassByName";

export const triggerActiveSkills = (characters, playerNumber) => {
    let ch1 = characters[0];
    let ch2 = characters[1];

    const ch1Class = getClassByName(ch1.classType)
    const ch2Class = getClassByName(ch2.classType)
    
    if(!ch1["buff"]){
        ch1["buff"] = []
    }
    if(!ch2["buff"]){
        ch2["buff"] = []
    }

    if(playerNumber === 0){
        buffCharacters(ch1, ch2, ch1Class);
    } else {
        buffCharacters(ch2, ch1, ch2Class);
    }

    return [ch1, ch2];
};

const buffCharacters = (player, enemy, playerClass) => {
    for(let skill in playerClass.activeSkill){
        let activeSkill = playerClass.activeSkill[skill];
        switch (activeSkill.target) {
            case "self":
                player[activeSkill.stat] += activeSkill.buff;
                player["buff"].push(
                    {
                        "src": (activeSkill.target === "self" ? "self" : "enemy"),
                        "stat": activeSkill.stat,
                        "buff": activeSkill.buff
                    });
                break;
            case "enemy":
                enemy[activeSkill.stat] += activeSkill.buff;
                enemy["buff"].push(
                    {
                        "src": (activeSkill.target === "self" ? "self" : "enemy"),
                        "stat": activeSkill.stat,
                        "buff": activeSkill.buff
                    });
                break;
            default:
                console.log("Error: Invalid target character");
                break;
        }
    }
}