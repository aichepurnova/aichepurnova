import CSS from "./stats.module.css";

interface Props {
  skill: string;
  proficient?: boolean;
  competent?: boolean;
}
function DetSkills({ skill, proficient, competent }: Props) {
  let styleCss = CSS["skillBasic"];
  if (proficient) {
    styleCss = CSS["skillProf"];
  }
  if (competent) {
    styleCss = CSS["skillComp"];
  }
  return (
    <div className={CSS["skillWrapper"]}>
      <div className={styleCss}></div>
      <span>{skill}</span>
    </div>
  );
}

export default DetSkills;
