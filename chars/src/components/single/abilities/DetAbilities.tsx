import { DataProps } from "../CharsDetWrap";

function DetAbilities({ details }: DataProps) {
  return (
    <div>
      <h3>Abilities</h3>
      <div>
        <div>
          <h4>Languages</h4>
          <div>{details.languages}</div>
        </div>

        <div>
          <h4>Tools</h4>
          <div>{details.tools}</div>
        </div>

        <div>
          <div dangerouslySetInnerHTML={{ __html: details.skills }}></div>
        </div>
      </div>
    </div>
  );
}

export default DetAbilities;
