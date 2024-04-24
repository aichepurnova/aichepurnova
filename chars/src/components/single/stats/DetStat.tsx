import CSS from "./stats.module.css";

interface Props {
  stat: string;
  value: string;
}

function DetStat({ stat, value }: Props) {
  let modificator = Math.floor((Number(value) - 10) / 2);
  return (
    <div className={CSS["statSingle"]}>
      <div className={CSS["statName"]}>{stat}</div>
      <div className={CSS["statValue"]}>{value}</div>
      <div className={CSS["statModif"]}>Modif: {modificator}</div>
    </div>
  );
}

export default DetStat;
