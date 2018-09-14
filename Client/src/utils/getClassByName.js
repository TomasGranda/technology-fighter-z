import * as classes from "../config/classes.json";
import { capitalize } from "./common/capitalize";

export const getClassByName = (selectedClass) => {
    const classItem = classes.find((classType) => { return classType.name === selectedClass });

    if(!classItem || classItem === undefined){
        return ""
    }

    if (selectedClass) {
        const classDescriptions = classItem.pasiveSkill.map((ps) => {
            return `
            ${(ps.target === "self" ? "Self => " : "Enemy => ")}
            ${capitalize(ps.stat)} => 
            ${(ps.buff > 0 ? "+" + ps.buff : ps.buff)}
            `;
        });
        classItem.description = classDescriptions;
    } else {
        classItem.description = "";
    }
    return classItem;
}