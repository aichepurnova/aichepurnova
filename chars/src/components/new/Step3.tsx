import { useState } from "react";
import { CharsProps, FormDataProps } from "./CharsForm";

function Step3({formData, charDetails}: {formData: FormDataProps, charDetails: CharsProps}) {
  
  let checked: string[] = []
  let available: string[] = []
  // const [available, setAvailable] = useState<string[]>([])

  formData.proficiencies.all.forEach((prof) => {
    
    let prof_s = prof.split(' (')[0]
    // Background
    if (charDetails.background.proficiencies.toLowerCase().includes('choose')) {
      if (charDetails.background.proficiencies.toLowerCase().includes(prof_s)) {
        // setAvailable([...available, prof])
        available.push(prof)
      }
    }
    else {
      if (charDetails.background.proficiencies.includes(prof_s)) {
        // setChecked([...checked, prof])
        checked.push(prof)
      }
    }

    // Class
    if (charDetails.class.proficiencies.toLowerCase().includes('choose')) {
      if (charDetails.class.proficiencies.includes(prof_s)) {
        // setAvailable([...available, prof])
        available.push(prof)
      }
    }
    else {
      if (charDetails.class.proficiencies.includes(prof_s)) {
        // setChecked([...checked, prof])
        checked.push(prof)
      }
    }

  })

  
  return <div>
    <div>Class: {charDetails.class.proficiencies}</div>
    <div>Background: {charDetails.background.proficiencies}</div>

    {formData.proficiencies.all.map((prof)=> 
    <div key={prof}>
      <label>{prof}</label>
      <input type="checkbox" disabled={!available.includes(prof)} defaultChecked={checked.includes(prof)}></input>
      </div>)}
  </div>;
}

export default Step3;
