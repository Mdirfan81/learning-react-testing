import { render, screen } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("Handles error for scoops and topping routes", () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
      res(ctx.status(500));
    }),
    rest.get("http://localhost:3030/toopings", (req, res, ctx) => {
      res(ctx.status(500));
    })
  );
});
