import { Alert, Button, Card, CloseButton, Col, FormSelect, Modal, Row } from "react-bootstrap";
import { ExchangeRate, Types, Wallet, WalletProps } from "../../interfaces";
import { Draggable } from "react-beautiful-dnd";
import React, { useContext, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { AppContext } from "../../contexts/appContext";
import PropTypes from "prop-types";
import { updateWallets } from "../../middleware";
import { LoadingContext } from "../../contexts/loadingContext";
import moment from "moment";
import { deleteWallet } from "../../middleware/wallet";
import { AxiosError } from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const dollarUS = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const WalletCard = ({ wallet, defaultRate, index }: WalletProps) => {

  const { state, dispatch } = useContext(AppContext);
  const [ rate, setRate ] = useState(defaultRate);
  const [ showModal, setShowModal ] = useState(false);
  const { showLoading, hideLoading, showError } = useContext(LoadingContext);
  const { getAccessTokenSilently } = useAuth0();

  const transactionMessage = wallet.firstTransaction ?
    `Last Transaction ${moment.unix(wallet.firstTransaction).format("MM/DD/YYYY")}` : `Wallet has no transactions yet`
  const message = wallet.isOld ? `Wallet is old! ${transactionMessage}` : transactionMessage;

  const handleStarClick = async (wallet: Wallet) => {
    showLoading();
    wallet.starred = !wallet.starred;
    const updatedWallets = [
      ...state.wallets.slice(0, index),
      wallet,
      ...state.wallets.slice(index + 1)
    ];

    updatedWallets.sort((p, n) => {
      return Number(n.starred) - Number(p.starred);
    });

    updatedWallets.forEach((wallet, index) => {
      wallet.position = index;
    })

    try {
      const token = await getAccessTokenSilently();
      await updateWallets(updatedWallets, token);
      dispatch({
        type: Types.Load,
        payload: updatedWallets
      });
      hideLoading();
    } catch(e) {
      const axiosError = e as AxiosError;
      showError(axiosError.response?.data.error);
    }
  }

  const handleOnChangeCurrency = (currency: string) => {
    const selectedRate = state.rates.find(r => r.currency === currency);
    selectedRate && setRate(selectedRate);
  }

  const handleRemoveWallet = async () => {
    setShowModal(false);
    showLoading();

    try {
      const wallets = state.wallets.filter(w => w.address !== wallet.address);
      const token = await getAccessTokenSilently();
      await deleteWallet(wallet, token);
      wallets.forEach((wallet, index) => {
        wallet.position = index;
      });
      if (wallets && wallets.length) {
        await updateWallets(wallets, token);
      }
      dispatch({
        type: Types.Load,
        payload: wallets
      });
      hideLoading();
    } catch(e) {
      const axiosError = e as AxiosError;
      showError(axiosError.response?.data.error);
    }
  }

  return (
    <>
      <Draggable draggableId={wallet.address} index={index}>
        {provided => (
          <Card className="mb-2"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
          >
            <Card.Header>
              <Row>
                <Col>
                  <p className="fw-bold mb-0">Address {wallet.address} </p>
                </Col>
                <Col>
                  <CloseButton onClick={() => setShowModal(true)} className="float-end" style={{ marginLeft: 15 }}/>
                  {wallet.starred ?
                    <BsStarFill size={25} className="float-end" onClick={() => handleStarClick(wallet)}
                                style={{ color: '#ffd100' }}/> :
                    <BsStar size={25} className="float-end" onClick={() => handleStarClick(wallet)}
                            style={{ color: '#ffd100' }}/>
                  }
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Alert variant={wallet.isOld ? "danger" : "info"} className="p-2">
                {message}
              </Alert>
              <Row>
                <Col xs="2">
                  <FormSelect
                    size="sm"
                    className="mb-2"
                    onChange={(e) => handleOnChangeCurrency(e.target.value)}
                    placeholder="0x..."
                    defaultValue={rate.currency}
                  >
                    {state.rates.map((r: ExchangeRate) => (
                      <option key={r.currency} value={r.currency}>{r.currency}</option>
                    ))}
                  </FormSelect>
                </Col>
                <Col xs="4">
                  <p
                    className="fw-bold mb-0">{rate.currency} Balance {dollarUS.format((wallet.balance * rate.rate))}</p>
                </Col>
              </Row>
              <Card.Title>

              </Card.Title>
              <Card.Text>

              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </Draggable>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>
          <p>Are you sure you want to delete wallet {wallet.address}?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="danger" onClick={() => handleRemoveWallet()}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

WalletCard.propTypes = {
  wallet: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}

export default WalletCard;
