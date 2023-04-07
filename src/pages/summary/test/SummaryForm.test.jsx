import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Summary from "../SummaryForm";
import userEvent from "@testing-library/user-event";

describe("Summary Form", () => {
  test("Checking initial State checkbox unchecked", () => {
    render(<Summary />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });

    expect(checkbox).not.toBeChecked();
  });

  test("Checkbox Enable button on first click and disable on second click", async () => {
    const user = userEvent.setup();

    render(<Summary />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const confirmButton = screen.getByRole("button", {
      name: /confirm order/i,
    });
    // fireEvent.click(checkbox);
    // expect(confirmButton).toBeEnabled();

    // fireEvent.click(checkbox);
    // expect(confirmButton).toBeDisabled();

    // Here replacing the fireEvent with userEvent
    await user.click(checkbox);
    expect(confirmButton).toBeEnabled();

    await user.click(checkbox);
    expect(confirmButton).toBeDisabled();
  });

  test("popover responds to hover", async () => {
    const user = userEvent.setup();
    render(<Summary />);

    // command
    // 1. get:expect element to be in DOM.
    // 2. query: expect element not to be in DOM.
    // 3. find: expect element to appear async.
    // QueryType
    // a. Role
    // b. AltText (image)
    // c. Text (display elements)

    // Form Elements
    // a. PlaceholderText
    // b. LabelText
    // c. DispalyValue

    //popover starts out hidden.
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    //popover appeas on mouseover of checkbox label.
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    await user.hover(termsAndConditions);
    const popover1 = screen.queryByText(
      /No ice cream will actually be delivered/i
    );
    expect(popover1).toBeInTheDocument();
    // // popover disappers when we mouse out.
    await user.unhover(termsAndConditions);
    expect(popover1).not.toBeInTheDocument();
  });
});
