import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/card/Card";
import AddProduct from "./addProduct/AddProduct";
import ProductTable from "../components/productTable/ProductTable";

const Home = () => {
  return (
    <>
      <Navbar />
      <Card />
    </>
  );
};

export default Home;
