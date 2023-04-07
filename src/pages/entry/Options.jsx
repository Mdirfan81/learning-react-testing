import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import axios from "axios";
import ScoopOptions from "./ScoopOptions";
import { createRequestInterceptor } from "msw";

function Options({ optionType }) {
  const [items, setItems] = useState([]);
  //optionType is 'scoops' or 'toppings'

  //TODO: replace 'null' with ToppingOption when avaiable
  const ItemComponent = optionType === "scoops" ? ScoopOptions : null;

  const OptionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  useEffect(() => {
    // http://localhost:3030/scoops

    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        console.log("Showing the data", response.data);
        setItems(response.data);
      })
      .catch((err) => {
        //TODO: handle error response
        console.log(err);
      });
  }, [optionType]);

  return <Row>{OptionItems}</Row>;
}

export default Options;
