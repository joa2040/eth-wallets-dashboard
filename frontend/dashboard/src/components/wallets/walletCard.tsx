import { Card } from "react-bootstrap";
import { Types, Wallet, WalletProps } from "../../interfaces";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { useContext } from "react";
import { BsStarFill, BsStar } from "react-icons/bs";
import { AppContext } from "../../context";

const WalletCard = ({ wallet, index }: WalletProps) => {

  const { state, dispatch} = useContext(AppContext);

  const handleStarClick = (wallet: Wallet) => {
    wallet.starred = !wallet.starred;
    const updatedWallets = [
      ...state.wallets.slice(0, index),
      wallet,
      ...state.wallets.slice(index+1)
    ];

    updatedWallets.sort((p, n) => {
      return Number(n.starred) - Number(p.starred);
    });

    dispatch({
      type: Types.Load,
      payload: updatedWallets
    });
  }

  return (
    <Draggable draggableId={wallet.id} index={index}>
      {provided => (
        <Card className="mb-2"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
        >
          <Card.Header className="bg-info">Wallet is old!</Card.Header>
          <Card.Body>
            <Card.Title>
              Address {wallet.address}
                {wallet.starred ?
                  <BsStarFill onClick={() => handleStarClick(wallet)} style={{ color: '#ffd100', marginLeft: 15 }} className="align-top"/> :
                  <BsStar onClick={() => handleStarClick(wallet)} style={{ color: '#ffd100', marginLeft: 15 }} className="align-top"/>
                }
              </Card.Title>
            <Card.Text>
              USD Balance {wallet.balance}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Draggable>
  )
}

WalletCard.propTypes = {
  wallet: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}

export default WalletCard;
