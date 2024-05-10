import { useState } from "react";
import {
  BackgroundProps,
  ClassProps,
  FormDataProps,
  RaceProps,
} from "./CharsForm";
import DiceRolling from "../functional/DiceRolling";

interface Props {
  formData: FormDataProps;
}

function Step1({ formData }: Props) {
  const [preview, setPreview] = useState<{
    class: ClassProps;
    race: RaceProps;
    background: BackgroundProps;
  }>({
    class: formData.classes[0],
    race: formData.races[0],
    background: formData.backgrounds[0],
  });
  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let selected = event.currentTarget.value;
    let class_from_form: ClassProps = formData.classes.filter(
      (el) => el.class_en === selected
    )[0];
    setPreview({ ...preview, class: class_from_form });
  };

  const handleRaceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let selected = event.currentTarget.value;
    let race_from_form: RaceProps = formData.races.filter(
      (el) => el.race_full === selected
    )[0];
    setPreview({ ...preview, race: race_from_form });
  };

  const handleBGChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let selected = event.currentTarget.value;
    let bg_from_form: BackgroundProps = formData.backgrounds.filter(
      (el) => el.background === selected
    )[0];
    setPreview({ ...preview, background: bg_from_form });
  };
  return (
    <div>
      <div>
        <p>Selects:</p>
        <select onChange={(event) => handleClassChange(event)}>
          {formData.classes.map((cl) => (
            <option key={cl.class_en}>{cl.class_en}</option>
          ))}
        </select>
        <div>Race: </div>
        <select onChange={(event) => handleRaceChange(event)}>
          {formData.races.map((r) => (
            <option key={r.race_full}>{r.race_full}</option>
          ))}
        </select>

        <div>Background: </div>
        <select onChange={(event) => handleBGChange(event)}>
          {formData.backgrounds.map((bg) => (
            <option key={bg.background}>{bg.background}</option>
          ))}
        </select>
      </div>

      <div>
        <p>Preview</p>
        <p>Class Features:</p>
        <div>{preview.class.class_en}</div>
        <div>{preview.class.dice}</div>
        <div>{preview.class.equipment}</div>
        <div>{preview.class.starting_skills}</div>
        <div>{preview.class.proficiencies}</div>
        <div>{preview.class.saves}</div>
        <div>{preview.class.tools}</div>
        <p>Race Features</p>
        <div>{preview.race.race_full}</div>
        <div>{preview.race.bonuses}</div>
        <div>{preview.race.languages}</div>
        <div>{preview.race.skills}</div>
        <div>{preview.race.size}</div>
        <div>{preview.race.speed}</div>
        <div>{preview.race.stat}</div>
        <p>Background Features</p>
        <div>{preview.background.background}</div>
        <div>{preview.background.languages}</div>
        <div>{preview.background.proficiencies}</div>
        <div>{preview.background.tools}</div>
      </div>
    </div>
  );
}

export default Step1;
