import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import alchemy from "../alchemy.js";
import "./Blocks.css";
import Loader from "./Loader.js";
import Section from "./Section.js";

function Transactions({ label, outerComma, transactions }) {
  const [openTransactions, setOpenTransactions] = useState(false);

  function handleToggleTransactions(e) {
    setOpenTransactions(e.currentTarget.open);
  }

  return (
    <details
      className="entry Transactions"
      onToggle={handleToggleTransactions}
      open={openTransactions}
    >
      <summary>
        <div>"{label}":</div>
        {openTransactions
          ? <div>[</div>
          : <div>[...]{outerComma}</div>}
      </summary>

      {transactions.map((t, index) => {
        let innerComma;
        if (index !== transactions.length - 1) {
          innerComma = ",";
        }
        return (
          <div className="transaction" key={t}>
            <Link to={`/transaction/${t}`}>"{t}"</Link>
            {innerComma}
          </div>
        );
      }
      )}
      <div>]{outerComma}</div>
    </details>
  );
}

function Block({ block }) {
  return (
    <div className="Block">
      {"{"}
      {Object.entries(block).map(([key, value], index) => {
        let comma;
        if (index !== Object.keys(block).length - 1) {
          comma = ",";
        }

        if (key === "transactions") {
          return <Transactions
            key={key}
            label={key}
            outerComma={comma}
            transactions={value}
          />;
        }

        let formattedValue = `"${value}"`;

        if (value._isBigNumber) {
          formattedValue = `"${BigInt(value._hex).toString()}"`;
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

function TargetBlock({ blockNumber }) {
  const [targetBlock, setTargetBlock] = useState(null);

  useEffect(() => {
    async function getTargetBlock() {
      setTargetBlock(null);
      const b = parseInt(blockNumber);
      const block = await alchemy.core.getBlock(b);
      setTargetBlock(block);
    }
    getTargetBlock();
  }, [blockNumber]);

  return (
    <Section className="TargetBlock" title={`Block ${blockNumber}`}>
      <Loader
        component={<Block block={targetBlock} />}
        condition={Boolean(targetBlock)}
      />
    </Section>
  );
}

function LatestBlocks() {
  // Get the 10 most recent block numbers
  const [blockNumbers, setBlockNumbers] = useState([]);
  useEffect(() => {
    async function getBlockNumbers() {
      const latestBlockNumber = await alchemy.core.getBlockNumber();

      let blockNumbers = [];
      for (let i = latestBlockNumber; i > latestBlockNumber - 10; i--) {
        blockNumbers.push(i);
      }
      setBlockNumbers(blockNumbers);
    }
    getBlockNumbers();
  }, []);

  // Get block if it has not been previously loaded
  const [blocks, setBlocks] = useState(new Map());
  async function getBlock(b) {
    if (!blocks.has(b)) {
      const block = await alchemy.core.getBlock(b);
      setBlocks(new Map(blocks.set(b, block)));
    }
  }

  const rows = blockNumbers.map(b => (
    <details key={b}>
      <summary onClick={() => getBlock(b)}>{b}</summary>
      {<Loader
        component={<Block block={blocks.get(b)} />}
        condition={blocks.has(b)}
      />}
    </details>
  ));

  return (
    <Section className="Blocks" title="Latest Blocks">
      <Loader
        component={rows}
        condition={blockNumbers.length}
      />
    </Section>
  );
}

export default function Blocks() {
  const { id } = useParams();

  return id
    ? <TargetBlock blockNumber={id} />
    : <LatestBlocks />;
}
