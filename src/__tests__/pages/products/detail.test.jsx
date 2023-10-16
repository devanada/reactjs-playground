import "@testing-library/jest-dom";
import { Mocked, vi } from "vitest";

import { render, screen, within, act } from "@/__tests__/test-utils";

import App from "@/pages/products/detail";
import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { productsSampleData } from "@/utils/apis/products/sampleData";

vi.mock("@/utils/apis/axiosWithConfig");

const mockedAxios = axiosWithConfig;

describe("Index Product Page", () => {
  beforeEach(async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: productsSampleData[0] });
    await act(async () => {
      render(<App />);
    });
  });

  describe("Renders the page", () => {
    it("should render the page", () => {
      const labels = {
        image: "product-image",
        productName: "product-name",
        productCategory: "product-category",
        productFreshness: "product-freshness",
        additionalDescription: "product-description",
        productPrice: "product-price",
      };

      for (const key in labels) {
        const element = screen.getByLabelText(labels[key]);
        expect(element).toBeTruthy();

        if (key === "image") {
          expect(element).toHaveAttribute("src", productsSampleData[0][key]);
        } else {
          expect(
            within(element).getByText(productsSampleData[0][key])
          ).toBeInTheDocument();
        }
      }
    });
  });
});
