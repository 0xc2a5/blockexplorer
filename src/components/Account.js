import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import alchemy, { utils } from "../alchemy";
import Json from "./Json";
import Loader from "./Loader";
import Section from "./Section";

export default function Account() {
  const { id: address } = useParams();

  const [account, setAccount] = useState(null);

  useEffect(() => {
    setAccount(null);
    async function getAccount() {
      if (address) {
        const account = await alchemy.core.getBalance(address);
        setAccount(account);
      }
    }
    getAccount();
  }, [address]);

  const display = { address };
  if (account) {
    display.balance = utils.formatEther(account._hex);
  }

  const JsonComponent =
    <Json
      object={display}
      linkKeys={[]}
      linkPrefix=""
    />;

  return (
    <Section className="Account" title="Account">
      <Loader
        component={JsonComponent}
        condition={Boolean(account)}
      />
    </Section>
  );
}