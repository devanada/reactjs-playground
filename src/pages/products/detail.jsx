import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Layout from "@/components/layout";
import { getDetailProduct } from "@/utils/apis/products";

export default function Detail() {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    try {
      const result = await getDetailProduct(+params.id);
      setProduct(result);
    } catch (error) {
      toast.error(error.toString());
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      {isLoading ? (
        <></>
      ) : (
        <div>
          <div className="flex gap-5 border rounded-xl">
            <img
              aria-label="product-image"
              className="rounded-s-xl"
              src={product.image}
              alt={product.productName}
            />
            <div className="flex flex-col grow py-6">
              <p aria-label="product-name" className="font-bold text-4xl">
                {product.productName}
              </p>
              <div className="flex gap-3">
                <p
                  aria-label="product-category"
                  className="font-thin tracking-widest text-sm"
                >
                  {product.productCategory}
                </p>
                <p
                  aria-label="product-freshness"
                  className="font-thin tracking-widest text-sm"
                >
                  {product.productFreshness}
                </p>
              </div>
              <p aria-label="product-description">
                {product.additionalDescription}
              </p>
              <p aria-label="product-price" className="font-bold text-5xl">
                {product.productPrice}
              </p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
