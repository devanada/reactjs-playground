import { IoPencil, IoTrash, IoEye } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Input, RadioGroup, Select, TextArea } from "@/components/input";
import Layout from "@/components/layout";
import Button from "@/components/button";
import Table from "@/components/table";
import {
  getProducts,
  createProducts,
  updateProduct,
  deleteProduct,
} from "@/utils/apis/products/api";
import { productSchema } from "@/utils/apis/products/types";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productFreshness: "",
      productPrice: 0,
    },
  });

  const columns = useMemo(
    () => [
      {
        header: "No",
        accessorKey: "id",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Product Name",
        accessorKey: "productName",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Product Category",
        accessorKey: "productCategory",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Image of Product",
        accessorKey: "image",
        cell: (info) => (
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img
                  src={info.row.original.image}
                  alt={info.row.original.productName}
                />
              </div>
            </div>
            <p>{info.row.original.image}</p>
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        header: "Product Freshness",
        accessorKey: "productFreshness",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Additional Description",
        accessorKey: "additionalDescription",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Product Price",
        accessorKey: "productPrice",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "",
        accessorKey: "actionDetail",
        cell: (info) => (
          <IoEye
            aria-label="action-detail"
            onClick={() => navigate(`/products/${info.row.original.id}`)}
          />
        ),
        footer: (props) => props.column.id,
      },
      {
        header: "",
        accessorKey: "actionEdit",
        cell: (info) => (
          <IoPencil
            aria-label="action-edit"
            onClick={() => onClickEdit(info.row.original)}
          />
        ),
        footer: (props) => props.column.id,
      },
      {
        header: "",
        accessorKey: "actionDelete",
        cell: (info) => (
          <IoTrash
            aria-label="action-delete"
            onClick={() => onClickDelete(info.row.original.id)}
          />
        ),
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setIsLoading(true);
      const result = await getProducts();
      setProducts(result);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit(data) {
    try {
      await createProducts(data);
      toast.success("Success added new data");
      reset();
      fetchData();
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function onSubmitEdit(data) {
    try {
      await updateProduct({ ...data, id: selectedId });
      toast.success("Success edited data");
      setSelectedId(0);
      reset();
      fetchData();
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function onClickDelete(productId) {
    try {
      await deleteProduct(productId);
      toast.success(`Successfully deleted product`);
      fetchData();
    } catch (error) {
      toast.error(error.message);
    }
  }

  function onClickEdit(data) {
    setSelectedId(data.id);
    setValue("productName", data.productName);
    setValue("productCategory", data.productCategory);
    setValue("image", data.image);
    setValue("productFreshness", data.productFreshness);
    setValue("additionalDescription", data.additionalDescription);
    setValue("productPrice", data.productPrice);
  }

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(selectedId == 0 ? onSubmit : onSubmitEdit)}
        aria-label="product-form"
      >
        <Input
          aria-label="input-product-name"
          label="Product Name"
          name="productName"
          register={register}
          error={errors.productName?.message}
        />
        <Select
          aria-label="input-product-category"
          label="Product Category"
          name="productCategory"
          options={["Electronics", "Furniture", "Appliance"]}
          placeholder="Choose..."
          register={register}
          error={errors.productCategory?.message}
        />
        <Input
          aria-label="input-product-image"
          label="Image of Product"
          name="image"
          type="file"
          register={register}
          error={errors.image?.message}
        />
        <RadioGroup
          aria-label="input-product-freshness"
          label="Product Freshness"
          name="productFreshness"
          options={["Brand New", "Second Hand", "Refurbished"]}
          register={register}
          error={errors.productFreshness?.message}
        />
        <TextArea
          aria-label="input-product-description"
          label="Additional Description"
          role="input"
          name="additionalDescription"
          register={register}
          error={errors.additionalDescription?.message}
        />
        <Input
          aria-label="input-product-price"
          label="Product Price"
          name="productPrice"
          type="number"
          register={register}
          error={errors.productPrice?.message}
        />
        <Button
          aria-label="btn-submit"
          label="Submit"
          type="submit"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
        />
      </form>
      <Table
        datas={products}
        columns={columns}
        aria-label="product-table"
        isLoading={isLoading}
      />
    </Layout>
  );
}
