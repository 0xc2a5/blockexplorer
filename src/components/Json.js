import { Link } from "react-router-dom";
import "./Json.css";

export default function Json({ object, linkKeys, linkPrefix }) {
  console.log(object);
  return (
    <div className="Json">
      {"{"}
      {Object.entries(object).map(([key, value], index) => {
        let comma;
        if (index !== Object.keys(object).length - 1) {
          comma = ",";
        }

        let formattedValue = `"${value}"`;

        if (linkKeys.includes(key)) {
          formattedValue = <Link to={`${linkPrefix}/${value}`}>{value}</Link>;
        }
        else if (typeof value === "object" && value?._isBigNumber) {
          formattedValue = `"${BigInt(value._hex).toString()}"`;
        }
        else if (typeof value === "function") {
          formattedValue = `function()`;
        }


        return (
          <div className="entry" key={key}>
            <div>"{key}":</div>
            <div>{formattedValue}{comma}</div>
          </div>
        );
      })}
      {"}"}
    </div>
  );
}