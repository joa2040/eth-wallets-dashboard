import WalletCard from "./walletCard";
import React, { useContext } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { ExchangeRate, Types, Wallet } from "../../interfaces";
import { AppContext } from "../../contexts/appContext";
import { updateWallets } from "../../middleware";
import { LoadingContext } from "../../contexts/loadingContext";

const WalletList = ({ defaultRate }: { defaultRate: ExchangeRate }) => {
  const { state, dispatch } = useContext(AppContext);
  const { showLoading, hideLoading } = useContext(LoadingContext);

  const onDragEnd = async (result: DropResult) => {
    showLoading();
    if (!result.destination || result.destination.index === result.source.index) {
      hideLoading();
      return;
    }

    const copiedWallets = [ ...state.wallets ];
    const [ removed ] = copiedWallets.splice(result.source.index, 1);
    copiedWallets.splice(result.destination.index, 0, removed);

    copiedWallets.sort((p, n) => {
      return Number(n.starred) - Number(p.starred);
    });

    copiedWallets.forEach((wallet, index) => {
      wallet.position = index;
    });

    await updateWallets(copiedWallets);

    dispatch({
      type: Types.Load,
      payload: copiedWallets
    });

    hideLoading();
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {state.wallets.map((wallet: Wallet, index: number) => (
              <WalletCard wallet={wallet} index={index} key={wallet.address} defaultRate={defaultRate}/>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default WalletList;
