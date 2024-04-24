import ArrowBtn from "./ArrowBtn";
import CSS from "./functional.module.css";

interface Props {
  onClickUp: () => void;
  onClickDown: () => void;
}

function ArrowsBlock({ onClickUp, onClickDown }: Props) {
  return (
    <div className={CSS["ArrowsBlock"]}>
      <ArrowBtn direction="up" onClick={onClickUp}></ArrowBtn>
      <ArrowBtn direction="down" onClick={onClickDown}></ArrowBtn>
    </div>
  );
}

export default ArrowsBlock;
