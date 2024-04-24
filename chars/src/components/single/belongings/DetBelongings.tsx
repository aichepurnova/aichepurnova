import EditableText from "../../functional/EditableText";
import { DataProps } from "../CharsDetWrap";
import DetMoney from "./DetMoney";
import CSS from "./belongings.module.css";

function DetBelongings({ details }: DataProps) {
  return (
    <div>
      <h3>Equipment</h3>
      <EditableText
        text={details.equipment}
        onChange={() => console.log("text")}
      ></EditableText>
      <div className={CSS["DetMoney"]}>
        <DetMoney type="Platinum" value={details.platinum}></DetMoney>
        <DetMoney type="Gold" value={details.gold}></DetMoney>
        <DetMoney type="Silver" value={details.silver}></DetMoney>
        <DetMoney type="Cuprum" value={details.cuprum}></DetMoney>
      </div>
    </div>
  );
}

export default DetBelongings;
