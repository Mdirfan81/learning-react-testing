import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

//crate custom hook to check whether we're in a provider
export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      "useOrderDetails must be called from within an OrderDetailsProvider"
    );
  }
  //
  return contextValue;
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionsCounts] = useState({
    scoops: {},
    toppings: {},
  });

  function updateItemCount(itemName, newItemCount, optionType) {
    // make a copy of existing state
    const newOptionCounts = { ...optionCounts };

    //update the copy with the new information
    newOptionCounts[optionType][itemName] = newItemCount;

    //updating the state with the updated copy;
    setOptionsCounts(newOptionCounts);
  }
  function resetOrder() {
    setOptionsCounts({ scoops: {}, tooping: {} });
  }

  //utility function to derive total from optionCounts state value.
  function calCulateTotal(optionType) {
    const countsArray = Object.values(optionCounts[optionType]);

    const totalCount = countsArray.reduce((total, value) => total + value, 0);

    return totalCount * pricePerItem[optionType];
  }

  const totals = {
    scoops: calCulateTotal("sccops"),
    toopings: calCulateTotal("toopings"),
  };
  const value = { optionCounts, updateItemCount, resetOrder };
  return <OrderDetails.Provider value={value} {...props} />;
}
