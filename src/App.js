import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import './Global.css';
import NavBar from "./layout/NavBar";
import TransferNFT from "./pages/TransferNFT/TransferNFT";
import TransferLiquidity from "./pages/TransferLiquidity/TransferLiquidity";

function App() {
  return (
    <div className={"App"}>
        <Router>
            <header>
                <NavBar/>
            </header>
            <Switch>
                <Route exact path={"/"} component={TransferNFT}/>
                <Route exact path={"/transfer-liquidity"} component={TransferLiquidity}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
