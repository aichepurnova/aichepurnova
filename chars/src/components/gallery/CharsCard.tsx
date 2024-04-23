import CSS from "./gallery.module.css";

export interface CharsCardProps {
  id: number;
  name: string;
  race: string;
  klass: string;
  level: number;
  image: string;
}

interface Props {
  char: CharsCardProps;
  onClick: (id: string) => void;
}

function CharsCard({ char, onClick }: Props) {
  const img_link = "/media/media/uploads/chars/" + char.image;
  return (
    <li className={CSS["charsCard"]}>
      <img
        className={CSS["charsImage"]}
        width="200"
        src={img_link}
        alt={char.image}
      ></img>
      <p>
        <b> {char.name}</b>
      </p>
      <span>
        {char.race}, {char.klass}, {char.level}
      </span>
      <br></br>
      <button onClick={() => onClick(String("char=" + char.id))}>
        Play {char.id}
      </button>
    </li>
  );
}

export default CharsCard;
