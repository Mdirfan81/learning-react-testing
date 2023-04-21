import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../context/OrderDetails";

const renderWithContexxt = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });
//re-export everthing
export * from "@testing-library/react";

//override render method
export { renderWithContexxt as render };
