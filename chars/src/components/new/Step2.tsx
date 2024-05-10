import { useState } from "react";
import { CharsProps } from "./CharsForm";
import Step2_AbilityScore from "./Step2_AbilityScore";

export interface StatsProps {
  strength: number,
  dexterity: number,
  constitution: number,
  intellegence: number,
  wisdom: number,
  charisma: number
}

function Step2({charDetails}: {charDetails: CharsProps }) {
  const [stats, setStats] = useState<StatsProps>({
    strength: 15,
    dexterity: 14,
    constitution: 13,
    intellegence: 12,
    wisdom: 10,
    charisma: 8
  })
  return (
    <div>
      <div>Class: {charDetails.class.class_en}</div>
      <div>Race: {charDetails.race.race_full}</div>
      <div>Background: {charDetails.background.background}</div>
      <div>Stat bonuses: {charDetails.race.bonuses}</div>
      <p><i>Modificators not applied yet.</i></p>

      <div>
        <p>Ability Scores</p>
      <Step2_AbilityScore ability="strength" value={stats.strength} onChange={(value:number) => setStats({...stats, strength: value})}/>
      <Step2_AbilityScore ability="dexterity" value={stats.dexterity} onChange={(value:number) => setStats({...stats, dexterity: value})}/>
      <Step2_AbilityScore ability="constitution" value={stats.constitution} onChange={(value:number) => setStats({...stats, constitution: value})}/>
      <Step2_AbilityScore ability="intellegence" value={stats.intellegence} onChange={(value:number) => setStats({...stats, intellegence: value})}/>
      <Step2_AbilityScore ability="wisdom" value={stats.wisdom} onChange={(value:number) => setStats({...stats, wisdom: value})}/>
      <Step2_AbilityScore ability="charisma" value={stats.charisma} onChange={(value:number) => setStats({...stats, charisma: value})}/>
      </div>
    </div>
  );
}

export default Step2;
