import Sidebar from "../../../Components/Sidebar";

const Listing=()=>{
    return(
          <>
      <section className="product_Listing_Page">
        <div className="container">
            <div className="productListing d-flex">
                <Sidebar/>
                <div className="content_right">
                   <img src="https://i.pinimg.com/1200x/05/0f/fa/050ffa755bd75b8666c69c16b69550f9.jpg"
                   className="w-100" style={{borderRadius:'8px'}}/>

                </div>

            </div>

        </div>
      </section>
        
    </>

    )

}
export default Listing;