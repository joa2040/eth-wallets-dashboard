import WalletCard from "../wallets/walletCard";
import React, { useEffect, useContext } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Types, Wallet } from "../../interfaces";
import { AppContext } from "../../context";

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

const WalletList = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({
      type: Types.Load,
      payload: walletsFromBackend
    });
  }, [dispatch]);

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
