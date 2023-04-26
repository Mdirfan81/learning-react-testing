import { rest } from "msw";

// The MSW is used to mock the API.
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          name: "Chocolate",
          imagePath: "/images/chocolate.png",
        },
        {
          name: "Vanilla",
          imagePath: "/images/vanilla.png",
        },
      ])
    );
  }),

  rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Cherries", imagePath: "/images/cherries.png" },
        { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
        { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
      ])
    );
  }),

  rest.post("http://localhost:3030/order", async (req, res, ctx) => {
    await sleep(100);
    return res(ctx.json({ orderNumber: 123455676 }));
  }),
];

// ---------------------------------------------------------------
// TROUBLESHOOTING: "loading" test fails
// The issue
// The "happy path" test fails when testing the "loading" text for the order confirmation screen, with an error like:

// Unable to find an element with the text: /loading/i

// The cause
// Later versions of Mock Service Worker (MSW) (versions 1.x) are just too darn fast! The "loading" text does not appear long enough for the tests to detect it before the order information is returned from MSW and the screen refreshes to show the order number.

// The course was written with an earlier, slower version of MSW (0.47.4).

// The fix
// Deliberately slow MSW down a bit for this query. Here's how:

// 1. Add a "sleep" function to the top of the handlers.js file:

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
// 2. Delay the response of the "/order" handler, so the tests have a chance to detect the "loading" text:

//   rest.post("http://localhost:3030/order", async (req, res, ctx) => {
//     await sleep(100);
//     return res(ctx.json({ orderNumber: 123455676 }));
//   }),

// As usual, if you have any questions, please ask in the Q&A!
// ---------------------------------------------------------------
