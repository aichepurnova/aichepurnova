import { useEffect, useState } from "react";
import CSS from "./functional.module.css";

interface Props {
  dice: number;
  modif: number;
}

function DiceRolling({ dice, modif }: Props) {
  let result = Math.floor(Math.random() * (dice - 1 + 1)) + 1 + modif;
  const [rolling, setRolling] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRolling(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      <div className={rolling ? CSS["diceRolling"] : CSS["diceRolled"]}>
        {rolling ? "..." : result}
      </div>
    </div>
  );
}

export default DiceRolling;
