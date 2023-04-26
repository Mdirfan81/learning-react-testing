import { Container } from "react-bootstrap";
import SummaryForm from "./pages/summary/SummaryForm";
import Options from "./pages/entry/Options";
import React, { useState, useSyncExternalStore } from "react";

import { OrderDetailsProvider } from "./context/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import OrderSummary from "./pages/summary/OrderSummary";

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  let Component = OrderEntry;
  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    case "review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = OrderConfirmation;
      break;

    default:
      break;
  }

  return (
    <OrderDetailsProvider>
      <Container>
        {<Component setOrderPhase={setOrderPhase} />}
        {/* Summary page and entry page need provider*/}
        {/*<OrderEntry /> */}
      </Container>
    </OrderDetailsProvider>
  );
}

export default App;
