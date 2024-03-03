import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import alchemy from "../alchemy";
import Json from "./Json";
import Loader from "./Loader";
import Section from "./Section";


export default function Transaction() {
  const { id: hash } = useParams();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    async function getTransaction() {
      setTransaction(null);
      if (hash) {
        const transaction = await alchemy.core.getTransaction(hash);
        setTransaction(transaction);
      }
    }
    getTransaction();
  }, [hash]);

  const JsonComponent =
    <Json
      object={transaction}
      linkKeys={["to", "from"]}
      linkPrefix="/account"
    />;

  return (
    <Section className="Transaction" title="Transaction">
      <Loader
        component={JsonComponent}
        condition={Boolean(transaction)}
      />
    </Section>
  );
}