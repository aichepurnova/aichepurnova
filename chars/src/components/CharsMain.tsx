import { useState } from "react";
import CharsGrid from "./gallery/CharsGrid";
import CharsForm from "./new/CharsForm";
import CharsDetWrap from "./single/CharsDetWrap";

function CharsMain() {
  const [charsView, setCharsView] = useState("grid");
  return (
    <div>
      <div>
        <h3 onClick={() => setCharsView("grid")}>DND Chars</h3>
      </div>
      <div>
        <button onClick={() => setCharsView("form")}>Create New</button>
      </div>
      {charsView === "grid" ? (
        <CharsGrid onClick={setCharsView}></CharsGrid>
      ) : null}
      {charsView === "form" ? <CharsForm></CharsForm> : null}
      {charsView.includes("char") ? (
        <CharsDetWrap id={charsView}></CharsDetWrap>
      ) : null}
    </div>
  );
}

export default CharsMain;
