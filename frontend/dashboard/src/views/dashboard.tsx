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
import { AxiosError } from "axios";

const Dashboard = () => {
  const { state, dispatch } = useContext(AppContext);
  const { showLoading, hideLoading, loadingCount, showError, cleanError } = useContext(LoadingContext)
  const { user, getAccessTokenSilently } = useAuth0();

  const fetchWallets = useCallback(async () => {
    const token = await getAccessTokenSilently();
    return loadWallets(user?.email, token);
  }, [ user?.email, getAccessTokenSilently ]);

  const fetchExchangeRates = useCallback(async () => {
    const token = await getAccessTokenSilently();
    return loadExchangeRates(user?.email, token);
  }, [ user?.email, getAccessTokenSilently ]);

  const fetchCurrencies = useCallback(async () => {
    const token = await getAccessTokenSilently();
    return loadCurrencies(token);
  }, [getAccessTokenSilently]);

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
    }).catch(e => {
      const axiosError = e as AxiosError;
      showError(axiosError.response?.data.error);
    });
  }, [ fetchWallets, dispatch, showLoading, hideLoading, showError ]);

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
    }).catch(e => {
      const axiosError = e as AxiosError;
      showError(axiosError.response?.data.error);
    });
  }, [ state.currencies, fetchExchangeRates, user?.email, dispatch, showLoading, hideLoading, showError ]);

  useEffect(() => {
    showLoading();
    fetchCurrencies().then(currencies => {
      dispatch({ type: Types.LoadCurrencies, payload: currencies });
      hideLoading();
    }).catch(e => {
      const axiosError = e as AxiosError;
      showError(axiosError.response?.data.error);
    });
  }, [ fetchCurrencies, dispatch, showLoading, hideLoading, showError ]);

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
