/* eslint-disable no-unreachable */
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

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  //optionType is 'scoops' or 'toppings'
  const { totals } = useOrderDetails();
  //: replace 'null' with ToppingOption when avaiable  --> DONE

  useEffect(() => {
    //we aborting the request when the compoenent is unmouting
    // for this create an abortCOntroller to attach to network request.

    const controller = new AbortController();
    // console.log(`http://localhost:3030/${optionType}`);
    axios
      .get(`http://localhost:3030/${optionType}`, { signal: controller.signal })
      .then((response) => {
        setItems(response.data);
        console.log("REsponse", optionType);
      })
      .catch((err) => {
        //handle error response
        // console.log(err);
        if (err.name !== "CanceledError") {
          return setError(true);
        }
        // return setError(true);
      });
    //abort axios call on component unmount
    //Problem: this may trigger when re-render so
    // For that in .catch use         if (err.name !== "CanceledError") setError(true);
    return () => {
      controller.abort();
    };
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }
  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOption;

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <React.Fragment>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])}each</p>
      <p>
        {title}total :{formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </React.Fragment>
  );
}

// export default Options;
