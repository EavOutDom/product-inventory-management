import React, { useContext, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { AppContext } from "../../context/appContext";
import Loader from "../../components/loader/Loader";

const Category = () => {
  const [setTitleLayout] = useOutletContext();
  const {
    appState: { loading },
    appDispatch,
  } = useContext(AppContext);

  useEffect(() => {
    setTitleLayout("Category");
    appDispatch({ type: "SET_LOADING", payload: true });
    const timeout = setTimeout(() => {
      appDispatch({ type: "SET_LOADING", payload: false });
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="fadeIn">
      <span>Category</span>
    </section>
  );
};

export default Category;
