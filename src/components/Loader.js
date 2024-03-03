import "./Loader.css";

export default function Loader({ condition, component }) {
  return condition
    ? component
    : <div className="Loader">Loading...</div>;
}