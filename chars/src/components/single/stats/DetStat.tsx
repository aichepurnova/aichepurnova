import { useState } from "react";
import DiceRolling from "../../functional/DiceRolling";
import CSS from "./stats.module.css";

interface Props {
  stat: string;
  value: string;
}

function DetStat({ stat, value }: Props) {
  let modificator = Math.floor((Number(value) - 10) / 2);
  const [dice, setDice] = useState(false);

  return (
    <div className={CSS["statSingle"]} onClick={() => setDice(!dice)}>
      <div className={CSS["statName"]}>{stat}</div>
      <div className={CSS["statValue"]}>{value}</div>
      <div className={CSS["statModif"]}>Modif: {modificator}</div>
      {dice ? <DiceRolling dice={20} modif={modificator} /> : null}
    </div>
  );
}

export default DetStat;
