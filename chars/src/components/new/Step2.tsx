import { useState } from "react";
import { CharsProps } from "./CharsForm";
import Step2AbilityScore from "./Step2_AbilityScore";
import DiceRolling from "../functional/DiceRolling";

export interface StatsProps {
  strength: number,
  dexterity: number,
  constitution: number,
  intellegence: number,
  wisdom: number,
  charisma: number
}

function Step2({charDetails}: {charDetails: CharsProps }) {

  const [dice, setDice] = useState<number>()
  const [stats, setStats] = useState<StatsProps>({
    strength: 15,
    dexterity: 14,
    constitution: 13,
    intellegence: 12,
    wisdom: 10,
    charisma: 8
  })
  const handleMove = (direction: string, stat: string) => {
    let array: Array<string> = ['strength', 'dexterity', 'constitution', 'intellegence', 'wisdom', 'charisma']
    let index_of_stat = array.indexOf(stat)

    if (((direction === 'up') && (index_of_stat === 0)) || ((direction === 'down') && (index_of_stat === 5))) {
      setStats({...stats, strength:stats.charisma, charisma: stats.strength})
    }
    else {
      let new_stat = 'stat'
      if (direction === 'up') {
        new_stat = array[index_of_stat-1]
      }
      else {
        new_stat = array[index_of_stat+1]
      }
      setStats({...stats, 
        [stat as keyof typeof stats]:stats[new_stat as keyof typeof stats],
        [new_stat as keyof typeof stats]:stats[stat as keyof typeof stats]})
      }
    }
  
  return (
    <div>
      <div>Class: {charDetails.class.class_en}</div>
      <div>Race: {charDetails.race.race_full}</div>
      <div>Background: {charDetails.background.background}</div>
      <div>Stat bonuses: {charDetails.race.bonuses}</div>
      <p><i>Modificators not applied yet.</i></p>

      <div>
        <button onClick={() => setDice(4)}>Roll 4d6</button>
        <button onClick={() => setDice(3)}>Roll 3d6</button>
        {dice ? <DiceRolling dice={6} amount = {dice} modif={0} onClick = {() => setDice(undefined)}></DiceRolling>: null}
      </div>

      <div>
      <Step2AbilityScore ability="strength" value={stats.strength} onChange={(value:number) => setStats({...stats, strength: value})} handleMove={(direction) => handleMove(direction, 'strength')}/>
      <Step2AbilityScore ability="dexterity" value={stats.dexterity} onChange={(value:number) => setStats({...stats, dexterity: value})} handleMove={(direction) => handleMove(direction, 'dexterity')}/>
      <Step2AbilityScore ability="constitution" value={stats.constitution} onChange={(value:number) => setStats({...stats, constitution: value})} handleMove={(direction) => handleMove(direction, 'constitution')}/>
      <Step2AbilityScore ability="intellegence" value={stats.intellegence} onChange={(value:number) => setStats({...stats, intellegence: value})} handleMove={(direction) => handleMove(direction, 'intellegence')}/>
      <Step2AbilityScore ability="wisdom" value={stats.wisdom} onChange={(value:number) => setStats({...stats, wisdom: value})} handleMove={(direction) => handleMove(direction, 'wisdom')}/>
      <Step2AbilityScore ability="charisma" value={stats.charisma} onChange={(value:number) => setStats({...stats, charisma: value})} handleMove={(direction) => handleMove(direction, 'charisma')}/>
      </div>
    </div>
  );
}

export default Step2;
