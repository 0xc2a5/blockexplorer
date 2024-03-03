export default function Loader({ condition, component }) {
  return condition
    ? component
    : <div>Loading...</div>;
}