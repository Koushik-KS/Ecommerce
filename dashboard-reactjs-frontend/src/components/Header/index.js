import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.jpg';
import Button from '@mui/material/Button';
import { MdMenuOpen } from "react-icons/md";
import SearchBox from "../SearchBox";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { IoIosCart } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";

const Header = () => {
    return (
        <header className="d-flex align-items-center">
            <div className="container-fluid w-100">
                <div className="row d-flex align-items-center w-100">

                    {/* Logo Section */}
                    <div className="col-sm-2 part1">
                        <Link to="/" className="d-flex align-items-center logo">
                            <img src={logo} alt="Store Logo" />
                            <span style={{ marginLeft: "8px" }}>STORE</span>
                        </Link>
                    </div>

                    {/* Menu + Search Section */}
                    <div className="col-sm-4 d-flex align-items-center part2"style={{ gap: "8px" }} >
                        <Button className="rounded-circle">
                            <MdMenuOpen />
                        </Button>
                        <SearchBox />
                    </div>
                     <div className="col-sm-6 d-flex align-items-center justify-content-end part3" style={{ gap: "8px" }}>
                         <Button className="rounded-circle "  > <CiLight /> </Button>
                          <Button className="rounded-circle "  ><IoIosCart /> </Button>
                           <Button className="rounded-circle"   ><MdOutlineMailOutline /> </Button>
                            <Button className="rounded-circle"   > <FaRegBell /> </Button>


                            <div className="myWrapper">
                                <div className="myAcc d-flex align-items-center">
                                <div className="userImg">
                                    <span className="rounded-circle">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTx3SRpQ8G8mKf3SUHnnn5mzgz7jx2WnePnA&s"/>

                                    </span>
                                </div>

                            </div>
                            </div>


                            

                     </div>

                </div>
            </div>
        </header>
    );
};

export default Header;