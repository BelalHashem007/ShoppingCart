import { describe, it, expect, vi } from "vitest";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Card, Shop } from "../pages/Shop";
import useProducts from "../components/getData/GetData";
import { Pagination } from "../pages/Shop";
import { fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PropTypes from "prop-types";

const object = {
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
};
function HookWrapper({ page, limit, onData, onLoading }) {
  const { data, loading, error } = useProducts(page, limit);
  if (loading) {
    onLoading({ loading });
  }
  if (!loading) {
    onData({ data, error });
  }
  return null;
}
HookWrapper.propTypes = {
  page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onData: PropTypes.func,
  onLoading: PropTypes.func,
};

describe("Shop test", () => {
  describe("Card test", () => {
    it("Card renders successfully", () => {
      render(<Card product={object} clickHandler={() => {}} />);
      expect(screen.getByRole("listitem")).toBeInTheDocument();
      expect(screen.getByRole("img")).toBeInTheDocument();
      expect(screen.getAllByRole("paragraph")).toHaveLength(2);
    });
    it("should call the clickHandler function when clicked", async () => {
      const clickHandler = vi.fn();
      const user = userEvent.setup();
      render(<Card product={object} clickHandler={clickHandler} />);
      const card = screen.getByRole("listitem");
      await user.click(card);
      expect(clickHandler).toHaveBeenCalled();
    });
    it("it shouldn`t call clickHandler when not clicked", async () => {
      const clickHandler = vi.fn();
      render(<Card product={object} clickHandler={clickHandler} />);
      expect(clickHandler).not.toHaveBeenCalled();
    });
    it("uses fallback image on error", () => {
      render(<Card product={object} clickHandler={() => {}} />);
      const img = screen.getByRole("img");
      fireEvent.error(img);
      expect(img.src).toContain("No_Image_Available.jpg");
    });
  });

  describe("Fetching data test", () => {
    it("useProducts hook calls fetch method with the correct endpoint and returns mocked result", async () => {
      const data = {
        message: "",
        status: "",
        products: [
          {
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
        ],
      };
      vi.spyOn(globalThis, "fetch").mockResolvedValue({
        json: () => Promise.resolve(data),
      });
      const onData = vi.fn();
      render(
        <HookWrapper page={1} limit={20} onData={onData} onLoading={vi.fn()} />
      );
      expect(fetch).toHaveBeenCalledWith(
        `https://fakestoreapi.in/api/products?page=1&limit=20`,
        {
          mode: "cors",
        }
      );
      await waitFor(() => {
        expect(onData).toHaveBeenCalledWith({
          data: [
            {
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
          ],
          error: null,
        });
      });
    });
    it("calls onLoading while waiting for data", () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({
        json: () => Promise.resolve(""),
      });
      const onLoading = vi.fn();
      render(<HookWrapper page={1} limit={20} onLoading={onLoading} />);

      expect(onLoading).toHaveBeenCalledWith({ loading: true });
    });
    it("calls onData with error when fetch fails ", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Error("Network error")
      );
      const onData = vi.fn();
      render(
        <HookWrapper page={1} limit={20} onLoading={vi.fn()} onData={onData} />
      );

      await waitFor(() =>
        expect(onData).toHaveBeenCalledWith({
          data: null,
          error: expect.any(Error),
        })
      );
    });
  });
  describe("Pagination test", () => {
    it("Pagination renders 8 buttons successfully", () => {
      render(
        <Pagination
          pages={[1, 2, 3, 4, 5, 6, 7, 8]}
          clickPageHandler={() => {}}
          currentPage={1}
        />
      );
      expect(screen.getAllByRole("button").length).toBe(8);
    });
    it("should call clickPageHandler when a button is clicked", async () => {
      const clickPageHandler = vi.fn();
      const user = userEvent.setup();
      render(
        <Pagination
          pages={[1, 2, 3, 4, 5, 6, 7, 8]}
          clickPageHandler={clickPageHandler}
          currentPage={1}
        />
      );
      const button = screen.getByRole("button", { name: "3" });
      await user.click(button);
      expect(clickPageHandler).toHaveBeenCalled();
    });
    it("shouldn`t call clickPageHandler when there is no click on button", async () => {
      const clickPageHandler = vi.fn();
      render(
        <Pagination
          pages={[1, 2, 3, 4, 5, 6, 7, 8]}
          clickPageHandler={clickPageHandler}
          currentPage={1}
        />
      );
      expect(clickPageHandler).not.toHaveBeenCalled();
    });
  });

  describe("Shop page as a whole works correctly", () => {
    const data = {
      message: "",
      status: "",
      products: [
        {
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
      ],
    };

    it("shop page gets rendered", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({
        json: () => Promise.resolve(data),
      });
      render(
        <MemoryRouter>
          <Shop />
        </MemoryRouter>
      );
      await waitFor(() =>
        expect(screen.getByRole("listitem")).toBeInTheDocument()
      );
    });
  });
});
