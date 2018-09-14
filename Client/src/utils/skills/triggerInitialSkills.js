import * as classes from "../../config/classes.json";

export const triggerInitialSkills = (ch1, ch2) => {
    
    const ch1Class = classes.find( (cl) => { return cl.name === ch1.classType });
    const ch2Class = classes.find( (cl) => { return cl.name === ch2.classType });
    ch1["buff"] = [];
    ch2["buff"] = [];

    for(let skill in ch1Class.pasiveSkill){
        let pasiveSkill = ch1Class.pasiveSkill[skill];
        switch (pasiveSkill.target) {
            case "self":
                ch1[pasiveSkill.stat] += pasiveSkill.buff;
                ch1["buff"].push(
                    {
                        "src": (pasiveSkill.target === "self" ? "self" : "enemy"),
                        "stat": pasiveSkill.stat,
                        "buff": pasiveSkill.buff
                    });
                break;
            case "enemy":
                ch2[pasiveSkill.stat] += pasiveSkill.buff;
                ch2["buff"].push(
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
    for(let skill in ch2Class.pasiveSkill) {
        let pasiveSkill = ch2Class.pasiveSkill[skill];
        switch (pasiveSkill.target) {
            case "self":
                ch2[pasiveSkill.stat] += pasiveSkill.buff;
                ch2["buff"].push(
                    {
                        "src": (pasiveSkill.target === "self" ? "self" : "enemy"),
                        "stat": pasiveSkill.stat,
                        "buff": pasiveSkill.buff
                    });
                break;
            case "enemy":
                ch1[pasiveSkill.stat] += pasiveSkill.buff;
                ch1["buff"].push(
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

    return [ch1, ch2];
};