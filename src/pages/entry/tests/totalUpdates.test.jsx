import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
// import { OrderDetailsProvider } from "../../../context/OrderDetails";
import OrderEntry from "../OrderEntry";

test("updating scoop subtotal when scoops changes", async () => {
  const user = userEvent.setup();

  render(<Options optionType="scoops" />);
  //The wrapper is like Redux Provide, we can use like his.

  // 1: make sure total staryts out at $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // 2: update canilla scoops to 1, and check subtotal
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

  // 2: update chocolate scoops to 2 and check subtotal.
  const chocolateButton = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(chocolateButton);
  await user.type(chocolateButton, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppiing subtoal when toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  const toppingTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingTotal).toHaveTextContent("0.00");

  const cheeriesCheckBox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cheeriesCheckBox);
  expect(toppingTotal).toHaveTextContent("1.50");

  const hotFudgeCheckbox = screen.getByRole("checkbox", { name: "Hot fudge" });
  await user.click(hotFudgeCheckbox);
  expect(toppingTotal).toHaveTextContent("3.00");
});

describe("Grand Total", () => {
  test("grand total starts ar $0.00", () => {
    // Only run the test when it is the mount state.

    const { unmount } = render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand toal:\$/ });
    expect(grandTotal).toHaveTextContent("0.00");

    unmount();
  });
  test("grand total updates properly if scoop is aded first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand Total:\$/ });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("grand total updates properly if topping is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    const grandTotal = screen.getByRole("heading", { name: /Grand total:\$/ });
    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    const vanillaInput = await screen.findByRole("spinButton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent("3.50");

    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
