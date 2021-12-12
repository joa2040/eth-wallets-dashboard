import React, { Fragment, useContext, useEffect } from "react";
import { AddWallet, SetExchangeRate, WalletList } from "../components/wallets/";
import { Container } from "react-bootstrap";
import { ExchangeRate, Types, Wallet } from "../interfaces";
import { AppContext } from "../context";

const ratesFromBackend: ExchangeRate[] = [
  {
    id: "123",
    currency: 'USD',
    rate: 10
  },
  {
    id: "4321",
    currency: 'EUR',
    rate: 15
  }
]

const walletsFromBackend: Wallet[] = [
  {
    id: "123",
    address: "0x213jhf8hf7824ja01jshf01j1hf1jfh",
    balance: 100,
    starred: false
  },
  {
    id: "1231",
    address: "0x0vkfhv083jbfds092jlehf23r32g4g4",
    balance: 2,
    starred: false
  },
  {
    id: "4545",
    address: "0xklgfhsdkhg2034hbg20249ghi4gh94gh94",
    balance: 534,
    starred: true
  }
]

const Dashboard = () => {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    walletsFromBackend.sort((p, n) => {
      return Number(n.starred) - Number(p.starred);
    });
    dispatch({ type: Types.Load, payload: walletsFromBackend });
    dispatch({ type: Types.LoadExchangeRates, payload: ratesFromBackend });
  }, [ dispatch ]);

  return (
    <Fragment>
      <Container fluid>
        <AddWallet/>
        <SetExchangeRate defaultRate={ratesFromBackend[0]}/>
      </Container>
      <hr/>
      <Container fluid>
        <WalletList/>
      </Container>
    </Fragment>
  )
}

export default Dashboard;
