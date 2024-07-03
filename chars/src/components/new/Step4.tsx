// Subclass - optional form step (only if class level 1 has subclass)

import { CharsProps, FormDataProps } from "./CharsForm";

function Step4({
  formData,
  charDetails,
}: {
  formData: FormDataProps;
  charDetails: CharsProps;
}) {
  let desc = charDetails.class.descriptions;
  let desc_keys: string[] = [];
  Object.keys(charDetails.class.descriptions).forEach((e) => desc_keys.push(e));

  return (
    <div>
      {desc_keys.map((k) => {
        if (charDetails.class.starting_skills.includes(k)) {
          return (
            <div>
              <h5>{k}</h5>
              <p>{desc[k as keyof typeof desc] as string}</p>
            </div>
          );
        }
      })}
    </div>
  );
}
export default Step4;
