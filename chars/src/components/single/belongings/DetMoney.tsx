import ArrowsBlock from "../../functional/ArrowsBlock";
import CSS from "./belongings.module.css";

interface Props {
  type: string;
  value: string;
}
function DetMoney({ type, value }: Props) {
  return (
    <div className={CSS["DetMoneyEl"]}>
      <div className={CSS["DetMoneyType"]}>{type}</div>
      <div className={CSS["DetMoneyValue"]}>
        <input
          defaultValue={value}
          className={CSS["DetMoneyValueInput"]}
        ></input>
        <ArrowsBlock
          onClickUp={() => console.log("up")}
          onClickDown={() => console.log("down")}
        ></ArrowsBlock>
      </div>
    </div>
  );
}

export default DetMoney;
