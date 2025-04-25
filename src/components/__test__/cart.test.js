import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react";
import RestaurantMenu from "../RestaurantMenu";
import { MOCK_DATA } from "../mocks/mockResMenu.json";
import "@testing-library/jest-dom";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA)
  })
);

it("Should Load menu component", async () => {
    global.fetch.mockClear(); // optional: reset before
  
    await act(async () =>
      render(
        <MemoryRouter initialEntries={["/restaurant/856738"]}>
          <Provider store={appStore}>
            <Routes>
              <Route path="/restaurant/:resId" element={<RestaurantMenu />} />
            </Routes>
          </Provider>
        </MemoryRouter>
      )
    );

    screen.debug();
  
    console.log("🧪 fetch mock called:", global.fetch.mock.calls); // ✅ MOVE HERE
  
    const heading = await screen.findByTestId("res-name");
    console.log("Heading text:", heading.textContent);
    expect(heading).toHaveTextContent("The Fritter Company");
  });
  
