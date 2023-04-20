import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import axios from "axios";
import ScoopOptions from "./ScoopOptions";
import { createRequestInterceptor } from "msw";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../context/OrderDetails";
function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  //optionType is 'scoops' or 'toppings'
  const { totals } = useOrderDetails();
  //TODO: replace 'null' with ToppingOption when avaiable
  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOption;

  const OptionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) =>
        //handle error response
        // console.log(err);
        setError(true)
      );
  }, [optionType]);

  const title = optionType[0].toUppercase() + optionType.slice(1).toLowerCase();

  if (error) {
    return <AlertBanner />;
  }
  return;
  <>
    <h2>{title}</h2>
    <p>{formatCurrency(pricePerItem[optionType])}each</p>
    <p>
      {title}total :{formatCurrency(totals[optionType])}
    </p>
    <Row>{OptionItems}</Row>;
  </>;
}

export default Options;
