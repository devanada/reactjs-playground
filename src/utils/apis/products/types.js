import * as z from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const productSchema = z.object({
  id: z.number().optional(),
  productName: z
    .string()
    .min(1, { message: "Please enter a valid product name" })
    .max(25, { message: "Product name must not exceed 25 characters" }),
  productCategory: z
    .string()
    .min(1, { message: "Please enter a valid product category" }),
  image: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  productFreshness: z
    .string()
    .min(1, { message: "Please enter a valid product freshness" }),
  additionalDescription: z
    .string()
    .min(1, { message: "Please enter a valid additional description" }),
  productPrice: z
    .number()
    .min(1, { message: "Please enter a valid product price" }),
});
