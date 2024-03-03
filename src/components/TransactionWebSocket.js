import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import alchemy, { subscription } from "../alchemy";
import "./TransactionWebSocket.css";

export default function TransactionWebSocket() {
  const hashesRef = useRef([]);
  const [hashes, setHashes] = useState([]);

  useEffect(() => {
    alchemy.ws.on({ method: subscription.MINED_TRANSACTIONS, hashesOnly: true }, t => {
      const { hash } = t.transaction;
      if (!hashesRef.current.includes(hash)) {
        hashesRef.current.push(hash);
      }
    });
    return () => {
      alchemy.ws.off(subscription.MINED_TRANSACTIONS);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (hashesRef.current.length >= 10) {
        hashesRef.current = hashesRef.current.slice(-10);
      }
      setHashes(hashesRef.current.reverse());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="TransactionWebSocket">
      <div className="label">
        <span className="dot"></span>
        <p>
          Most recent transaction hashes:
        </p>
      </div>
      {hashes.map(h => <Link key={h} to={`/transaction/${h}`}>{h}</Link>)}
    </div>
  );
}