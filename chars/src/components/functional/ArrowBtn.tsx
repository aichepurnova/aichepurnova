import { ReactComponent as ArrowDownSvg } from "./images/arrow-open-down-svgrepo-com.svg";
import { ReactComponent as ArrowUpSvg } from "./images/arrow-open-up-svgrepo-com.svg";
import CSS from "./functional.module.css";

interface Props {
  direction: string;
  onClick: () => void;
}
function ArrowBtn({ direction, onClick }: Props) {
  return (
    <div onClick={onClick} className={CSS["ArrowCSS"]}>
      {direction === "up" ? <ArrowUpSvg className={CSS["ArrowCSS"]} /> : null}
      {direction === "down" ? (
        <ArrowDownSvg className={CSS["ArrowCSS"]} />
      ) : null}
    </div>
  );
}

export default ArrowBtn;
