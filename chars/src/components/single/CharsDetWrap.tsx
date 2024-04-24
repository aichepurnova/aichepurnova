import useData from "../../hooks/useData";
import Loader from "../functional/Loader";
import Error from "../functional/Error";
import CharsDetMain from "./CharsDetMain";

export interface DataProps {
  details: CharDetailedProps;
}

export interface CharDetailedProps {
  id: string;
  name: string;
  race: string;
  klass: string;
  level: string;
  backstory: string;
  image: string;
  proficiency: string;
  maxhp: string;

  // Stats
  stren: string;
  dext: string;
  consti: string;
  inte: string;
  wisd: string;
  charis: string;

  // Skills
  tools: string;
  proficiencies: string;
  languages: string;
  skills: string;

  // Belongings
  equipment: string;
  gold: string;
  silver: string;
  cuprum: string;
  platinum: string;
}

interface Props {
  id: string;
}
function CharsDetWrap({ id }: Props) {
  let url = "/chars/get_character?id=" + id;
  const { data, error, isLoading } = useData<DataProps>(url);
  return (
    <div>
      This is a Single Char View
      {isLoading ? <Loader visible></Loader> : null}
      {error ? <Error></Error> : null}
      {data ? <CharsDetMain details={data.details}></CharsDetMain> : null}
    </div>
  );
}

export default CharsDetWrap;
