import { Button, Col, Form, FormControl, Row } from "react-bootstrap";
import { useContext, useState } from "react";
import { AppContext } from "../../contexts/appContext";
import { Types } from "../../interfaces";
import { addWallet } from "../../middleware";
import { LoadingContext } from "../../contexts/loadingContext";
import { useAuth0 } from "@auth0/auth0-react";
import { AxiosError } from "axios";

const AddWallet = () => {
  const [ address, setAddress ] = useState('');
  const { state, dispatch } = useContext(AppContext);
  const { showLoading, hideLoading, showError } = useContext(LoadingContext);
  const { user, getAccessTokenSilently } = useAuth0();

  const handleAddWallet = async () => {
    showLoading();
    try {
      const token = await getAccessTokenSilently();
      const wallet = await addWallet({ address, position: state.wallets.length + 1, balance: 0, user: user?.email }, token);
      dispatch({
        type: Types.Add,
        payload: wallet
      });
      hideLoading();
    } catch(e) {
      const axiosError = e as AxiosError;
      showError(axiosError.response?.data.error);
    }
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
