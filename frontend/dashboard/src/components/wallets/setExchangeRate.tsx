import { Button, Col, Form, FormControl, FormSelect, Row } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { ExchangeRate, Types } from "../../interfaces";
import { AppContext } from "../../context";

const SetExchangeRate = ({ defaultRate }: { defaultRate: ExchangeRate }) => {
  const { state, dispatch } = useContext(AppContext);
  useEffect(() => {
    dispatch({ type: Types.Fetching, payload: false });
  }, [ state.rates, dispatch ]);

  const [ { id, currency, rate }, setState ] = useState(defaultRate);

  const handleOnChangeCurrency = (newCurrency: string) => {
    const selectedCurrency = state.rates.find(r => r.currency === newCurrency);
    selectedCurrency && setState(selectedCurrency);
  }

  const handleOnChangeRate = (newRate: number) => {
    setState({ id, currency, rate: newRate });
  }

  const handleSaveExchangeRate = () => {
    dispatch({ type: Types.Fetching, payload: true });
    dispatch({ type: Types.EditExchangeRate, payload: { id, currency, rate } })
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
              <option key={r.id} value={r.currency}>{r.currency}</option>
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
