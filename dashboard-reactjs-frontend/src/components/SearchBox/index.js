import { IoMdSearch } from "react-icons/io";

const SearchBox = () => {
    return (
        <div className="searchBox d-flex align-items-center">
            <IoMdSearch />
            <input type="text" placeholder="Search here....." />
        </div>
    );
}

export default SearchBox;