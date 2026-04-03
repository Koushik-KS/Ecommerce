import { IoMdSearch } from "react-icons/io";
const SearchBox = () => {
    return(
        <>
       <div className="searchBox position-relative d-flex align-items-center">
        <IoMdSearch className="mr-2"/>
        <input type="text" placeholder="Search here....."/>

       </div>
        
        </>
    )
}
export default SearchBox;