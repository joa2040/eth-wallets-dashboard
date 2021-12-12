import { WalletCard } from "./";
import React, { useContext } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Types, Wallet } from "../../interfaces";
import { AppContext } from "../../context";
import Loader from "react-loader-spinner";
import { Container } from "react-bootstrap";

const WalletList = () => {
  const { state, dispatch } = useContext(AppContext);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || result.destination.index === result.source.index) {
      return;
    }

    const copiedWallets = [ ...state.wallets ];
    const [ removed ] = copiedWallets.splice(result.source.index, 1);
    copiedWallets.splice(result.destination.index, 0, removed);

    copiedWallets.sort((p, n) => {
      return Number(n.starred) - Number(p.starred);
    });

    dispatch({
      type: Types.Load,
      payload: copiedWallets
    });
  };

  return (
    state.isFetching ?
      <Container className="spinner">
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
        />
      </Container> :
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {state.wallets.map((wallet: Wallet, index: number) => (
                <WalletCard wallet={wallet} index={index} key={wallet.id}/>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
  )
}

export default WalletList;
