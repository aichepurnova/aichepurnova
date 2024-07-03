import { BackgroundProps, ClassProps, RaceProps } from "./CharsForm";
import CSS from "./charsCreateNew.module.css";

interface Props {
  preview: PreviewProps;
}

export interface PreviewProps {
  class: ClassProps;
  race: RaceProps;
  background: BackgroundProps;
}

function Step1_previewBlock({ preview }: Props) {
  return (
    <div className={CSS["Step1_previewBlock"]}>
      <table>
        <thead>
          <td>Parameter</td>
          <td>Source</td>
          <td>Value</td>
        </thead>
        <tbody>
          <tr>
            <td>Size</td>
            <td>Race</td>
            <td id="info-size">{preview.race.size}</td>
          </tr>
          <tr>
            <td>Speed</td>
            <td>Race</td>
            <td id="info-speed">{preview.race.speed}</td>
          </tr>
          <tr>
            <td>Hit dice</td>
            <td>Class</td>
            <td id="info-dice">{preview.class.dice}</td>
          </tr>
          <tr>
            <td>Saves</td>
            <td>Class</td>
            <td id="info-saves">{preview.class.saves}</td>
          </tr>
          <tr>
            <td>Stat Bonus</td>
            <td>Race</td>
            <td id="info-bonuses">{preview.race.bonuses}</td>
          </tr>
          <tr>
            <td rowSpan={2}>Proficiencies</td>
            <td>Class</td>
            <td id="info-proficiencies-class">{preview.class.proficiencies}</td>
          </tr>
          <tr>
            <td>Background</td>
            <td id="info-proficiencies-bg">
              {preview.background.proficiencies}
            </td>
          </tr>
          <tr>
            <td rowSpan={2}>Tools</td>
            <td>Class</td>
            <td id="info-tools-class">{preview.class.tools}</td>
          </tr>
          <tr>
            <td>Background</td>
            <td id="info-tools-bg">{preview.background.tools}</td>
          </tr>
          <tr>
            <td rowSpan={2}>Languages</td>
            <td>Race</td>
            <td id="info-languages-race">{preview.race.languages}</td>
          </tr>
          <tr>
            <td>Background</td>
            <td id="info-languages-bg">{preview.background.languages}</td>
          </tr>
          <tr>
            <td rowSpan={2}>Skills</td>
            <td>Class</td>
            <td id="info-skills-class">{preview.class.starting_skills}</td>
          </tr>
          <tr>
            <td>Race</td>
            <td id="info-skills-race">{preview.race.skills}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Step1_previewBlock;
