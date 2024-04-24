import { DataProps } from "../CharsDetWrap";
import DetHP from "./DetHP";
import CSS from "./header.module.css";

function DetHeader({ details }: DataProps) {
  let img_link = "/media/media/uploads/chars/" + details.image;
  let initiative = Math.floor((Number(details.dext) - 10) / 2);
  let base_ac = Math.floor(10 + (Number(details.dext) - 10) / 2);

  return (
    <div>
      <h1>{details.name}</h1>
      <div className={CSS["charsHeaderBlock"]}>
        <div>
          <img
            className={CSS["charsImage"]}
            width="200"
            src={img_link}
            alt={details.image}
          ></img>
        </div>
        <div className={CSS["charsStatBlock"]}>
          <span>Race: {details.race}</span>
          <span>Background: {details.backstory}</span>
          <span>Class: {details.klass}</span>
          <span>Level: {details.level}</span>
        </div>
        <div className={CSS["charsStatBlock"]}>
          <span>Base AC: {base_ac}</span>
          <span>Spell DC: {}</span>
          <span>Prof: {details.proficiency}</span>
          <span>Base Attack: </span>
          <span>Initiative: {initiative}</span>
        </div>
        <div>
          <DetHP maxhp={Number(details.maxhp)}></DetHP>
        </div>
      </div>
    </div>
  );
}

export default DetHeader;
