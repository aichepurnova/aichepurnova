import { useEffect, useState } from "react";
import CSS from "./functional.module.css";

interface Props {
  dice: number;
  amount: number;
  modif: number;
  onClick?: () => void;
}

function DiceRolling({ dice, amount, modif, onClick }: Props) {

  let diceRollResults: Array<number> = []
  let result = 0
  let i = 0
  while (i<amount) {
    result = Math.floor(Math.random() * (dice - 1 + 1)) + 1
    if (modif) {
      result = result + modif
    };
    diceRollResults.push(result)
    i = i + 1
  }
    
  const [rolling, setRolling] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRolling(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div onClick={onClick} className={CSS["diceArea"]}>
      {diceRollResults.map((res) => 
      <div className={rolling ? CSS["diceRolling"] : CSS["diceRolled"]}>
        {rolling ? "..." : res}
      </div>)}

    </div> 
  );
}

export default DiceRolling;
