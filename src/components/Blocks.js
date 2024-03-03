import { useEffect, useState } from 'react';
import Section from "./Section.js";
import Loader from "./Loader.js";
import "./Blocks.css";
import alchemy from "../alchemy.js";

function Block({ block }) {
  return (
    <pre>{JSON.stringify(block, null, 2)}</pre>
  );
}

export default function Blocks() {
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
    if (blocks.has(b)) {
      return;
    }
    const block = await alchemy.core.getBlock(b);
    setBlocks(new Map(blocks.set(b, block)));
  }

  return (
    <Section className="Blocks" title="Latest Blocks">
      {blockNumbers.map(b => (
        <details key={b}>
          <summary onClick={() => getBlock(b)}>{b}</summary>
          {<Loader
            condition={blocks.has(b)}
            component={<Block block={blocks.get(b)} />}
          />}
        </details>
      ))}
    </Section>
  );
}
