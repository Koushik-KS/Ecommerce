import Sidebar from "../../../Components/Sidebar";
import Button from "@mui/material/Button";
import { IoMdMenu } from "react-icons/io";
import { BiGridSmall } from "react-icons/bi";
import { CgMenuGridR } from "react-icons/cg";
import { IoGridOutline } from "react-icons/io5";

const Listing = () => {
  return (
    <>
      <section className="product_Listing_Page">
        <div className="container">
          <div className="productListing d-flex">
            
           
            <Sidebar />

            
            <div className="content_right">

           
              <img
                src="https://i.pinimg.com/1200x/01/0e/24/010e248c281d83e130d9315d31d21377.jpg"
                alt="banner"
                className="w-100"
                style={{ borderRadius: "8px" }}
              />

         
              <div className="showBy mt-3 mb-3 d-flex align-items-center">
                <div className="d-flex btnWrapper">

                  <Button>
                    <IoMdMenu />
                  </Button>

                  <Button>
                    <CgMenuGridR />
                  </Button>

                  <Button>
                    <BiGridSmall />
                  </Button>

                  <Button>
                    <IoGridOutline />
                  </Button>

                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Listing;