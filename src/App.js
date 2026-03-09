import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Components/Footer";
import ProductModal from "./ProductModal";

const MyContext = createContext();

function App() {
  const [countryList, setCountryList] = useState([]);
  const [selectCountry, setSelectCountry] = useState("");
const [isOpenProductModal, setisOpenProductModal] = useState(false);
  useEffect(() => {
    getCountry("https://countriesnow.space/api/v0.1/countries/");
  }, []);

  const getCountry = async (url) => {
    try {
      const res = await axios.get(url);
      setCountryList(res.data.data); // API gives { country: "India" }
    } catch (error) {
      console.error(error);
    }
  };

  const values = {
    countryList,
    selectCountry,      // ✅ used in CountryDropdown
    setSelectCountry,
    setisOpenProductModal
       // ✅ used in CountryDropdown
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer/>
 {isOpenProductModal === true &&  <ProductModal />
      }

      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
