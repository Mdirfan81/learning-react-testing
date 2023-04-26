import React from "react";
import Options from "./Options";
import { useOrderDetails } from "../../context/OrderDetails";
import { formatCurrency } from "../../utilities";

const OrderEntry = () => {
  const { totals } = useOrderDetails();
  return (
    <div>
      <h1>Design In React JS</h1>
      <Options optionType="scoops" />
      <hr />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
    </div>
  );
};

export default OrderEntry;

//test.only => Only this test will run and all the another will skip
// test.skip => Will skip the perticular test.
