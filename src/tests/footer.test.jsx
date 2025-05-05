import { render,screen } from "@testing-library/react";
import { describe, it , expect } from "vitest";
import Footer from "../components/footer/Footer.jsx"

describe("Footer test", ()=> {
    it("footer exist",()=>{
        render(<Footer/>)
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    })
})