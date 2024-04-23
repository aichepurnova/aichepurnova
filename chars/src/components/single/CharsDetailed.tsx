interface Props {
  id: string;
}
function CharsDetailed({ id }: Props) {
  return (
    <div>
      This is a Single Char View
      <p>ID: {id}</p>
    </div>
  );
}

export default CharsDetailed;
