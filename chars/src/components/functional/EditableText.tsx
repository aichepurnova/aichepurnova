import { useState } from "react";
import CSS from "./functional.module.css";
import { ReactComponent as EditSvg } from "./edit-2-svgrepo-com.svg";
import { ReactComponent as SaveSvg } from "./save-svgrepo-com.svg";

interface Props {
  text: string;
  onChange: () => void;
}

function EditableText({ text, onChange }: Props) {
  const [state, setState] = useState("default");

  return (
    <div>
      {state === "default" ? (
        <div className={CSS["EditableText"]}>
          <div className={CSS["EditDiv"]} onClick={() => setState("textarea")}>
            <EditSvg className={CSS["EditSVG"]}></EditSvg>
            <span>edit</span>
          </div>
          <div className={CSS["EditText"]}>
            <span>{text}</span>
          </div>
        </div>
      ) : (
        <div className={CSS["EditableText"]}>
          <div className={CSS["EditDiv"]} onClick={() => setState("default")}>
            <SaveSvg className={CSS["EditSVG"]}></SaveSvg>
            <span>save</span>
          </div>
          <div className={CSS["EditText"]}>
            <textarea
              className={CSS["EditText"]}
              onChange={onChange}
              defaultValue={text}
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditableText;
