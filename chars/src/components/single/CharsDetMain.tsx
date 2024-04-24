import { DataProps } from "./CharsDetWrap";
import DetBelongings from "./belongings/DetBelongings";
import DetHeader from "./header/DetHeader";
import DetSkills from "./abilities/DetAbilities";
import DetStatsTable from "./stats/DetStatsTable";

function CharsDetMain({ details }: DataProps) {
  return (
    <div>
      <DetHeader details={details}></DetHeader>
      <DetStatsTable details={details}></DetStatsTable>
      <DetBelongings details={details}></DetBelongings>
      <DetSkills details={details}></DetSkills>
    </div>
  );
}

export default CharsDetMain;
