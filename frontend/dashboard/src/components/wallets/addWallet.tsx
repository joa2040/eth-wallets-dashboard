import { Button, Col, Form, FormControl, Row } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context";
import { Types, Wallet } from "../../interfaces";

const AddWallet = () => {
  const [address, setAddress] = useState('');
  const {state, dispatch} = useContext(AppContext);

  useEffect( () => {
    dispatch({ type: Types.Fetching, payload: false});
  }, [state.wallets, dispatch]);

  const handleAddWallet = () => {
    dispatch({ type: Types.Fetching, payload: true});
    const wallet: Wallet = {address, id: Math.random().toString(), balance: 88};

    dispatch({
      type: Types.Add,
      payload: wallet
    });
  }

  return (
    <Form>
      <Row>
        <Col md="10">
          <FormControl
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x..."
          />
        </Col>
        <Col md="2" className="d-grid gap-2">
          <Button type="button" className="mb-2" onClick={() => handleAddWallet()}>
            Add Wallet
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default AddWallet;
