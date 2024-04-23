import useData from "../../hooks/useData";
import Loader from "../functional/Loader";
import CharsCard, { CharsCardProps } from "./CharsCard";
import CSS from "./gallery.module.css";

interface CharsGridProps {
  chars: Array<CharsCardProps>;
}

interface Props {
  onClick: (id: string) => void;
}

function CharsGrid({ onClick }: Props) {
  const { data, error, isLoading } =
    useData<CharsGridProps>("/chars/get_chars");
  return (
    <div>
      {isLoading ? <Loader visible></Loader> : null}
      {error ? <p>Error</p> : null}
      {data ? (
        <ul className={CSS["charsGrid"]}>
          {data.chars.map((char) => {
            return <CharsCard char={char} onClick={onClick}></CharsCard>;
          })}
        </ul>
      ) : null}
    </div>
  );
}

export default CharsGrid;
