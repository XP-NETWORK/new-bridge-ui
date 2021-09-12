import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './Global.css'
import NavBar from './layout/NavBar'
import TransferNFT from './pages/TransferNFT/TransferNFT'
import TransferLiquidity from './pages/TransferLiquidity/TransferLiquidity'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <div className={'App'}>
      <Router>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route exact path={'/'} component={TransferNFT} />
          <Route
            exact
            path={`/transfer-tokens`}
            component={TransferLiquidity}
          />
        </Switch>
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
