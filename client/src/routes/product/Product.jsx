import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const Product = () => {
  const [setTitleLayout] = useOutletContext();
  useEffect(() => {
    setTitleLayout("Product");
  }, []);

  return <div>Product</div>;
};

export default Product;
