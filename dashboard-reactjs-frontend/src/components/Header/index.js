import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.jpg';
import Button from '@mui/material/Button';
import { MdMenuOpen } from "react-icons/md";

const Header = () => {
    return (
        <header className="d-flex align-items-center">
            <div className="container-fluid w-100">
                <div className="row d-flex align-items-center">

                    {/* Logo Section */}
                    <div className="col-sm-4 part1">
                        <Link to="/" className="d-flex align-items-center logo">
                            <img src={logo} alt="Store Logo" />
                            <span className="ml-2">STORE</span>
                        </Link>
                    </div>

                    {/* Menu Button Section */}
                    <div className="col-sm-3 d-flex align-items-center part2 pl-2">
                        <Button className="rounded-circle mr-2">
                            <MdMenuOpen />
                        </Button>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;