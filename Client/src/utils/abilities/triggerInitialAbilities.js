import * as classes from "../../config/classes.json";

export const triggerInitialAbilities = (ch1, ch2) => {
    
    const ch1Class = classes.find( (cl) => { return cl.name === ch1.classType });
    const ch2Class = classes.find( (cl) => { return cl.name === ch2.classType });

    switch (ch1Class.pasiveSkill.target) {
        case "self":
            ch1[ch1Class.pasiveSkill.stat] += ch1Class.pasiveSkill.buff;
            break;
        case "enemy":
            ch2[ch1Class.pasiveSkill.stat] += ch1Class.pasiveSkill.buff;
            break;
        default:
            console.log("Error: Invalid target character");
            break;
    }

    switch (ch2Class.pasiveSkill.target) {
        case "self":
            ch2[ch2Class.pasiveSkill.stat] += ch2Class.pasiveSkill.buff;
            break;
        case "enemy":
            ch1[ch2Class.pasiveSkill.stat] += ch2Class.pasiveSkill.buff;
            break;
        default:
            console.log("Error: Invalid target character");
            break;
    }

    return [ch1, ch2];
};