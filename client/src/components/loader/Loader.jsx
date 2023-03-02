import React, { useContext } from "react";
import styles from "./Loader.module.css";
import { AppContext } from "../../context/appContext";

const Loader = () => {
  const {
    appState: { loading },
  } = useContext(AppContext);

  if (!loading) return null;

  return (
    <section className={styles.loader}>
      <div />
    </section>
  );
};

export default Loader;
