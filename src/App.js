import logo from "./logo.svg";
import "./App.css";
import SummaryForm from "./pages/summary/SummaryForm";
import { Container } from "react-bootstrap";
import Options from "./pages/entry/Options";

import { OrderDetailsProvider } from "./context/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry page need provider*/}
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
