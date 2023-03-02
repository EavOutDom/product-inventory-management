import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const Category = () => {
  const [setTitleLayout] = useOutletContext();

  useEffect(() => {
    setTitleLayout("Category");
  }, []);
  return <div>Category</div>;
};

export default Category;
