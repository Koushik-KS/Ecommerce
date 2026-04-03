import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.jpg';
import Button from '@mui/material/Button';
import { MdMenuOpen } from "react-icons/md";
import SearchBox from "../SearchBox";

const Header = () => {
    return (
        <header className="d-flex align-items-center">
            <div className="container-fluid w-100">
                <div className="row d-flex align-items-center w-100">

                    {/* Logo Section */}
                    <div className="col-sm-2 part1">
                        <Link to="/" className="d-flex align-items-center logo">
                            <img src={logo} alt="Store Logo" />
                            <span className="ml-2">STORE</span>
                        </Link>
                    </div>

                    {/* Menu Button Section */}
                    <div className="col-sm-3 d-flex align-items-center part2 pl-3">
                        <Button className="rounded-circle mr-2">
                            <MdMenuOpen />
                        </Button>
                        <SearchBox/>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;