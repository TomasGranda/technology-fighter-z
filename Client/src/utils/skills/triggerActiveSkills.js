import * as classes from "../../config/classes.json";

export const triggerActiveSkills = (characters, playerNumber) => {
    let ch1 = characters[0];
    let ch2 = characters[1];
    const ch1Class = classes.find( (cl) => { return cl.name === ch1.classType });
    const ch2Class = classes.find( (cl) => { return cl.name === ch2.classType });
    
    if(!ch1["buff"]){
        ch1["buff"] = []
    }
    if(!ch2["buff"]){
        ch2["buff"] = []
    }

    if(playerNumber === 0){
        for(let skill in ch1Class.activeSkill){
            let activeSkill = ch1Class.activeSkill[skill];
            switch (activeSkill.target) {
                case "self":
                    ch1[activeSkill.stat] += activeSkill.buff;
                    ch1["buff"].push(
                        {
                            "src": (activeSkill.target === "self" ? "self" : "enemy"),
                            "stat": activeSkill.stat,
                            "buff": activeSkill.buff
                        });
                    break;
                case "enemy":
                    ch2[activeSkill.stat] += activeSkill.buff;
                    ch2["buff"].push(
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
    } else {
        for(let skill in ch2Class.activeSkill) {
            let activeSkill = ch2Class.activeSkill[skill];
            switch (activeSkill.target) {
                case "self":
                    ch2[activeSkill.stat] += activeSkill.buff;
                    ch2["buff"].push(
                        {
                            "src": (activeSkill.target === "self" ? "self" : "enemy"),
                            "stat": activeSkill.stat,
                            "buff": activeSkill.buff
                        });
                    break;
                case "enemy":
                    ch1[activeSkill.stat] += activeSkill.buff;
                    ch1["buff"].push(
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

    return [ch1, ch2];
};