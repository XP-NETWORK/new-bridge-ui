import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import './Global.css';
import NavBar from "./layout/NavBar";
import TransferNFT from "./pages/TransferNFT/TransferNFT";

function App() {
  return (
    <div className={"App"}>
        <Router>
            <header>
                <NavBar/>
            </header>
            <Switch>
                <Route exact path={"/xp-network"} component={TransferNFT}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
