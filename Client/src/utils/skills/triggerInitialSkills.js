import { getClassByName } from "../getClassByName";

export const triggerInitialSkills = (ch1, ch2) => {
    
    const ch1Class = getClassByName(ch1.classType)
    const ch2Class = getClassByName(ch2.classType)

    ch1["buff"] = [];
    ch2["buff"] = [];

    buffCharacters(ch1, ch2, ch1Class);
    buffCharacters(ch2, ch1, ch2Class);

    return [ch1, ch2];
};

const buffCharacters = (player, enemy, playerClass) => {
    for(let skill in playerClass.pasiveSkill){
        let pasiveSkill = playerClass.pasiveSkill[skill];
        switch (pasiveSkill.target) {
            case "self":
                player[pasiveSkill.stat] += pasiveSkill.buff;
                player["buff"].push(
                    {
                        "src": (pasiveSkill.target === "self" ? "self" : "enemy"),
                        "stat": pasiveSkill.stat,
                        "buff": pasiveSkill.buff
                    });
                break;
            case "enemy":
                enemy[pasiveSkill.stat] += pasiveSkill.buff;
                enemy["buff"].push(
                    {
                        "src": (pasiveSkill.target === "self" ? "self" : "enemy"),
                        "stat": pasiveSkill.stat,
                        "buff": pasiveSkill.buff
                    });
                break;
            default:
                console.log("Error: Invalid target character");
                break;
        }
    }
}