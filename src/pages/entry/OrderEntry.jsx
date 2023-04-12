import React from "react";
import Options from "./Options";
const OrderEntry = () => {
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toopings" />
    </div>
  );
};

export default OrderEntry;

//test.only => Only this test will run and all the another will skip
// test.skip => Will skip the perticular test.
