import { useState } from "react";
import {
  BackgroundProps,
  CharsProps,
  ClassProps,
  FormDataProps,
  RaceProps,
} from "./CharsForm";
import CSS from "./charsCreateNew.module.css"
import Step1_previewBlock, { PreviewProps } from "./Step1_previewBlock";

interface Props {
  formData: FormDataProps;
  charDetails: CharsProps;
  onChange: (charDetails: CharsProps) => void;
}

function Step1({ formData,charDetails, onChange }: Props) {

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let selected = event.currentTarget.value;
    let class_from_form: ClassProps = formData.classes.filter(
      (el) => el.class_en === selected
    )[0];
    onChange({ ...charDetails, class: class_from_form })
  };

  const handleRaceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let selected = event.currentTarget.value;
    let race_from_form: RaceProps = formData.races.filter(
      (el) => el.race_full === selected
    )[0];
    onChange({...charDetails, race: race_from_form})
  };

  const handleBGChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let selected = event.currentTarget.value;
    let bg_from_form: BackgroundProps = formData.backgrounds.filter(
      (el) => el.background === selected
    )[0];
    onChange({ ...charDetails, background: bg_from_form });
  };
  return (
    <div className={CSS["Step1_container"]}>
      <div className={CSS["Step1_selectBlock"]}>
        <label>Class: </label>
        <select onChange={(event) => handleClassChange(event)}>
          {formData.classes.map((cl) => (
            <option key={cl.class_en}>{cl.class_en}</option>
          ))}
        </select>
        <label>Race: </label>
        <select onChange={(event) => handleRaceChange(event)}>
          {formData.races.map((r) => (
            <option key={r.race_full}>{r.race_full}</option>
          ))}
        </select>

        <label>Background: </label>
        <select onChange={(event) => handleBGChange(event)}>
          {formData.backgrounds.map((bg) => (
            <option key={bg.background}>{bg.background}</option>
          ))}
        </select>
      </div>

      <Step1_previewBlock preview={charDetails}></Step1_previewBlock>
    </div>
  );
}

export default Step1;
