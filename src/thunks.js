import {getBalance} from './actions';
import {chains, coins, exchangeRates} from './config';
import {PredefinedAccounts} from './cross_chain/accounts';
import {ChainFactory} from './cross_chain';


export const getBalanceThunk = (chain, address) => async dispatch =>  {

    try {
        const helper = ChainFactory[chain]();
        const inner = await helper.inner();
        console.log(chain, address, helper, inner)
        const balance = await inner.balance(PredefinedAccounts[chain][address].account);
        dispatch(getBalance(balance['c'][0]/10**(balance['e']-14)));
        
    } catch (error) {
        console.error(error);
    }
}