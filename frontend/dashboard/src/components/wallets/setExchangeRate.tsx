import { Button, Col, Form, FormControl, FormSelect, Row } from "react-bootstrap";
import React, { useContext, useState } from "react";
import { ExchangeRate, Types } from "../../interfaces";
import { AppContext } from "../../contexts/appContext";
import { useAuth0 } from "@auth0/auth0-react";
import { saveExchangeRates } from "../../middleware";
import { LoadingContext } from "../../contexts/loadingContext";

const SetExchangeRate = ({ defaultRate }: { defaultRate: ExchangeRate }) => {
  const { state, dispatch } = useContext(AppContext);
  const { showLoading, hideLoading } = useContext(LoadingContext)
  const { user } = useAuth0();

  const [ { currency, rate }, setState ] = useState(defaultRate);

  const handleOnChangeCurrency = (newCurrency: string) => {
    const selectedCurrency = state.rates.find(r => r.currency === newCurrency);
    selectedCurrency && setState(selectedCurrency);
  }

  const handleOnChangeRate = (newRate: number) => {
    setState({ currency, rate: newRate, user: user?.email });
  }

  const handleSaveExchangeRate = async () => {
    showLoading();
    const index = state.rates.findIndex(function (er) {
      return er.currency === currency;
    })
    const rates = [
      ...state.rates.slice(0, index),
      { currency, rate, user: user?.email },
      ...state.rates.slice(index + 1)
    ]
    await saveExchangeRates(rates);

    dispatch({ type: Types.LoadExchangeRates, payload: rates });
    hideLoading();
  }

  return (
    <Form>
      <Row className="align-items-center">
        <Col md="5">
          <FormSelect
            size="sm"
            className="mb-2"
            onChange={(e) => handleOnChangeCurrency(e.target.value)}
            placeholder="0x..."
            defaultValue={currency}
          >
            {state.rates.map((r: ExchangeRate) => (
              <option key={r.currency} value={r.currency}>{r.currency}</option>
            ))}
          </FormSelect>
        </Col>
        <Col md="5">
          <FormControl
            type="number"
            value={rate}
            className="mb-2"
            onChange={(e) => handleOnChangeRate(Number(e.target.value))}
          />
        </Col>
        <Col md="2" className="d-grid gap-2">
          <Button type="button" className="mb-2 btn" onClick={() => handleSaveExchangeRate()}>
            Save Rate
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SetExchangeRate;
