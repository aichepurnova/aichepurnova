import { CharsProps, FormDataProps } from "./CharsForm";

function Step3({formData, charDetails}: {formData: FormDataProps, charDetails: CharsProps}) {
  
  
  return <div>
    <div>{charDetails.class.proficiencies}</div>
    <div>{charDetails.background.proficiencies}</div>

    {formData.proficiencies.all.map((prof)=> 
    <div>
      <label>{prof}</label>
      <input type="checkbox"></input>
      </div>)}
  </div>;
}

export default Step3;
