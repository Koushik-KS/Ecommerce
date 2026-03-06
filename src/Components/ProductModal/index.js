import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { IoClose } from "react-icons/io5";


const ProductModal  = (props)=> {
    return(
        <>
        <Dialog open={true} onClose={()=>props.closeProductModal()}> 
              <Button className='close_'><IoClose /> </Button>
              <h4 class="mb-0">All Natural Italian-Style Chicken Meatballs</h4>

       
          
</Dialog>
        
        
        
        
        </>



 )


}
export default ProductModal;