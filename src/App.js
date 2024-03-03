import {
  Link,
  NavLink,
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import "./App.css";
import Account from "./components/Account.js";
import Blocks from "./components/Blocks.js";
import Detail from "./components/Detail.js";
import Logo from "./components/Logo.js";
import Transaction from "./components/Transaction.js";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>
            <Logo />
            <Link to="/">Block Explorer</Link>
          </h1>
          <nav>
            <NavLink activeClassName="active" to="/block">Blocks</NavLink>
            <NavLink activeClassName="active" to="/transaction">Transactions</NavLink>
            <NavLink activeClassName="active" to="/account">Accounts</NavLink>
          </nav>
        </header>

        <main>
          <Detail />
          <Switch>
            <Route path="/block/:id*">
              <Blocks />
            </Route>
            <Route path="/transaction/:id*">
              <Transaction />
            </Route>
            <Route path="/account/:id*">
              <Account />
            </Route>
            {/* Default route */}
            <Route path="/">
              <Redirect to="/block" />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
