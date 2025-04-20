import React, { act } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Body from "../Body";
import "@testing-library/jest-dom";
import MOCK_DATA from "../mocks/mockResList.json";
import { BrowserRouter } from "react-router";

global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: {
            cards: [
              {}, {}, {}, // skipped
              {
                card: {
                  card: {
                    info: {
                      id: "1",
                      name: "Boba Bliss", // ✅ Will match search
                      cloudinaryImageId: "abc123",
                      cuisines: ["Tea"],
                      avgRating: 4.5,
                      costForTwo: "₹200 for two",
                      sla: { slaString: "20 mins" },
                    },
                  },
                },
              },
            ],
          },
        }),
    })
  );  

it("Should render the body component with search button", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );
  const searchBtn = screen.getByRole("button", { name: "Search" });
  const searchInput = screen.getByTestId("searchInput");
  fireEvent.change(searchInput, { target: "boba" });
  fireEvent.click(searchBtn);
  //   screen should load lesser cards
  const cards = screen.getAllByTestId("resCard");
  expect(cards.length).toBe(1);
});
