import { Container } from "react-bootstrap";
import SummaryForm from "./pages/summary/SummaryForm";
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
