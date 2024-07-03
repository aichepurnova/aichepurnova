import { useState } from "react";
import CSS from "./stats.module.css";
import DiceRolling from "../../functional/DiceRolling";

interface Props {
  skill: string;
  proficient?: boolean;
  competent?: boolean;
}
function DetSkills({ skill, proficient, competent }: Props) {
  let styleCss = CSS["skillBasic"];
  if (proficient) {
    styleCss = CSS["skillProf"];
  }
  if (competent) {
    styleCss = CSS["skillComp"];
  }
  const [dice, setDice] = useState(false);
  return (
    <div className={CSS["skillWrapper"]} onClick={() => setDice(!dice)}>
      <div className={styleCss}></div>
      <span>{skill}</span>
      {dice ? <DiceRolling dice={20} amount={1} modif={0} /> : null}
    </div>
  );
}

export default DetSkills;
