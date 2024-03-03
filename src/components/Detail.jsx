import { useEffect, useRef, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./Detail.css";
import Section from "./Section";

export default function Detail() {
  const location = useLocation();
  const history = useHistory();
  const [title, id] = location.pathname.substring(1).split("/");
  const [searchInput, setSearchInput] = useState(id || "");
  const searchInputRef = useRef(null);

  useEffect(() => {
    setSearchInput("");
    searchInputRef.current.focus();
  }, [location]);

  function handleSearch(e) {
    e.preventDefault();
    history.push(`/${title}/${searchInput}`);
  }

  let idLabel;
  switch (title) {
    case "block": idLabel = "block number"; break;
    case "transaction": idLabel = "transaction hash"; break;
    case "account": idLabel = "address"; break;
    default: idLabel = "???"; break;
  }

  let instructions;
  switch (title) {
    case "block": {
      instructions = id
        ? <p>Click <Link to="/block">here</Link> to view the latest blocks.</p>
        : <>
          <p>
            Under Latest Blocks:
          </p>
          <ul>
            <li>Click on a block number to see its details.</li>
            <li>Click transactions to see the block's transaction hashes.</li>
            <li>Click on a transactions hash to view its details.</li>
          </ul>
        </>;
      break;
    }
    case "transaction": {
      if (id) {
        instructions = <p>Click on a "to" or "from" address to view its balance.</p>;
      }
      break;
    }
    default: instructions = ""; break;
  }

  const n = ["a", "e", "i", "o", "u"].includes(idLabel[0]) ? "n" : "";

  return (
    <Section className="Detail" title={`${title} Search`}>
      <p>Enter a{n} <u>{idLabel}</u> to view its details.</p>
      <form className="Search" onSubmit={handleSearch}>
        <input
          onChange={e => setSearchInput(e.target.value)}
          placeholder={idLabel}
          ref={searchInputRef}
          type="text"
          value={searchInput}
        />
        <button type="submit">Search</button>
      </form>
      {id && (
        <p className="currentId">
          {idLabel}: {id}
        </p>
      )}
      {instructions}
    </Section>
  );
};;