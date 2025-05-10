import { describe, it, vi, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Cart, { Checkout, CheckoutPopUp } from "../pages/Cart";
import { Item } from "../pages/Cart";

const mockCart = [
  {
    product: {
      id: 1,
      title:
        "Sony WH-1000XM3 Bluetooth Wireless Over Ear Headphones with Mic (Silver)",
      image:
        "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947383286-714WUJlhbLS._SL1500_.jpg",
      price: 773,
      description:
        "Digital noise cancelling : Industry leading Active Noise Cancellation (ANC) lends a personalized, virtually soundproof experience at any situation\r\nHi-Res Audio : A built-in amplifier integrated in HD Noise Cancelling Processor QN1 realises the best-in-class signal-to-noise ratio and low distortion for portable devices.\r\nDriver Unit : Powerful 40-mm drivers with Liquid Crystal Polymer (LCP) diaphragms make the headphones perfect for handling heavy beats and can reproduce a full range of frequencies up to 40 kHz.\r\nVoice assistant : Alexa enabled (In-built) for voice access to music, information and more. Activate with a simple touch. Frequency response: 4 Hz-40,000 Hz",
      brand: "sony",
      model: "WH-1000XM3",
      color: "silver",
      category: "audio",
      discount: 11,
    },
    quantity: 3,
  },
  {
    product: {
      id: 3,
      title:
        "Logitech G733 Lightspeed Wireless Gaming Headset with Suspension Headband, LIGHTSYNC RGB, Blue VO!CE mic Technology and PRO-G Audio Drivers - White",
      image:
        "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692257709689-logitech heaphone.jpg",
      price: 384,
      description:
        "Total freedom with up to 20 m wireless range and LIGHTSPEED wireless audio transmission. Keep playing for up to 29 hours of battery life. 1 Play in stereo on PlayStation(R) 4.\r\nPersonalize your headset lighting across the full spectrum, 16. 8M colors. Play in colors with front-facing, dual-zone LIGHTSYNC RGB lighting and choose from preset animations or create your own with G HUB software.\r\nColorful, reversible suspension headbands are designed for comfort during long play sessions.\r\nAdvanced mic filters that make your voice sound richer, cleaner, and more professional. Customize with G HUB and find your sound.\r\nHear every audio cue with breathtaking clarity and get immerse in your game. PRO-G drivers are designed to significantly reduce distortion and reproduce precise, consistent, rich sound quality.\r\nSoft dual-layer memory foam that conforms to your head and reduces stress points for long-lasting comfort.\r\nG733 weighs only 278 g for long-lasting comfort.",
      brand: "logitech G",
      model: "G733 LIGHTSPEED",
      color: "white",
      category: "gaming",
      popular: true,
      discount: 3,
    },
    quantity: 3,
  },
  {
    product: {
      id: 2,
      title: "Microsoft Xbox X/S Wireless Controller Robot White",
      image:
        "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692255251854-xbox.jpg",
      price: 57,
      description:
        "Experience the modernized design of the Xbox wireless controller in robot white, featuring sculpted surfaces and refined Geometry for enhanced comfort and effortless control during gameplay\r\nStay on target with textured grip on the triggers, bumpers, and back case and with a new hybrid D-pad for accurate, yet familiar input\r\nMake the controller your own by customizing button Mapping with the Xbox accessories app",
      brand: "microsoft",
      model: "Xbox X/S",
      color: "white",
      category: "gaming",
      popular: true,
      discount: 4,
    },
    quantity: 3,
  },
];
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useOutletContext: vi.fn(),
  };
});

import { useOutletContext } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Cart test", () => {
  describe("cart renders successfully", () => {
    it("renders Your cart is empty when there is no product in the cart", () => {
      useOutletContext.mockReturnValue({
        cart: [],
        setCart: () => {},
      });
      render(
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      );
      expect(
        screen.getByRole("heading", { name: "Your cart is empty" })
      ).toBeInTheDocument();
    });

    it("renders the items in the cart if they exist and the checkout", () => {
      useOutletContext.mockReturnValue({
        cart: mockCart,
        setCart: () => {},
      });
      render(
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      );
      expect(
        screen.getByRole("heading", { name: "Your Shopping Cart" })
      ).toBeInTheDocument();
      expect(screen.getAllByRole("button", { name: "Remove" })).toHaveLength(3);
      expect(screen.getAllByText(mockCart[0].product.model)).toHaveLength(2);
      expect(
        screen.getByRole("heading", { name: "Order Summary" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Checkout" })
      ).toBeInTheDocument();
    });
  });

  describe("Item component test", () => {
    it("it renders successfully", () => {
      render(<Item item={mockCart[0]} removeItemHandler={() => {}} />);
      expect(
        screen.getByRole("img", { name: mockCart[0].product.title })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Remove" })
      ).toBeInTheDocument();
      expect(screen.getByText(mockCart[0].product.model)).toBeInTheDocument();
      expect(
        screen.getByText("$" + mockCart[0].product.price)
      ).toBeInTheDocument();
    });
    it("calls removeHandler when remove button is clicked", async () => {
      const removeItemHandler = vi.fn();
      const user = userEvent.setup();
      render(<Item item={mockCart[0]} removeItemHandler={removeItemHandler} />);
      const button = screen.getByRole("button", { name: "Remove" });
      await user.click(button);
      expect(removeItemHandler).toHaveBeenCalled();
    });
    it("doesn`t call removeHandler when remove button is not clicked",()=> {
        const removeItemHandler = vi.fn();
        render(<Item item={mockCart[0]} removeItemHandler={removeItemHandler}/>)
        expect(removeItemHandler).not.toHaveBeenCalled();
        })
  });

  describe("checkout test",()=>{
    it("it renders successfully",()=> {
        render(<Checkout cart={mockCart} getTotal={()=>{}} checkoutHandler={()=>{}}/>)
        expect(screen.getByRole("heading",{name:"Order Summary"})).toBeInTheDocument();
        expect(screen.getByRole("button",{name:"Checkout"})).toBeInTheDocument();
    })
    it ("it calls getTotal func",()=>{
        const getTotal = vi.fn();
        render(<Checkout cart={mockCart} getTotal={getTotal} checkoutHandler={()=>{}}/>)
        expect(getTotal).toHaveBeenCalled();
    })
    it ("it calls checkoutHandler func when clicked",async()=>{
        const checkoutHandler = vi.fn();
        render(<Checkout cart={mockCart} getTotal={()=>{}} checkoutHandler={checkoutHandler}/>)
        const button = screen.getByRole("button");
        const user = userEvent.setup();
        await user.click(button);
        expect(checkoutHandler).toHaveBeenCalled();
    })
    it ("it doesn`t call checkoutHandler func when not clicked",()=>{
        const checkoutHandler = vi.fn();
        render(<Checkout cart={mockCart} getTotal={()=>{}} checkoutHandler={checkoutHandler}/>)
        expect(checkoutHandler).not.toHaveBeenCalled();
    })
  });

  describe("Checkout popup test",()=> {
    it("it renders successfully",()=>{
        render(<CheckoutPopUp setShowMsg={()=>{}}/>)
        expect(screen.getByRole("heading")).toBeInTheDocument();
        expect(screen.getByRole("button",{name:"Cancel"})).toBeInTheDocument();
    })
    it("calls setShowMsg fun when cancel is clicked",async()=>{
        const setShowMsg= vi.fn()
        render(<CheckoutPopUp setShowMsg={setShowMsg}/>)
        const user = userEvent.setup();
        const button = screen.getByRole("button",{name:"Cancel"});
        await user.click(button);
        expect(setShowMsg).toHaveBeenCalled();
    })
    it("doesn`t call setShowMsg fun when cancel is not clicked",()=>{
        const setShowMsg= vi.fn()
        render(<CheckoutPopUp setShowMsg={setShowMsg}/>)
        expect(setShowMsg).not.toHaveBeenCalled();
    })
  })
  describe("some logic testing",()=> {
    it("clicking the remove button removes an item",async()=>{
        const setCart = vi.fn();
        useOutletContext.mockReturnValue({
            cart:mockCart,
            setCart,
        })
        render(
            <MemoryRouter>
              <Cart />
            </MemoryRouter>
          );
          const buttons = screen.getAllByRole("button",{name:"Remove"});
          const user = userEvent.setup();
          await user.click(buttons[0]);
          expect(setCart).toHaveBeenCalled();
    })
    it("clicking the checkout button shows the checkout popup",async()=>{
        useOutletContext.mockReturnValue({
            cart:mockCart,
            setCart: ()=> {},
        })
        render(
            <MemoryRouter>
              <Cart />
            </MemoryRouter>
          );
          const button = screen.getByRole("button",{name:"Checkout"});
          const user = userEvent.setup();
          await user.click(button);
          expect(screen.getByRole("heading",{name:"Congrats! You have checked out. ^_^"})).toBeInTheDocument();
    })
  })
});
