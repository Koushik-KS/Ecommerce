import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { IoClose } from "react-icons/io5";
import Rating from '@mui/material/Rating';

const ProductModal  = (props)=> {
    return(
        <>
        <Dialog open={true} className="productModal" onClose={()=>props.closeProductModal()}> 
              <Button className='close_' onClick={()=>props.closeProductModal()}><IoClose /> </Button>
              <h4 class="mb-1 font-weight-bold">All Natural Italian-Style Chicken Meatballs</h4>
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center mr-4">

                <span>Brands:</span>
                  <span className="ml-2">,<b>Welch's</b></span>
                  </div>
                   <Rating name="read-only" value={5} size="small" precision={0.5} read-only/>

              </div>

       
          
</Dialog>
        
        
        
        
        </>



 )


}
export default ProductModal;