import { describe, it, expect, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import { useProduct } from "../components/getData/GetData";
import ProductDetail, { AddToCart } from "../pages/ProductDetail";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
const data = {
  status: "SUCCESS",
  message: "Here you've a single product requested for id 6",
  product: {
    id: 6,
    title:
      "Xiaomi Wired in-Ear Earphones with Mic, Ultra Deep Bass & Metal Sound Chamber (Blue)",
    image:
      "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691057474498-earphone.jpg",
    price: 5,
    description:
      "Ergonomically angled to fit perfectly in your ear canal that provides long lasting comfort for every day usage.\r\nFeatures 1.25 meter long cable & L-shaped 3.5mm jack to connect with your phone. Due to the L-shape, the connector will deliver a strong & durable life. Earphones are compatible with Android, iOS & Windows devices with jack.\r\nPowerful 10 mm drivers & aluminum sound chamber for super extra bass and clear sound for the best music & calling experience.\r\nHigh-quality silicone earbuds, which are gentle on skin without compromising the comfortable fit on the ears.\r\nIn-line microphone with a durable multi-function button to play/pause your music, and answer/end your calls, all with just one tap.",
    brand: "xiaomi",
    model: "Mi Earphones Basic Blue",
    color: "Blue",
    category: "audio",
  },
};

function HookWrapper({ onData, onLoading }) {
  const { product, loading, error } = useProduct(1);
  if (loading) onLoading(loading);
  if (!loading) onData({ product, error });
  return "";
}
const setCart = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useOutletContext: () => ({
      cart: [],
      setCart,
    }),
  };
});

describe("ProductDetail page test", () => {
  describe("Testing useProduct", () => {
    it("useProduct uses correct endpoint and returns a result", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({
        json: () => Promise.resolve(data),
      });
      const onData = vi.fn();
      render(<HookWrapper onData={onData} onLoading={() => {}} />);
      expect(fetch).toBeCalledWith(`https://fakestoreapi.in/api/products/1`, {
        mode: "cors",
      });

      await waitFor(() =>
        expect(onData).toHaveBeenCalledWith({
          product: {
            id: 6,
            title:
              "Xiaomi Wired in-Ear Earphones with Mic, Ultra Deep Bass & Metal Sound Chamber (Blue)",
            image:
              "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691057474498-earphone.jpg",
            price: 5,
            description:
              "Ergonomically angled to fit perfectly in your ear canal that provides long lasting comfort for every day usage.\r\nFeatures 1.25 meter long cable & L-shaped 3.5mm jack to connect with your phone. Due to the L-shape, the connector will deliver a strong & durable life. Earphones are compatible with Android, iOS & Windows devices with jack.\r\nPowerful 10 mm drivers & aluminum sound chamber for super extra bass and clear sound for the best music & calling experience.\r\nHigh-quality silicone earbuds, which are gentle on skin without compromising the comfortable fit on the ears.\r\nIn-line microphone with a durable multi-function button to play/pause your music, and answer/end your calls, all with just one tap.",
            brand: "xiaomi",
            model: "Mi Earphones Basic Blue",
            color: "Blue",
            category: "audio",
          },
          error: null,
        })
      );
    });
    it("loading is true while fetching data and false when data is here", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({
        json: () => Promise.resolve(data),
      });
      const onLoading = vi.fn();
      render(<HookWrapper onData={() => {}} onLoading={onLoading} />);
      expect(onLoading).toHaveBeenCalled(true);
      await waitFor(() => expect(onLoading).toHaveBeenCalled(false));
    });
    it("it returns error when error happens", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Error("Network error")
      );
      const onData = vi.fn();
      render(<HookWrapper onData={onData} onLoading={() => {}} />);

      await waitFor(() =>
        expect(onData).toHaveBeenCalledWith({
          product: null,
          error: expect.any(Error),
        })
      );
    });
  });
  describe("Testing the page as whole", () => {
    it("it renders correctly", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({
        json: () => Promise.resolve(data),
      });
      render(
        <MemoryRouter>
          <ProductDetail />
        </MemoryRouter>
      );
      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: "Add to cart" })
        ).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: "back" })
        ).toBeInTheDocument();
        expect(
          screen.getByRole("img", { name: data.product.model })
        ).toBeInTheDocument();
        expect(
          screen.getByRole("heading", { name: data.product.title })
        ).toBeInTheDocument();
        expect(
          screen.getByRole("heading", { name: "OVERVIEW" })
        ).toBeInTheDocument();
        expect(
          screen.getByRole("table", { name: "SPECIFICATIONS" })
        ).toBeInTheDocument();
      });
    });
    it("doesn`t call clickHandler when add to cart is not clicked", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({
        json: () => Promise.resolve(data),
      });
      render(
        <MemoryRouter>
          <ProductDetail />
        </MemoryRouter>
      );
      expect(setCart).not.toHaveBeenCalled();
    });
    it("calls clickHandler when add to cart is clicked", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue({
          json: () => Promise.resolve(data),
        });
        const user = userEvent.setup();
        render(
          <MemoryRouter>
            <ProductDetail />
          </MemoryRouter>
        );
          const addToCartBtn = await screen.findByRole("button", { name: "Add to cart" });
          await user.click(addToCartBtn);
          expect(setCart).toHaveBeenCalled();
      });
  });
});
