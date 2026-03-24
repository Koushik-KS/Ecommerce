import { Link } from "react-router-dom";
import Logo from "../../assets/images/eshop.png";
import Button from "@mui/material/Button";
import CountryDropdown from "../CountryDropdown";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoBagOutline } from "react-icons/io5";
import SearchBox from "./SearcBox";
import Navigation from "./Navigation";
import { useContext } from "react";
import { MyContext } from "../../App";

const Header = () => {
  const context = useContext(MyContext);

  return (
    <div className="headerWrapper">
      <div className="top-strip bg-blue">
        <div className="container">
          <p className="mb-0 mt-0">
            Due to the <b>ONTIME</b> Delivery
          </p>
        </div>
      </div>

      <header className="header">
        <div className="container">
          <div className="row">
            <div className="logoWrapper d-flex align-items-center col-sm-2">
              <Link to="/">
                <img src={Logo} alt="Logo" />
              </Link>
            </div>

            <div className="col-sm-10 d-flex align-items-center part2">
              {context.countryList.length !== 0 && <CountryDropdown />}

              <SearchBox />

              <div className="part3 d-flex align-items-center ml-auto">
                {
                  context.isLogin!==true ? <Link to="/signIn"><Button className="btn-blue  
                   btn-round mr-3">Sign In</Button> </Link>:
                  <Button className="circle mr-3">
                  <FaRegCircleUser />
                </Button> 
                }
               
               
                <div className="ml-auto cartTab d-flex align-items-center">
                  <span>RS 1000</span>

                  <div className="position-relative ml-2">
                    <Button className="circle">
                      <IoBagOutline />
                    </Button>
                    <span className="count d-flex align-items-center justify-content-center">
                      1
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Navigation />
    </div>
  );
};

export default Header;
