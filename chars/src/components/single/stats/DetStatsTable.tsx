import { DataProps } from "../CharsDetWrap";
import DetSkills from "./DetSkills";
import DetStat from "./DetStat";
import CSS from "./stats.module.css";

function DetStatsTable({ details }: DataProps) {
  let array = [
    ["Strength", details.stren, "Athletics"],
    ["Dexterity", details.dext, "Acrobatics, Sleight of Hand, Stealth"],
    ["Constitution", details.consti, ""],
    [
      "Intelegence",
      details.inte,
      "Arcana, History, Investigation, Nature, Religion",
    ],
    [
      "Wisdom",
      details.wisd,
      "Animal Handling, Insight, Medicine, Perception, Survival",
    ],
    [
      "Charisma",
      details.charis,
      "Deception, Intimidation, Perfomance, Persuasion",
    ],
  ];
  return (
    <div>
      <h3>Stats</h3>
      <div className={CSS["statsBlock"]}>
        {array.map((s) => (
          <div key={s[0]} className={CSS["statBlock"]}>
            <DetStat stat={s[0]} value={s[1]}></DetStat>
            <div>
              {s[2]
                .split(", ")
                .map((skill) =>
                  skill ? (
                    details.proficiencies.includes(skill) ? (
                      <DetSkills
                        key={skill}
                        skill={skill}
                        proficient
                      ></DetSkills>
                    ) : (
                      <DetSkills key={skill} skill={skill}></DetSkills>
                    )
                  ) : null
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetStatsTable;
