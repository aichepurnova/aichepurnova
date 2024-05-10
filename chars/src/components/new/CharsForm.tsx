import { useEffect, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import useData from "../../hooks/useData";
import Loader from "../functional/Loader";

export interface ClassProps {
  index: number;
  class_en: string;
  descriptions: string;
  dice: string;
  equipment: string;
  proficiencies: string;
  saves: string;
  starting_skills: string;
  tools: string;
}

export interface RaceProps {
  index: number;
  race: string;
  subrace: string;
  race_full: string;
  size: string;
  speed: string;
  stat: string;
  bonuses: string;
  languages: string;
  skills: string;
}

export interface BackgroundProps {
  index: number;
  background: string;
  languages: string;
  source: string;
  page: string;
  tools: string;
  proficiencies: string;
}

export interface FormDataProps {
  classes: ClassProps[];
  races: RaceProps[];
  backgrounds: BackgroundProps[];
  armors: [];
  weapons: [];
  proficiencies: {
    all: [];
  };
}

function CharsForm() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<FormDataProps>();

  let url = "/chars/get_data_for_form";
  const { data, isLoading } = useData<FormDataProps>(url);
  useEffect(() => {
    setFormData(data);
  }, [data]);

  return (
    <div>
      <div>This is a Char creator form</div>
      {isLoading ? <Loader visible={isLoading}></Loader> : null}

      {step === 1 && formData ? <Step1 formData={formData}></Step1> : null}
      {step === 2 ? <Step2></Step2> : null}
      {step === 3 ? <Step3></Step3> : null}

      <div>
        {step !== 1 ? (
          <button onClick={() => setStep(step - 1)}>Prev Step</button>
        ) : null}

        <button onClick={() => setStep(step + 1)}>Next Step</button>
      </div>
    </div>
  );
}

export default CharsForm;
