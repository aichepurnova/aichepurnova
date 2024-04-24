import { useState } from "react";
import ArrowsBlock from "../../functional/ArrowsBlock";
import CSS from "./header.module.css";

interface Props {
  maxhp: number;
}
function DetHP({ maxhp }: Props) {
  const [currHp, setCurrHp] = useState(maxhp);

  const handleHPchange = (value: number) => {
    if (value) {
      if (value < maxhp) {
        setCurrHp(value);
      } else {
        setCurrHp(maxhp);
      }
    } else {
      setCurrHp(0);
    }
  };
  return (
    <div className={CSS["charsStatBlock"]}>
      <div> Max HP: {maxhp}</div>
      <div className={CSS["charsHeaderBlock"]}>
        <span>Curr HP:</span>
        <input
          value={currHp}
          onChange={(event) =>
            handleHPchange(Number(event.currentTarget.value))
          }
          className={CSS["DetHPValueInput"]}
        ></input>
        <ArrowsBlock
          onClickUp={() => handleHPchange(currHp + 1)}
          onClickDown={() => handleHPchange(currHp - 1)}
        ></ArrowsBlock>
      </div>
      {currHp === 0 ? <div> You're dying!</div> : null}
    </div>
  );
}

export default DetHP;
