import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const Product = () => {
  const [setTitleLayout] = useOutletContext();
  useEffect(() => {
    setTitleLayout("Product");
  }, []);

  return (
    <section className="fadeIn">
      <span>Product</span>
    </section>
  );
};

export default Product;
