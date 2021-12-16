import React, { Fragment, useCallback, useContext, useEffect } from "react";
import { AddWallet, SetExchangeRate, WalletList } from "../components/wallets/";
import { Container } from "react-bootstrap";
import { ExchangeRate, Types } from "../interfaces";
import { AppContext } from "../contexts/appContext";
import { loadCurrencies, loadExchangeRates, loadWallets } from "../middleware";
import { useAuth0 } from "@auth0/auth0-react";
import { LoadingContext } from "../contexts/loadingContext";
import { Loading } from "../components/utils";
import Error from "../components/utils/error";

const Dashboard = () => {
  const { state, dispatch } = useContext(AppContext);
  const { showLoading, hideLoading, loadingCount, cleanError } = useContext(LoadingContext)
  const { user } = useAuth0();

  const fetchWallets = useCallback(async () => {
    return loadWallets(user?.email);
  }, [ user?.email ]);

  const fetchExchangeRates = useCallback(async () => {
    return loadExchangeRates(user?.email);
  }, [ user?.email ]);

  const fetchCurrencies = useCallback(async () => {
    return loadCurrencies();
  }, []);

  useEffect( () => {
    cleanError();
  }, [cleanError]);

  useEffect(() => {
    showLoading();
    fetchWallets().then(wallets => {
      wallets.sort((p, n) => {
        return p.position - n.position;
      });
      dispatch({ type: Types.Load, payload: wallets });
      hideLoading();
    });
  }, [ fetchWallets, dispatch, showLoading, hideLoading ]);

  useEffect(() => {
    showLoading();
    fetchExchangeRates().then(exchangeRates => {
      const exchangeRatesWithDefaultValues = state.currencies.map(currency => {
        const rate = exchangeRates.find(rate => rate.currency === currency.currency);
        if (!rate) {
          const defaultRate: ExchangeRate = { currency: currency.currency, rate: 1, user: user?.email };
          return defaultRate;
        }
        return rate;
      });
      dispatch({ type: Types.LoadExchangeRates, payload: exchangeRatesWithDefaultValues });
      hideLoading();
    });
  }, [ state.currencies, fetchExchangeRates, user?.email, dispatch, showLoading, hideLoading ]);

  useEffect(() => {
    showLoading();
    fetchCurrencies().then(currencies => {
      dispatch({ type: Types.LoadCurrencies, payload: currencies });
      hideLoading();
    });
  }, [ fetchCurrencies, dispatch, showLoading, hideLoading ]);

  return (
    <Fragment>
      <Loading/>
      <Error/>
      {loadingCount <= 0 && state.rates[0] &&
      <Container fluid>
        <AddWallet/>
        <SetExchangeRate defaultRate={(state.rates[0])}/>
      </Container>
      }
      <hr/>
      {loadingCount <= 0 && state.rates[0] &&
      <Container fluid>
        <WalletList defaultRate={(state.rates[0])}/>
      </Container>
      }
    </Fragment>
  )
}

export default Dashboard;
