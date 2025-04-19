import React from "react";
import { render, screen } from "@testing-library/react"
import RestaurantCard from "../RestaurantCard"
import MOCK_DATA from '../mocks/resCardMock.json'
import "@testing-library/jest-dom";

it("Should Render with Props Data", ()=>{
    console.log('Moxk', MOCK_DATA?.info);
    
    render(<RestaurantCard resData={MOCK_DATA}/>)
    const name = screen.getByText("Leon's - Burgers & Wings (Leon Grill)")
    console.log('Name Mazza', name);
    
    expect(name).toBeInTheDocument();
})