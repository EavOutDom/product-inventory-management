import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { request } from "../../util/api";
import axios from "axios";

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
