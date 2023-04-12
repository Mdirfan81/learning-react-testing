import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Options from "../Options";

test("updating scoop subtotal when scoops changes", async () => {
  const user = userEvent.setup();

  render(<Options optionType="scoops" />);

  //TODO 1: make sure total staryts out at $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  //TODO 2: update canilla scoops to 1, and check subtotal
  //spin button is  used for button where we code for qty.
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  // Here: we are clearning the feild because, if we insert the 1 it make add to previews value so it could became 10 or 2.
  // for solving that problem we are clearning out input field.
  //Here we are clearning the 'vanillaInput'.
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  //TODO 2: update chocolate scoops to 2 and check subtotal.
  const chocolateButton = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(chocolateButton);
  await user.type(chocolateButton, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});
