import { useEffect, useState } from "react";
import MyContext from "./myContext";
import {
  QuerySnapshot,
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { firedb } from "../../../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";

const MyState = (props) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState({
    title: "",
    price: "",
    imageUrl: "",
    category: "",

    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const addProduct = async () => {
    const { title, price, imageUrl, category } = products;
    if (title === "" || price === "" || imageUrl === "" || category === "") {
      return alert("all Fields are required");
    }
    const productRef = collection(firedb, "products");

    try {
      await addDoc(productRef, products);
      getProducts();
      toast.success("Product added succesfully");
      setTimeout(() => {
        navigate("/addproduct");
        setProducts({});
      }, 1000);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const [allProduct, setAllProduct] = useState([]);

  const getProducts = async () => {
    try {
      const q = query(collection(firedb, "products"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];

        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setAllProduct(productArray);
      });
      return () => data;
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <MyContext.Provider
      value={{ products, setProducts, addProduct, allProduct }}
    >
      {props.children}
    </MyContext.Provider>
  );
};
export default MyState;
