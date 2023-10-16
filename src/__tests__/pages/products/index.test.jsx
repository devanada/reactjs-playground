import "@testing-library/jest-dom";
import { Mocked, vi } from "vitest";

import { render, screen, within, fireEvent, act } from "@/__tests__/test-utils";

import App from "@/pages/products";
import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { productsSampleData } from "@/utils/apis/products/sampleData";

vi.mock("@/utils/apis/axiosWithConfig");

const mockedAxios = axiosWithConfig;
const file = new File(["(⌐□_□)"], "file.png", { type: "image/png" });

describe("Index Product Page", () => {
  beforeEach(async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: productsSampleData });
    await act(async () => {
      render(<App />);
    });
  });

  describe("Renders the page", () => {
    it("should render the form components", () => {
      const inputList = [
        "input-product-name",
        "input-product-category",
        "input-product-image",
        "input-product-freshness",
        "input-product-description",
        "input-product-price",
      ];
      const form = screen.getByLabelText("product-form");

      expect(form).toBeTruthy();
      for (const input of inputList) {
        expect(within(form).getByLabelText(input)).toBeTruthy();
      }
      expect(within(form).getByLabelText("btn-submit")).toBeTruthy();
    });

    it("should render the table component and show the data", async () => {
      const table = screen.getByLabelText("product-table");
      expect(table).toBeTruthy();
      expect(within(table).getAllByLabelText("row")).toHaveLength(
        productsSampleData.length
      );
    });

    it("renders product name input and displays entered text", () => {
      const form = screen.getByLabelText("product-form");
      const productNameInput =
        within(form).getByLabelText("input-product-name");
      fireEvent.change(productNameInput, {
        target: { value: "New Product" },
      });
      expect(productNameInput).toHaveValue("New Product");
    });
  });

  describe("Action for Product", () => {
    describe("Create Product", () => {
      it("should show error message when some of input is missing a value", async () => {
        await act(async () => {
          fireEvent.click(screen.getByLabelText("btn-submit"));
        });

        const form = screen.getByLabelText("product-form");
        expect(
          within(form).getByText("Please enter a valid product name")
        ).toBeTruthy();
        expect(
          within(form).getByText("Please enter a valid product category")
        ).toBeTruthy();
        expect(
          within(form).getByText("Please enter a valid product freshness")
        ).toBeTruthy();
        expect(
          within(form).getByText("Please enter a valid additional description")
        ).toBeTruthy();
        expect(
          within(form).getByText("Please enter a valid product price")
        ).toBeTruthy();
      });

      it("should create a new product and display the successful toast", async () => {
        const formData = {
          "input-product-name": "Graphic Card",
          "input-product-category": "Electronics",
          "input-product-image": file,
          "Brand New": "Brand New",
          "input-product-description": "Graphic Card",
          "input-product-price": 399,
        };
        const form = screen.getByLabelText("product-form");

        for (const key in formData) {
          const input = within(form).getByLabelText(key);
          if (key === "Brand New") {
            fireEvent.click(input);
          } else if (key === "input-product-image") {
            fireEvent.change(input, {
              target: { files: [formData[key]] },
            });
          } else {
            fireEvent.change(input, {
              target: { value: formData[key] },
            });
          }
        }

        mockedAxios.post.mockResolvedValueOnce({
          data: productsSampleData[0],
        });

        await act(async () => {
          fireEvent.click(within(form).getByLabelText("btn-submit"));
        });

        mockedAxios.get.mockResolvedValueOnce({ data: productsSampleData });
        expect(screen.getByText("Success added new data")).toBeTruthy();
      });

      it("should fail to create a new product and display the failed toast", async () => {
        const formData = {
          "input-product-name": "Graphic Card",
          "input-product-category": "Electronics",
          "input-product-image": file,
          "Brand New": "Brand New",
          "input-product-description": "Graphic Card",
          "input-product-price": 399,
        };
        const form = screen.getByLabelText("product-form");

        for (const key in formData) {
          const input = within(form).getByLabelText(key);
          if (key === "Brand New") {
            fireEvent.click(input);
          } else if (key === "input-product-image") {
            fireEvent.change(input, {
              target: { files: [formData[key]] },
            });
          } else {
            fireEvent.change(input, {
              target: { value: formData[key] },
            });
          }
        }

        mockedAxios.post.mockRejectedValueOnce({
          data: {},
        });

        await act(async () => {
          fireEvent.click(within(form).getByLabelText("btn-submit"));
        });

        expect(screen.getByText("Failed to create a new product")).toBeTruthy();
      });
    });

    describe("Edit Product", () => {
      beforeEach(async () => {
        const table = screen.getByLabelText("product-table");
        const tableRow = within(table).getAllByLabelText("row")[0];

        await act(async () => {
          fireEvent.click(within(tableRow).getByLabelText("action-edit"));
        });
      });

      it("should display the selected product on input when click edit icon", async () => {
        const form = screen.getByLabelText("product-form");
        const inputList = {
          productName: "input-product-name",
          productCategory: "input-product-category",
          "Brand New": "Brand New",
          additionalDescription: "input-product-description",
          productPrice: "input-product-price",
        };

        for (const key in inputList) {
          const inputForm = within(form).getByLabelText(inputList[key]);
          const value = productsSampleData[0];
          if (key === "Brand New") {
            expect(inputForm).toBeChecked();
          } else {
            expect(inputForm).toHaveValue(value[key]);
          }
        }
      });

      it("should display error message below input file when click submit", async () => {
        const form = screen.getByLabelText("product-form");

        await act(async () => {
          fireEvent.click(screen.getByLabelText("btn-submit"));
        });

        expect(within(form).getByText("Max image size is 5MB.")).toBeTruthy();
      });

      it("should edit the product and display the successful toast", async () => {
        const form = screen.getByLabelText("product-form");
        const input = within(form).getByLabelText("input-product-image");

        fireEvent.change(input, {
          target: { files: [file] },
        });

        mockedAxios.put.mockResolvedValueOnce({
          data: productsSampleData[0],
        });

        await act(async () => {
          fireEvent.click(screen.getByLabelText("btn-submit"));
        });

        mockedAxios.get.mockResolvedValueOnce({ data: productsSampleData });
        expect(screen.getByText("Success edited data")).toBeTruthy();
      });

      it("should fail to edit the product and display the failed toast", async () => {
        const form = screen.getByLabelText("product-form");
        const input = within(form).getByLabelText("input-product-image");

        fireEvent.change(input, {
          target: { files: [file] },
        });

        mockedAxios.post.mockRejectedValueOnce({
          data: {},
        });

        await act(async () => {
          fireEvent.click(screen.getByLabelText("btn-submit"));
        });

        mockedAxios.get.mockResolvedValueOnce({ data: productsSampleData });
        expect(screen.getByText("Failed to update a product")).toBeTruthy();
      });
    });

    describe("Delete Product", () => {
      it("should delete the product and display the successful toast", async () => {
        const table = screen.getByLabelText("product-table");
        const tableRow = within(table).getAllByLabelText("row")[0];

        mockedAxios.delete.mockResolvedValueOnce({
          data: productsSampleData[0],
        });

        await act(async () => {
          fireEvent.click(within(tableRow).getByLabelText("action-delete"));
        });

        mockedAxios.get.mockResolvedValueOnce({ data: productsSampleData });
        setTimeout(() => {
          expect(screen.getByText("Successfully deleted product")).toBeTruthy();
        }, 1000);
      });

      it("should fail to delete the product and display the failed toast", async () => {
        const table = screen.getByLabelText("product-table");
        const tableRow = within(table).getAllByLabelText("row")[1];

        mockedAxios.delete.mockRejectedValueOnce({
          data: {},
        });

        await act(async () => {
          fireEvent.click(within(tableRow).getByLabelText("action-delete"));
        });

        setTimeout(() => {
          expect(screen.getByText("Failed to delete a product")).toBeTruthy();
        }, 1000);
      });
    });

    describe("Detail Product", () => {
      it("should navigate to selected product when click on eye icon", async () => {
        const table = screen.getByLabelText("product-table");
        const tableRow = within(table).getAllByLabelText("row")[0];
        const buttonIcon = within(tableRow).getByLabelText("action-detail");

        expect(buttonIcon).toBeInTheDocument();

        await act(async () => {
          fireEvent.click(buttonIcon);
        });
      });
    });
  });
});
