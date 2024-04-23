import CSS from "./functional.module.css";

function Loader({ visible }: { visible: boolean }) {
  return visible ? (
    <div className={CSS["loader"]} role="status">
      <span className="sr-only"></span>
    </div>
  ) : (
    <div></div>
  );
}

export default Loader;
